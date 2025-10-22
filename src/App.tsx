import React, { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { Leaderboard } from './components/Leaderboard';
import { StationsMap } from './components/StationsMap';
import { RewardsMap } from './components/RewardsMap';
import { Profile } from './components/Profile';
import { AmbassadorDashboard } from './components/AmbassadorDashboard';
import { AmbassadorValidation } from './components/AmbassadorValidation';
import { CommerceValidator } from './components/CommerceValidator';
import { MissionsAchievements } from './components/MissionsAchievements';
import { Community } from './components/Community';
import { BottomNavigation } from './components/BottomNavigation';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { QuickTutorial } from './components/QuickTutorial';
import { SetupInstructions } from './components/SetupInstructions';
import { Button } from './components/ui/button';
import { HelpCircle } from 'lucide-react';
import { Toaster } from './components/ui/sonner';
import { auth } from './utils/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAmbassador, setIsAmbassador] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [showTutorial, setShowTutorial] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [showSetupInstructions, setShowSetupInstructions] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setIsFirstVisit(false);
    
    // Verificar se o usuário é embaixador
    const user = auth.getCurrentUser();
    if (user && user.tipo === 'embaixador') {
      setIsAmbassador(true);
    }
  };

  const handleSignup = () => {
    setIsAuthenticated(true);
    setShowTutorial(true);
    
    // Verificar se o usuário é embaixador
    const user = auth.getCurrentUser();
    if (user && user.tipo === 'embaixador') {
      setIsAmbassador(true);
    }
  };

  useEffect(() => {
    if (isAuthenticated && isFirstVisit) {
      setShowTutorial(true);
    }
    
    // Verificar o tipo de usuário ao autenticar
    if (isAuthenticated) {
      const user = auth.getCurrentUser();
      if (user && user.tipo === 'embaixador') {
        setIsAmbassador(true);
      }
    }
  }, [isAuthenticated, isFirstVisit]);

  useEffect(() => {
    const handleNavigate = (event: CustomEvent) => {
      setActiveTab(event.detail);
    };
    
    window.addEventListener('navigate', handleNavigate as EventListener);
    return () => window.removeEventListener('navigate', handleNavigate as EventListener);
  }, []);

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onNavigateToStations={() => setActiveTab('stations')} />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'stations':
        return <StationsMap />;
      case 'rewards':
        return <RewardsMap />;
      case 'profile':
        return <Profile onNavigateToAdmin={(screen) => setActiveTab(screen)} />;
      case 'ambassador-dashboard':
        return <AmbassadorDashboard />;
      case 'ambassador-validation':
        return <AmbassadorValidation />;
      case 'commerce-validator':
        return <CommerceValidator />;
      case 'missions':
        return <MissionsAchievements />;
      case 'community':
        return <Community />;
      default:
        return <Dashboard onNavigateToStations={() => setActiveTab('stations')} />;
    }
  };

  // Show setup instructions if needed
  if (showSetupInstructions) {
    return <SetupInstructions />;
  }

  // Show authentication screens if not authenticated
  if (!isAuthenticated) {
    if (authMode === 'login') {
      return (
        <Login 
          onLogin={handleLogin}
          onSwitchToSignup={() => setAuthMode('signup')}
          onShowSetup={() => setShowSetupInstructions(true)}
        />
      );
    } else {
      return (
        <Signup 
          onSignup={handleSignup}
          onSwitchToLogin={() => setAuthMode('login')}
          onShowSetup={() => setShowSetupInstructions(true)}
        />
      );
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 to-blue-950 pb-20">
      {/* Help Button - Moved to bottom left to avoid covering avatar */}
      <div className="fixed bottom-24 left-4 z-40">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setShowTutorial(true)}
          className="bg-white/10 backdrop-blur border-purple-300/20 text-purple-200 hover:bg-white/20 hover:text-white shadow-lg"
        >
          <HelpCircle className="w-4 h-4 mr-1" />
          Ajuda
        </Button>
      </div>

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

      {/* Quick Tutorial */}
      {showTutorial && (
        <QuickTutorial onClose={() => {
          setShowTutorial(false);
          setIsFirstVisit(false);
        }} />
      )}

      {/* Toast Notifications */}
      <Toaster position="top-center" />
    </div>
  );
}