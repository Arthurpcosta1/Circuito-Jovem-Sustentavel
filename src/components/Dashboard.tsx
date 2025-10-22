import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { MapPin, Award, Gift, Key, User, Settings, MessageSquare } from 'lucide-react';
import { auth } from '../utils/api';
import { ConnectionTest } from './ConnectionTest';

interface DashboardProps {
  userName?: string;
  currentLevel?: string;
  impactKeys?: number;
  nextLevelKeys?: number;
  userAvatar?: string;
  onNavigateToStations?: () => void;
}

export function Dashboard({ 
  userName, 
  currentLevel,
  impactKeys,
  nextLevelKeys,
  userAvatar,
  onNavigateToStations
}: DashboardProps) {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [showDebug, setShowDebug] = useState(false);

  useEffect(() => {
    const user = auth.getCurrentUser();
    setCurrentUser(user);
  }, []);

  const displayName = userName || currentUser?.nome || "Arthur";
  const displayLevel = currentLevel || (currentUser?.nivel ? `Nível ${currentUser.nivel}` : "Guardião Ambiental");
  const displayKeys = impactKeys ?? currentUser?.chaves_impacto ?? 47;
  const displayNextLevelKeys = nextLevelKeys || 75;
  const displayAvatar = userAvatar || currentUser?.foto_url || null;
  const progressPercentage = (displayKeys / displayNextLevelKeys) * 100;
  const keysToNext = displayNextLevelKeys - displayKeys;

  const recentRewards = [
    { title: "Compre 1, Leve 2 na Cantina", partner: "UNINASSAU Graças", level: "Guardião" },
    { title: "Impressões ou Cópias Gratuitas", partner: "Setor Acadêmico", level: "Protetor" },
    { title: "Certificado Aluno Sustentável", partner: "Horas Complementares", level: "Guardião" }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-cyan-600">
        <div className="max-w-md mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl text-gray-900">Olá, {displayName}! 🚀</h1>
              <p className="text-gray-800 text-sm">Bem-vindo ao Circuito Tech</p>
            </div>
            <Avatar className="w-12 h-12 border-2 border-white/30">
              {displayAvatar ? (
                <AvatarImage src={displayAvatar} alt={displayName} />
              ) : null}
              <AvatarFallback className="bg-white/20 text-gray-900">
                <User className="w-6 h-6" />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6 space-y-6">
        {/* How It Works - Quick Guide */}
        <Card className="bg-gradient-to-r from-purple-600/20 to-cyan-600/20 border-purple-400/30">
          <CardContent className="p-4">
            <h3 className="text-white text-sm mb-3 flex items-center gap-2">
              💡 Como funciona
            </h3>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="space-y-1">
                <div className="w-10 h-10 bg-purple-500/30 rounded-full flex items-center justify-center mx-auto text-xl">
                  ♻️
                </div>
                <p className="text-xs text-white">Recicle</p>
              </div>
              <div className="space-y-1">
                <div className="w-10 h-10 bg-cyan-500/30 rounded-full flex items-center justify-center mx-auto">
                  <Key className="w-5 h-5 text-cyan-300" />
                </div>
                <p className="text-xs text-white">Ganhe Chaves</p>
              </div>
              <div className="space-y-1">
                <div className="w-10 h-10 bg-purple-500/30 rounded-full flex items-center justify-center mx-auto">
                  <Gift className="w-5 h-5 text-purple-300" />
                </div>
                <p className="text-xs text-white">Resgate</p>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Main Progress Card - Simplified */}
        <Card className="bg-gradient-to-r from-purple-600/20 to-cyan-600/20 border-cyan-400/40 backdrop-blur text-white shadow-lg">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-purple-200 text-sm">Suas Chaves de Impacto</p>
                <div className="flex items-center gap-2 mt-1">
                  <Key className="w-6 h-6 text-cyan-400" />
                  <span className="text-3xl text-white">{displayKeys}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-purple-200 text-sm">Nível</p>
                <Badge className="bg-purple-600 text-white border-0 mt-1">
                  {displayLevel}
                </Badge>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-purple-200">Próximo nível</span>
                <span className="text-cyan-300">{keysToNext} chaves faltam</span>
              </div>
              <Progress value={progressPercentage} className="h-2 bg-white/10" />
            </div>
          </CardContent>
        </Card>

        {/* Main Action - Clear CTA */}
        <div className="space-y-3">
          <Button 
            size="lg" 
            className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white py-7 rounded-xl shadow-lg shadow-purple-500/30 transition-all duration-300 transform hover:scale-105"
            onClick={onNavigateToStations}
          >
            <MapPin className="w-6 h-6 mr-2" />
            <div className="text-left">
              <div className="text-sm opacity-90">Encontrar Estação</div>
              <div className="text-xs opacity-70">Recicle e ganhe chaves</div>
            </div>
          </Button>
        </div>

        {/* Quick Stats - Simplified */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="bg-white/5 backdrop-blur border-purple-300/20">
            <CardContent className="p-3 text-center">
              <p className="text-2xl text-white">89</p>
              <p className="text-xs text-purple-300">Reciclagens</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/5 backdrop-blur border-purple-300/20">
            <CardContent className="p-3 text-center">
              <p className="text-2xl text-cyan-400">7</p>
              <p className="text-xs text-purple-300">Benefícios</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/5 backdrop-blur border-purple-300/20">
            <CardContent className="p-3 text-center">
              <p className="text-2xl text-white">#4</p>
              <p className="text-xs text-purple-300">Ranking</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Rewards - Simplified */}
        <div className="space-y-3">
          <h3 className="text-white text-sm flex items-center gap-2">
            <Gift className="w-4 h-4 text-cyan-400" />
            Benefícios Disponíveis
          </h3>
          
          <div className="space-y-2">
            {recentRewards.slice(0, 2).map((reward, index) => (
              <Card key={index} className="bg-white/5 backdrop-blur border-purple-300/20 hover:bg-white/10 transition-all">
                <CardContent className="p-3">
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <p className="text-sm text-white">{reward.title}</p>
                      <p className="text-xs text-purple-300">{reward.partner}</p>
                    </div>
                    <Badge variant="outline" className="text-xs border-cyan-400/40 text-cyan-300 bg-cyan-600/20 ml-2">
                      Desbloqueado
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Button variant="outline" className="w-full border-purple-300/30 text-purple-200 hover:bg-purple-600/20" size="sm">
            Ver Todos os Benefícios
          </Button>
        </div>

        {/* Community and Missions - For All Users */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="h-auto py-4 flex flex-col gap-2 border-purple-300/30 text-white hover:bg-purple-600/20"
            onClick={() => {
              const event = new CustomEvent('navigate', { detail: 'missions' });
              window.dispatchEvent(event);
            }}
          >
            <Award className="w-6 h-6 text-purple-400" />
            <div className="text-center">
              <p className="text-sm">Missões</p>
              <p className="text-xs text-purple-300">Ver conquistas</p>
            </div>
          </Button>
          
          <Button
            variant="outline"
            className="h-auto py-4 flex flex-col gap-2 border-purple-300/30 text-white hover:bg-purple-600/20"
            onClick={() => {
              const event = new CustomEvent('navigate', { detail: 'community' });
              window.dispatchEvent(event);
            }}
          >
            <MessageSquare className="w-6 h-6 text-cyan-400" />
            <div className="text-center">
              <p className="text-sm">Comunidade</p>
              <p className="text-xs text-purple-300">Ver posts</p>
            </div>
          </Button>
        </div>
      </div>

      {/* Admin Debug Tools - Only visible for administrators */}
      {(currentUser?.tipo === 'embaixador' || currentUser?.tipo === 'admin') && (
        <div className="max-w-md mx-auto px-6 pb-4">
          <button
            onClick={() => setShowDebug(!showDebug)}
            className="text-purple-400 hover:text-purple-300 text-xs flex items-center gap-1 mx-auto"
          >
            <Settings className="w-3 h-3" />
            {showDebug ? 'Ocultar' : 'Mostrar'} Debug Administrativo
          </button>
          
          {showDebug && (
            <div className="mt-4">
              <ConnectionTest />
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="bg-gradient-to-r from-purple-600 to-cyan-600 mt-8">
        <div className="max-w-md mx-auto px-6 py-5">
          <div className="text-center">
            <p className="text-sm text-gray-900">Continue reciclando! 🌱</p>
            <p className="text-xs text-gray-800 mt-1">Cada reciclagem ganha chaves para benefícios</p>
          </div>
        </div>
      </div>
    </div>
  );
}