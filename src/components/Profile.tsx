import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Progress } from './ui/progress';
import { Settings as SettingsComponent } from './Settings';
import { ShareMenu } from './ShareMenu';
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
  Users
} from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  earnedAt: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export function Profile() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);

  const userStats = {
    name: 'Arthur Silva',
    email: 'arthur.silva@email.com',
    level: 'Guardião Ambiental',
    impactKeys: 47,
    totalRecycling: 89,
    rewardsClaimed: 7,
    joinDate: 'Março 2024',
    avatar: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc1OTg3NTc5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
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
            <Avatar className="w-20 h-20 border-4 border-gray-900/30">
              <AvatarImage src={userStats.avatar} alt={userStats.name} />
              <AvatarFallback className="bg-gray-900/20 text-gray-900 text-xl">
                {userStats.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h2 className="text-xl text-gray-900 mb-1">{userStats.name}</h2>
              <p className="text-gray-800 text-sm mb-2">{userStats.email}</p>
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-yellow-600" />
                <span className="text-sm text-gray-900">{userStats.level}</span>
              </div>
            </div>
          </div>

          <Button 
            variant="outline" 
            className="w-full border-gray-900/30 text-gray-900 bg-gray-900/10 hover:bg-gray-900/20"
            onClick={() => setIsSettingsOpen(true)}
          >
            <Edit3 className="w-4 h-4 mr-2" />
            Editar Perfil
          </Button>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6 space-y-6">
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

        {/* Achievements Section */}
        <Card className="bg-white/10 backdrop-blur-lg border-purple-300/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-purple-400" />
              <h3 className="text-white">Selos e Conquistas</h3>
              <Badge variant="outline" className="ml-auto text-xs border-purple-300/30 text-purple-300 bg-purple-400/10">
                {achievements.length}/20
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {achievements.map((achievement) => (
                <Card key={achievement.id} className="bg-white/5 border-purple-300/20">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                        {achievement.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs truncate text-white">{achievement.title}</h4>
                      </div>
                    </div>
                    <p className="text-xs text-purple-200 mb-1">{achievement.description}</p>
                    <p className="text-xs text-purple-300/60">{achievement.earnedAt}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Button variant="outline" className="w-full mt-4 border-purple-300/30 text-purple-200 hover:bg-purple-600/20" size="sm">
              Ver Todas as Conquistas
            </Button>
          </CardContent>
        </Card>

        {/* Activity Chart */}
        <Card className="bg-white/10 backdrop-blur-lg border-purple-300/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-purple-400" />
              <h3 className="text-white">Atividade Mensal</h3>
            </div>
            
            <div className="space-y-3">
              {monthlyStats.map((stat) => (
                <div key={stat.month} className="flex items-center gap-4">
                  <div className="w-8 text-xs text-purple-200">{stat.month}</div>
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-purple-200">Reciclagens</span>
                      <span className="text-white">{stat.recycling}</span>
                    </div>
                    <Progress value={(stat.recycling / 30) * 100} className="h-2 bg-white/20" />
                  </div>
                  <div className="flex items-center gap-1 text-xs text-cyan-400">
                    <Key className="w-3 h-3" />
                    {stat.keys}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Account Info */}
        <Card className="bg-white/10 backdrop-blur-lg border-purple-300/20">
          <CardContent className="p-6">
            <h3 className="text-white mb-4">Informações da Conta</h3>
            
            <div className="space-y-3 text-sm">
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
      </div>

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
    </div>
  );
}