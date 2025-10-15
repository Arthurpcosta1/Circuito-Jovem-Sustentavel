import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { StationsMap } from './components/StationsMap';
import { RewardsMap } from './components/RewardsMap';
import { Profile } from './components/Profile';
import { AmbassadorValidation } from './components/AmbassadorValidation';
import { Leaderboard } from './components/Leaderboard';
import { BottomNavigation } from './components/BottomNavigation';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { Card, CardContent } from './components/ui/card';
import { Users, Crown } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAmbassador, setIsAmbassador] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleSignup = () => {
    setIsAuthenticated(true);
  };

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'stations':
        return <StationsMap />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'rewards':
        return <RewardsMap />;
      case 'profile':
        return <Profile />;
      case 'validation':
        return isAmbassador ? <AmbassadorValidation /> : <Dashboard />;
      default:
        return <Dashboard />;
    }
  };

  // Show authentication screens if not authenticated
  if (!isAuthenticated) {
    if (authMode === 'login') {
      return (
        <Login 
          onLogin={handleLogin}
          onSwitchToSignup={() => setAuthMode('signup')}
        />
      );
    } else {
      return (
        <Signup 
          onSignup={handleSignup}
          onSwitchToLogin={() => setAuthMode('login')}
        />
      );
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 to-blue-950 pb-20">
      {/* Ambassador Toggle (Demo Purpose) */}
      {activeTab === 'dashboard' && (
        <div className="fixed top-4 right-4 z-50">
          <Card className="border border-purple-300/20 bg-white/10 backdrop-blur">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-purple-200">Modo:</span>
                <Button
                  variant={isAmbassador ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsAmbassador(!isAmbassador)}
                  className={`text-xs h-7 px-2 ${
                    isAmbassador ? 'bg-purple-600 hover:bg-purple-700' : 'border-purple-300/30 text-purple-200 hover:bg-purple-600/20'
                  }`}
                >
                  {isAmbassador ? (
                    <>
                      <Crown className="w-3 h-3 mr-1" />
                      Embaixador
                    </>
                  ) : (
                    <>
                      <Users className="w-3 h-3 mr-1" />
                      Usuário
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content */}
      <main className="relative">
        {renderActiveScreen()}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        isAmbassador={isAmbassador}
      />

      {/* App Badge */}
      <div className="fixed top-4 left-4 z-40">
        <Badge 
          variant="outline" 
          className="bg-white/10 backdrop-blur border-purple-300/20 text-purple-200 text-xs px-2 py-1"
        >
          Circuito Jovem Tech
        </Badge>
      </div>
    </div>
  );
}