import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { MapPin, Award, Gift, Key } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface DashboardProps {
  userName?: string;
  currentLevel?: string;
  impactKeys?: number;
  nextLevelKeys?: number;
  userAvatar?: string;
}

export function Dashboard({ 
  userName = "Arthur", 
  currentLevel = "Guardião Ambiental",
  impactKeys = 47,
  nextLevelKeys = 75,
  userAvatar = "https://images.unsplash.com/photo-1556157382-97eda2d62296?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc1OTg3NTc5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
}: DashboardProps) {
  const progressPercentage = (impactKeys / nextLevelKeys) * 100;
  const keysToNext = nextLevelKeys - impactKeys;

  const recentRewards = [
    { title: "Compre 1, Leve 2 na Cantina", partner: "UNINASSAU Graças", level: "Guardião" },
    { title: "Impressões ou Cópias Gratuitas", partner: "Setor Acadêmico", level: "Protetor" },
    { title: "Certificado Aluno Sustentável", partner: "Horas Complementares", level: "Guardião" }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-cyan-600">
        <div className="max-w-md mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-xl text-gray-900">Olá, {userName}! 🚀</h1>
              <p className="text-gray-800 text-sm">Bem-vindo ao Circuito Tech</p>
            </div>
            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur border-2 border-white/30 overflow-hidden">
              <ImageWithFallback 
                src={userAvatar}
                alt="Avatar do usuário"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6 space-y-6">
        {/* Status Card */}
        <Card className="bg-gradient-to-r from-purple-600/20 to-cyan-600/20 border-purple-400/30 backdrop-blur text-white shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-500/30 rounded-full flex items-center justify-center border border-purple-400/30">
                  <Award className="w-6 h-6 text-purple-300" />
                </div>
                <div>
                  <p className="text-purple-300 text-sm">Nível Atual</p>
                  <h2 className="text-white text-lg">{currentLevel}</h2>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Key className="w-5 h-5 text-cyan-400" />
                  <span className="text-sm text-purple-200">Chaves de Impacto</span>
                </div>
                <Badge variant="secondary" className="bg-cyan-600 text-white border-0">
                  {impactKeys}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-purple-200">Progresso para próximo nível</span>
                  <span className="text-cyan-300">{keysToNext} chaves restantes</span>
                </div>
                <Progress value={progressPercentage} className="h-2 bg-white/10" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main CTA */}
        <Button 
          size="lg" 
          className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white py-6 rounded-xl shadow-lg shadow-purple-500/20 transition-all duration-300 transform hover:scale-105"
        >
          <MapPin className="w-5 h-5 mr-2" />
          Encontrar Estação de Coleta
        </Button>

        {/* Recent Rewards */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-cyan-400" />
            <h3 className="text-white">Novidades no Mapa de Vantagens</h3>
          </div>
          
          <div className="space-y-3">
            {recentRewards.map((reward, index) => (
              <Card key={index} className="bg-white/5 backdrop-blur border-purple-300/20 hover:bg-white/10 hover:border-purple-400/30 transition-all">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="text-sm text-white mb-1">{reward.title}</h4>
                      <p className="text-xs text-purple-300">{reward.partner}</p>
                    </div>
                    <Badge 
                      variant="outline" 
                      className="text-xs border-cyan-400/40 text-cyan-300 bg-cyan-600/20"
                    >
                      {reward.level}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="bg-white/5 backdrop-blur border-purple-300/20 hover:bg-white/10 transition-all">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 bg-purple-600/30 rounded-full flex items-center justify-center mx-auto mb-2 border border-purple-400/30">
                <Award className="w-5 h-5 text-purple-400" />
              </div>
              <p className="text-xs text-purple-300">Selos</p>
              <p className="text-lg text-white">12</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/5 backdrop-blur border-cyan-300/20 hover:bg-white/10 transition-all">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 bg-cyan-600/30 rounded-full flex items-center justify-center mx-auto mb-2 border border-cyan-400/30">
                <div className="w-5 h-5 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full" />
              </div>
              <p className="text-xs text-cyan-300">Reciclagens</p>
              <p className="text-lg text-white">89</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/5 backdrop-blur border-purple-300/20 hover:bg-white/10 transition-all">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 bg-purple-600/30 rounded-full flex items-center justify-center mx-auto mb-2 border border-purple-400/30">
                <Gift className="w-5 h-5 text-purple-400" />
              </div>
              <p className="text-xs text-purple-300">Resgates</p>
              <p className="text-lg text-white">7</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gradient-to-r from-purple-600 to-cyan-600 mt-6">
        <div className="max-w-md mx-auto px-6 py-6">
          <div className="text-center">
            <p className="text-sm text-gray-900">Seu impacto faz a diferença! 🌱</p>
            <p className="text-xs text-gray-800 mt-1">Continue reciclando e desbloqueando benefícios</p>
          </div>
        </div>
      </div>
    </div>
  );
}