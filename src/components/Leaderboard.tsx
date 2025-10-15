import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Trophy, Medal, TrendingUp, TrendingDown, Minus, Zap, Crown, Star, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface LeaderboardUser {
  id: number;
  name: string;
  avatar: string;
  impactKeys: number;
  level: number;
  badge: string;
  neighborhood: string;
  rank: number;
}

export function Leaderboard() {
  const [selectedScope, setSelectedScope] = useState<'graças' | 'recife' | 'pe'>('graças');
  
  // Usuário atual (sempre posição 8 para mostrar contexto acima e abaixo)
  const currentUserId = 8;
  
  // Dados mockados do leaderboard
  const leaderboardData: LeaderboardUser[] = [
    { id: 1, name: 'Ana Costa', avatar: '', impactKeys: 3420, level: 12, badge: 'Líder Eco', neighborhood: 'Graças', rank: 1 },
    { id: 2, name: 'Pedro Silva', avatar: '', impactKeys: 3180, level: 11, badge: 'Guardião', neighborhood: 'Boa Viagem', rank: 2 },
    { id: 3, name: 'Juliana Melo', avatar: '', impactKeys: 2950, level: 10, badge: 'Guardião', neighborhood: 'Graças', rank: 3 },
    { id: 4, name: 'Carlos Rocha', avatar: '', impactKeys: 2740, level: 10, badge: 'Defensor', neighborhood: 'Casa Forte', rank: 4 },
    { id: 5, name: 'Marina Santos', avatar: '', impactKeys: 2520, level: 9, badge: 'Defensor', neighborhood: 'Espinheiro', rank: 5 },
    { id: 6, name: 'Lucas Oliveira', avatar: '', impactKeys: 2310, level: 9, badge: 'Protetor', neighborhood: 'Graças', rank: 6 },
    { id: 7, name: 'Beatriz Lima', avatar: '', impactKeys: 2180, level: 8, badge: 'Protetor', neighborhood: 'Aflitos', rank: 7 },
    { id: 8, name: 'Você', avatar: '', impactKeys: 1950, level: 7, badge: 'Explorador', neighborhood: 'Graças', rank: 8 },
    { id: 9, name: 'Rafael Dias', avatar: '', impactKeys: 1820, level: 7, badge: 'Explorador', neighborhood: 'Boa Viagem', rank: 9 },
    { id: 10, name: 'Camila Souza', avatar: '', impactKeys: 1690, level: 6, badge: 'Ativista', neighborhood: 'Graças', rank: 10 },
    { id: 11, name: 'Thiago Nunes', avatar: '', impactKeys: 1540, level: 6, badge: 'Ativista', neighborhood: 'Pina', rank: 11 },
    { id: 12, name: 'Isabela Cruz', avatar: '', impactKeys: 1420, level: 5, badge: 'Iniciante', neighborhood: 'Recife', rank: 12 },
    { id: 13, name: 'Gabriel Alves', avatar: '', impactKeys: 1280, level: 5, badge: 'Iniciante', neighborhood: 'Graças', rank: 13 },
    { id: 14, name: 'Larissa Martins', avatar: '', impactKeys: 1150, level: 4, badge: 'Iniciante', neighborhood: 'Santo Amaro', rank: 14 },
    { id: 15, name: 'Felipe Costa', avatar: '', impactKeys: 1020, level: 4, badge: 'Iniciante', neighborhood: 'Graças', rank: 15 },
  ];

  const currentUser = leaderboardData.find(u => u.id === currentUserId)!;
  const userAbove = leaderboardData.find(u => u.rank === currentUser.rank - 1);
  const userBelow = leaderboardData.find(u => u.rank === currentUser.rank + 1);
  
  const keysToRankUp = userAbove ? userAbove.impactKeys - currentUser.impactKeys : 0;
  const keysToRankDown = userBelow ? currentUser.impactKeys - userBelow.impactKeys : 0;

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-400" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Medal className="w-5 h-5 text-amber-600" />;
      default:
        return <span className="text-purple-300 font-mono">{rank}º</span>;
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header com gradiente */}
      <div className="bg-gradient-to-r from-purple-600 to-cyan-600 px-6 pt-8 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <Trophy className="w-8 h-8 text-gray-900" />
          <h1 className="text-gray-900">Ranking Local</h1>
        </div>
        <p className="text-gray-800 text-sm">
          Compete com a comunidade e suba no ranking
        </p>
      </div>

      {/* Filtros de escopo */}
      <div className="px-6 -mt-4 mb-6">
        <Card className="border-purple-500/30 bg-gray-800/50 backdrop-blur">
          <CardContent className="p-3">
            <div className="flex gap-2">
              <Button
                variant={selectedScope === 'graças' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedScope('graças')}
                className={selectedScope === 'graças' 
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white border-0' 
                  : 'border-purple-500/30 text-purple-200 hover:bg-purple-600/20'
                }
              >
                <MapPin className="w-3 h-3 mr-1" />
                Graças
              </Button>
              <Button
                variant={selectedScope === 'recife' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedScope('recife')}
                className={selectedScope === 'recife' 
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white border-0' 
                  : 'border-purple-500/30 text-purple-200 hover:bg-purple-600/20'
                }
              >
                Recife
              </Button>
              <Button
                variant={selectedScope === 'pe' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedScope('pe')}
                className={selectedScope === 'pe' 
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white border-0' 
                  : 'border-purple-500/30 text-purple-200 hover:bg-purple-600/20'
                }
              >
                Pernambuco
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sua posição e contexto */}
      <div className="px-6 mb-6">
        <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/40 to-cyan-900/40 backdrop-blur">
          <CardHeader className="pb-3">
            <CardTitle className="text-purple-200 flex items-center gap-2">
              <Star className="w-5 h-5 text-cyan-400" />
              Sua Posição
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Estatísticas principais */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-4xl font-mono text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                    {currentUser.rank}º
                  </div>
                  <div className="text-xs text-purple-300">Posição</div>
                </div>
                <div className="h-12 w-px bg-purple-500/30" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Zap className="w-4 h-4 text-cyan-400" />
                    <span className="text-xl text-purple-100">{currentUser.impactKeys}</span>
                  </div>
                  <div className="text-xs text-purple-300">Chaves de Impacto</div>
                </div>
              </div>
              <Badge className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white border-0">
                Nível {currentUser.level}
              </Badge>
            </div>

            {/* Progresso para subir/cair */}
            <div className="space-y-2 pt-2 border-t border-purple-500/20">
              {userAbove && (
                <div className="flex items-center justify-between p-2 rounded-lg bg-purple-950/30">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-purple-200">Para subir:</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-purple-100">+{keysToRankUp} chaves</div>
                    <div className="text-xs text-purple-400">Ultrapassar {userAbove.name}</div>
                  </div>
                </div>
              )}
              
              {userBelow && (
                <div className="flex items-center justify-between p-2 rounded-lg bg-purple-950/30">
                  <div className="flex items-center gap-2">
                    <TrendingDown className="w-4 h-4 text-orange-400" />
                    <span className="text-sm text-purple-200">Margem de segurança:</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-purple-100">{keysToRankDown} chaves</div>
                    <div className="text-xs text-purple-400">À frente de {userBelow.name}</div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top 3 Pódio */}
      <div className="px-6 mb-6">
        <h2 className="text-purple-200 mb-3 flex items-center gap-2">
          <Crown className="w-5 h-5 text-yellow-400" />
          Pódio
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {/* 2º Lugar */}
          <div className="pt-6">
            <Card className="border-gray-400/30 bg-gray-800/50 backdrop-blur text-center">
              <CardContent className="p-3">
                <div className="mb-2">
                  <Avatar className="w-12 h-12 mx-auto border-2 border-gray-400">
                    <AvatarFallback className="bg-gradient-to-br from-gray-500 to-gray-600 text-white">
                      {getInitials(leaderboardData[1].name)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <Medal className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                <div className="text-xs text-purple-100 mb-1 truncate">{leaderboardData[1].name}</div>
                <div className="text-xs text-purple-300">{leaderboardData[1].impactKeys} chaves</div>
              </CardContent>
            </Card>
          </div>

          {/* 1º Lugar */}
          <div>
            <Card className="border-yellow-400/40 bg-gradient-to-br from-yellow-900/30 to-amber-900/30 backdrop-blur text-center">
              <CardContent className="p-3">
                <div className="mb-2">
                  <Avatar className="w-16 h-16 mx-auto border-2 border-yellow-400">
                    <AvatarFallback className="bg-gradient-to-br from-yellow-500 to-amber-600 text-white">
                      {getInitials(leaderboardData[0].name)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <Trophy className="w-7 h-7 text-yellow-400 mx-auto mb-1" />
                <div className="text-sm text-purple-100 mb-1 truncate">{leaderboardData[0].name}</div>
                <div className="text-xs text-purple-300">{leaderboardData[0].impactKeys} chaves</div>
                <Badge className="mt-2 bg-yellow-600/20 text-yellow-300 border-yellow-400/30 text-xs">
                  {leaderboardData[0].badge}
                </Badge>
              </CardContent>
            </Card>
          </div>

          {/* 3º Lugar */}
          <div className="pt-6">
            <Card className="border-amber-600/30 bg-gray-800/50 backdrop-blur text-center">
              <CardContent className="p-3">
                <div className="mb-2">
                  <Avatar className="w-12 h-12 mx-auto border-2 border-amber-600">
                    <AvatarFallback className="bg-gradient-to-br from-amber-700 to-amber-800 text-white">
                      {getInitials(leaderboardData[2].name)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <Medal className="w-6 h-6 text-amber-600 mx-auto mb-1" />
                <div className="text-xs text-purple-100 mb-1 truncate">{leaderboardData[2].name}</div>
                <div className="text-xs text-purple-300">{leaderboardData[2].impactKeys} chaves</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Lista completa do ranking */}
      <div className="px-6 pb-6">
        <h2 className="text-purple-200 mb-3">Ranking Completo</h2>
        <div className="space-y-2">
          {leaderboardData.map((user) => (
            <Card
              key={user.id}
              className={`${
                user.id === currentUserId
                  ? 'border-cyan-500/50 bg-gradient-to-r from-purple-900/60 to-cyan-900/60 backdrop-blur ring-2 ring-cyan-500/30'
                  : 'border-purple-500/20 bg-gray-800/30 backdrop-blur'
              }`}
            >
              <CardContent className="p-3">
                <div className="flex items-center gap-3">
                  {/* Posição */}
                  <div className="w-8 flex items-center justify-center">
                    {getRankIcon(user.rank)}
                  </div>

                  {/* Avatar */}
                  <Avatar className={`w-10 h-10 ${
                    user.id === currentUserId ? 'ring-2 ring-cyan-400' : ''
                  }`}>
                    <AvatarFallback className={`${
                      user.id === currentUserId
                        ? 'bg-gradient-to-br from-purple-600 to-cyan-600 text-white'
                        : 'bg-gradient-to-br from-purple-800 to-purple-900 text-purple-200'
                    }`}>
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm truncate ${
                        user.id === currentUserId ? 'text-cyan-100' : 'text-purple-100'
                      }`}>
                        {user.name}
                      </span>
                      {user.id === currentUserId && (
                        <Badge className="bg-cyan-600/20 text-cyan-300 border-cyan-400/30 text-xs px-1.5 py-0">
                          Você
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-purple-400">
                      <span>{user.neighborhood}</span>
                      <span>•</span>
                      <span>Nível {user.level}</span>
                    </div>
                  </div>

                  {/* Chaves */}
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm text-purple-100">
                      <Zap className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{user.impactKeys}</span>
                    </div>
                    <div className="text-xs text-purple-400">{user.badge}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
