import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Eye, EyeOff, Mail, Lock, User, School, Smartphone } from 'lucide-react';

interface SignupProps {
  onSignup: () => void;
  onSwitchToLogin: () => void;
}

export const Signup: React.FC<SignupProps> = ({ onSignup, onSwitchToLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    institution: '',
    userType: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('As senhas não coincidem');
      return;
    }
    onSignup();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-purple-800 flex items-center justify-center p-4">
      {/* Background Tech Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 backdrop-blur-3xl"></div>
      
      <div className="relative w-full max-w-md">
        {/* App Logo/Title */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center">
            <Smartphone className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Circuito Jovem</h1>
          <p className="text-purple-200">Sustentável & Tech</p>
        </div>

        <Card className="bg-white/10 backdrop-blur-lg border-purple-300/20">
          <CardHeader>
            <CardTitle className="text-white text-center">Criar nova conta</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-purple-200 text-sm">Nome completo</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-purple-300" />
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Seu nome completo"
                    className="pl-10 bg-white/10 border-purple-300/30 text-white placeholder:text-purple-300"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-purple-200 text-sm">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-purple-300" />
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="seu@email.com"
                    className="pl-10 bg-white/10 border-purple-300/30 text-white placeholder:text-purple-300"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-purple-200 text-sm">Tipo de usuário</label>
                <Select onValueChange={(value) => handleInputChange('userType', value)}>
                  <SelectTrigger className="bg-white/10 border-purple-300/30 text-white">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-purple-300/30">
                    <SelectItem value="student" className="text-white hover:bg-purple-500/20">Estudante</SelectItem>
                    <SelectItem value="ambassador" className="text-white hover:bg-purple-500/20">Jovem Embaixador</SelectItem>
                    <SelectItem value="community" className="text-white hover:bg-purple-500/20">Comunidade</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-purple-200 text-sm">Instituição</label>
                <div className="relative">
                  <School className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-purple-300" />
                  <Select onValueChange={(value) => handleInputChange('institution', value)}>
                    <SelectTrigger className="pl-10 bg-white/10 border-purple-300/30 text-white">
                      <SelectValue placeholder="Selecione sua instituição" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-purple-300/30">
                      <SelectItem value="uninassau-gracas" className="text-white hover:bg-purple-500/20">UNINASSAU das Graças</SelectItem>
                      <SelectItem value="ufpe" className="text-white hover:bg-purple-500/20">UFPE</SelectItem>
                      <SelectItem value="ufrpe" className="text-white hover:bg-purple-500/20">UFRPE</SelectItem>
                      <SelectItem value="unicap" className="text-white hover:bg-purple-500/20">UNICAP</SelectItem>
                      <SelectItem value="outros" className="text-white hover:bg-purple-500/20">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-purple-200 text-sm">Senha</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-purple-300" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Sua senha"
                    className="pl-10 pr-10 bg-white/10 border-purple-300/30 text-white placeholder:text-purple-300"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-300 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-purple-200 text-sm">Confirmar senha</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-purple-300" />
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    placeholder="Confirme sua senha"
                    className="pl-10 pr-10 bg-white/10 border-purple-300/30 text-white placeholder:text-purple-300"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-300 hover:text-white"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white"
              >
                Criar conta
              </Button>

              <div className="text-center pt-4">
                <p className="text-purple-200 text-sm">
                  Já tem uma conta?{' '}
                  <button
                    type="button"
                    onClick={onSwitchToLogin}
                    className="text-cyan-300 hover:text-cyan-200 underline"
                  >
                    Fazer login
                  </button>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-purple-300 text-xs">
            Conectando jovens com sustentabilidade através da tecnologia
          </p>
        </div>
      </div>
    </div>
  );
};