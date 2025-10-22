import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Progress } from './ui/progress';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import { Settings as SettingsComponent } from './Settings';
import { ShareMenu } from './ShareMenu';
import { UserQRCode } from './UserQRCode';
import { ProfileEdit } from './ProfileEdit';
import { auth } from '../utils/api';
import { toast } from 'sonner@2.0.3';
import { loadUserProfile, ensureUserExists } from '../utils/profileImage';
import { 
  User, 
  Award, 
  Key, 
  Recycle, 
  Gift, 
  Calendar,
  Edit3,
  Share2,
  Settings,
  Crown,
  Leaf,
  Target,
  Users,
  Shield,
  Camera,
  QrCode,
  Store,
  MessageSquare,
  ChevronRight
} from 'lucide-react';

interface ProfileProps {
  onNavigateToAdmin?: (screen: string) => void;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  earnedAt: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export function Profile({ onNavigateToAdmin }: ProfileProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    const user = auth.getCurrentUser();
    
    if (user?.id) {
      // Garantir que o usuário existe no banco de dados
      await ensureUserExists(user);
      
      // Carregar dados atualizados do banco de dados
      const dbUser = await loadUserProfile(user.id);
      
      if (dbUser) {
        // Mesclar dados do localStorage com dados do banco
        const mergedUser = {
          ...user,
          ...dbUser
        };
        
        setCurrentUser(mergedUser);
        setProfilePhoto(dbUser.foto_url);
        
        // Atualizar localStorage com dados do banco
        auth.updateCurrentUser(mergedUser);
      } else {
        // Se não conseguir carregar do banco, usar dados do localStorage
        setCurrentUser(user);
        setProfilePhoto(user.foto_url);
      }
    } else {
      setCurrentUser(user);
    }
  };

  const handleProfileUpdate = (updatedUser: any) => {
    setCurrentUser(updatedUser);
    if (updatedUser.foto_url) {
      setProfilePhoto(updatedUser.foto_url);
    }
    loadUserData();
  };

  const userStats = {
    name: currentUser?.nome || 'Arthur Silva',
    email: currentUser?.email || 'arthur.silva@email.com',
    level: currentUser?.nivel ? `Nível ${currentUser.nivel}` : 'Guardião Ambiental',
    impactKeys: currentUser?.chaves_impacto || 47,
    totalRecycling: 89,
    rewardsClaimed: 7,
    joinDate: 'Março 2024',
    avatar: profilePhoto || currentUser?.foto_url || null,
    tipo: currentUser?.tipo || 'estudante'
  };



  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'Primeiro Passo',
      description: 'Primeira reciclagem registrada',
      icon: <Leaf className="w-5 h-5" />,
      earnedAt: 'Março 2024',
      rarity: 'common'
    },
    {
      id: '2',
      title: 'Reciclador de Papel',
      description: '50kg de papel reciclado',
      icon: <Recycle className="w-5 h-5" />,
      earnedAt: 'Abril 2024',
      rarity: 'rare'
    },
    {
      id: '3',
      title: 'Embaixador Indicado',
      description: 'Indicou 5 amigos para o Circuito',
      icon: <Users className="w-5 h-5" />,
      earnedAt: 'Maio 2024',
      rarity: 'epic'
    },
    {
      id: '4',
      title: 'Meta Mensal',
      description: 'Atingiu meta de reciclagem 3 meses seguidos',
      icon: <Target className="w-5 h-5" />,
      earnedAt: 'Junho 2024',
      rarity: 'legendary'
    }
  ];

  const getRarityColor = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common': return 'border-gray-200 bg-gray-50 text-gray-700';
      case 'rare': return 'border-blue-200 bg-blue-50 text-blue-700';
      case 'epic': return 'border-purple-200 bg-purple-50 text-purple-700';
      case 'legendary': return 'border-yellow-200 bg-yellow-50 text-yellow-700';
    }
  };

  const monthlyStats = [
    { month: 'Jan', recycling: 12, keys: 8 },
    { month: 'Fev', recycling: 18, keys: 12 },
    { month: 'Mar', recycling: 25, keys: 17 },
    { month: 'Abr', recycling: 20, keys: 14 },
    { month: 'Mai', recycling: 14, keys: 9 }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-cyan-600">
        <div className="max-w-md mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-lg text-gray-900">Meu Perfil</h1>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="border-gray-900/30 text-gray-900 bg-gray-900/10 hover:bg-gray-900/20"
                onClick={() => setIsShareMenuOpen(true)}
              >
                <Share2 className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-gray-900/30 text-gray-900 bg-gray-900/10 hover:bg-gray-900/20"
                onClick={() => setIsSettingsOpen(true)}
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <Avatar className="w-20 h-20 border-4 border-gray-900/30">
                {userStats.avatar ? (
                  <AvatarImage src={userStats.avatar} alt={userStats.name} />
                ) : null}
                <AvatarFallback className="bg-gray-900/30 text-gray-900 text-2xl">
                  <User className="w-10 h-10" />
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-cyan-600 hover:bg-cyan-700 p-0 shadow-lg"
                onClick={() => setIsEditProfileOpen(true)}
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex-1">
              <h2 className="text-xl text-gray-900 mb-1">{userStats.name}</h2>
              <p className="text-gray-800 text-sm mb-2">{userStats.email}</p>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Crown className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm text-gray-900">{userStats.level}</span>
                </div>
                {userStats.tipo === 'embaixador' && (
                  <div className="flex items-center gap-1 bg-cyan-500/30 rounded px-2 py-1 w-fit">
                    <Shield className="w-3 h-3 text-cyan-900" />
                    <span className="text-xs text-gray-900">Jovem Embaixador</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Button 
            variant="outline" 
            className="w-full border-gray-900/30 text-gray-900 bg-gray-900/10 hover:bg-gray-900/20"
            onClick={() => setIsEditProfileOpen(true)}
          >
            <Edit3 className="w-4 h-4 mr-2" />
            Editar Perfil
          </Button>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6 space-y-6">
        {/* QR Code Section */}
        <UserQRCode />

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="bg-white/10 backdrop-blur-lg border-purple-300/20">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Key className="w-5 h-5 text-purple-400" />
              </div>
              <p className="text-lg text-white">{userStats.impactKeys}</p>
              <p className="text-xs text-purple-200">Chaves de Impacto</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-lg border-purple-300/20">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Recycle className="w-5 h-5 text-cyan-400" />
              </div>
              <p className="text-lg text-white">{userStats.totalRecycling}</p>
              <p className="text-xs text-purple-200">Reciclagens</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-lg border-purple-300/20">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Gift className="w-5 h-5 text-purple-400" />
              </div>
              <p className="text-lg text-white">{userStats.rewardsClaimed}</p>
              <p className="text-xs text-purple-200">Resgates</p>
            </CardContent>
          </Card>
        </div>

        {/* Achievements Section - Simplified */}
        <Card className="bg-white/10 backdrop-blur-lg border-purple-300/20">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-purple-400" />
              <h3 className="text-white text-sm">Conquistas Recentes</h3>
            </div>
            
            <div className="space-y-2">
              {achievements.slice(0, 3).map((achievement) => (
                <Card key={achievement.id} className="bg-white/5 border-purple-300/20">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 text-purple-300">
                        {achievement.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white">{achievement.title}</p>
                        <p className="text-xs text-purple-300">{achievement.earnedAt}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Button variant="outline" className="w-full mt-3 border-purple-300/30 text-purple-200 hover:bg-purple-600/20" size="sm">
              Ver Todas ({achievements.length})
            </Button>
          </CardContent>
        </Card>

        {/* Admin Access Section - Only for Embaixador and Commerce */}
        {(userStats.tipo === 'embaixador' || userStats.tipo === 'comercio') && (
          <Card className="bg-gradient-to-br from-orange-600/20 to-yellow-600/20 backdrop-blur-lg border-orange-400/30">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-orange-400" />
                <h3 className="text-white text-sm">Acesso Administrativo</h3>
              </div>
              
              <div className="space-y-2">
                {userStats.tipo === 'embaixador' && (
                  <>
                    <Button
                      variant="outline"
                      className="w-full justify-between border-orange-300/30 text-white hover:bg-orange-600/20"
                      onClick={() => onNavigateToAdmin?.('ambassador-dashboard')}
                    >
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-orange-400" />
                        <span>Painel Embaixador</span>
                      </div>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="w-full justify-between border-orange-300/30 text-white hover:bg-orange-600/20"
                      onClick={() => onNavigateToAdmin?.('ambassador-validation')}
                    >
                      <div className="flex items-center gap-2">
                        <QrCode className="w-4 h-4 text-orange-400" />
                        <span>Validar Coletas</span>
                      </div>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </>
                )}
                
                {userStats.tipo === 'comercio' && (
                  <Button
                    variant="outline"
                    className="w-full justify-between border-orange-300/30 text-white hover:bg-orange-600/20"
                    onClick={() => onNavigateToAdmin?.('commerce-validator')}
                  >
                    <div className="flex items-center gap-2">
                      <Store className="w-4 h-4 text-orange-400" />
                      <span>Validar Resgates</span>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Account Info */}
        <Card className="bg-white/10 backdrop-blur-lg border-purple-300/20">
          <CardContent className="p-6">
            <h3 className="text-white mb-4">Informações da Conta</h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-purple-200">Tipo de conta</span>
                <span className="text-white capitalize">{userStats.tipo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-200">Membro desde</span>
                <span className="text-white">{userStats.joinDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-200">Nível atual</span>
                <span className="text-white">{userStats.level}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-200">Próximo nível em</span>
                <span className="text-cyan-400">28 chaves</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Logout Button */}
        <Button 
          variant="outline" 
          className="w-full border-red-400/30 text-red-400 hover:bg-red-600/20 hover:text-red-300"
          onClick={() => setShowLogoutDialog(true)}
        >
          Sair da Conta
        </Button>
      </div>

      {/* Logout Dialog */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent className="bg-gray-900 border-purple-300/20">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Sair da conta?</AlertDialogTitle>
            <AlertDialogDescription className="text-purple-200">
              Tem certeza que deseja sair? Você precisará fazer login novamente para acessar sua conta.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-white/10 border-purple-300/30 text-white hover:bg-white/20">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 text-white hover:bg-red-700"
              onClick={async () => {
                try {
                  await auth.signOut();
                  toast.success('Você saiu com sucesso!');
                  setTimeout(() => {
                    window.location.href = '/';
                  }, 500);
                } catch (error) {
                  console.error('Erro ao sair:', error);
                  toast.error('Erro ao sair. Tente novamente.');
                }
              }}
            >
              Sim, sair
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Footer */}
      <div className="bg-gradient-to-r from-purple-600 to-cyan-600 mt-6">
        <div className="max-w-md mx-auto px-6 py-6">
          <div className="text-center">
            <p className="text-sm text-gray-900">Você é incrível! 🏆</p>
            <p className="text-xs text-gray-800 mt-1">Continue evoluindo no Circuito Jovem Tech</p>
          </div>
        </div>
      </div>

      {/* Settings Sheet */}
      <SettingsComponent isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      
      {/* Share Menu */}
      <ShareMenu isOpen={isShareMenuOpen} onClose={() => setIsShareMenuOpen(false)} />

      {/* Profile Edit Dialog */}
      <ProfileEdit 
        isOpen={isEditProfileOpen} 
        onClose={() => setIsEditProfileOpen(false)}
        currentUser={currentUser}
        onSave={handleProfileUpdate}
      />
    </div>
  );
}
