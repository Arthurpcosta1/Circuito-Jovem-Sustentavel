import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { QrCode, Scan, Check, X, User, Scale, Package } from 'lucide-react';

interface CollectionData {
  userId: string;
  userName: string;
  userLevel: string;
  weight: string;
  materialType: string;
  keysToAward: number;
}

export function AmbassadorValidation() {
  const [scanMode, setScanMode] = useState(false);
  const [collectionData, setCollectionData] = useState<CollectionData | null>(null);
  const [weight, setWeight] = useState('');
  const [materialType, setMaterialType] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Mock user data from QR scan
  const mockUserData = {
    userId: 'user_123',
    userName: 'Arthur Silva',
    userLevel: 'Guardião Ambiental',
    avatar: 'AS'
  };

  const materialTypes = [
    { value: 'papel', label: 'Papel', keysPerKg: 2 },
    { value: 'plastico', label: 'Plástico', keysPerKg: 3 },
    { value: 'metal', label: 'Metal', keysPerKg: 5 },
    { value: 'vidro', label: 'Vidro', keysPerKg: 4 },
    { value: 'eletronico', label: 'Eletrônico', keysPerKg: 10 }
  ];

  const calculateKeys = (weightStr: string, material: string): number => {
    const weightNum = parseFloat(weightStr) || 0;
    const materialData = materialTypes.find(m => m.value === material);
    return Math.floor(weightNum * (materialData?.keysPerKg || 0));
  };

  const handleQRScan = () => {
    setScanMode(true);
    // Simulate QR scan delay
    setTimeout(() => {
      setCollectionData({
        userId: mockUserData.userId,
        userName: mockUserData.userName,
        userLevel: mockUserData.userLevel,
        weight: '',
        materialType: '',
        keysToAward: 0
      });
      setScanMode(false);
    }, 2000);
  };

  const handleWeightChange = (value: string) => {
    setWeight(value);
    if (collectionData && materialType) {
      const keys = calculateKeys(value, materialType);
      setCollectionData({
        ...collectionData,
        weight: value,
        keysToAward: keys
      });
    }
  };

  const handleMaterialChange = (value: string) => {
    setMaterialType(value);
    if (collectionData && weight) {
      const keys = calculateKeys(weight, value);
      setCollectionData({
        ...collectionData,
        materialType: value,
        keysToAward: keys
      });
    }
  };

  const handleConfirmCollection = () => {
    setIsProcessing(true);
    
    // Simulate processing delay
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
      
      // Reset after 3 seconds
      setTimeout(() => {
        setIsComplete(false);
        setCollectionData(null);
        setWeight('');
        setMaterialType('');
      }, 3000);
    }, 1500);
  };

  const handleCancel = () => {
    setCollectionData(null);
    setWeight('');
    setMaterialType('');
    setScanMode(false);
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="max-w-md mx-auto p-6">
          <Card className="border-cyan-400/30 bg-white/10 backdrop-blur">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg text-white mb-2">Coleta Registrada!</h3>
              <p className="text-cyan-300 mb-4">
                {collectionData?.keysToAward} Chaves de Impacto enviadas para {collectionData?.userName}
              </p>
              <div className="text-sm text-purple-300">
                Retornando ao painel...
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-cyan-600">
        <div className="max-w-md mx-auto px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-900/20 rounded-full flex items-center justify-center">
              <QrCode className="w-5 h-5 text-gray-900" />
            </div>
            <div>
              <h1 className="text-lg text-gray-900">Validação de Coleta</h1>
              <p className="text-gray-800 text-sm">Painel do Embaixador</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6">
        {!collectionData ? (
          /* QR Scanner Interface */
          <div className="space-y-6">
            <Card className="bg-white/10 backdrop-blur border-purple-300/20">
              <CardContent className="p-8 text-center">
                <div className={`w-32 h-32 mx-auto mb-6 rounded-xl border-2 border-dashed flex items-center justify-center ${
                  scanMode ? 'border-cyan-400 bg-cyan-500/10' : 'border-purple-300/30 bg-white/5'
                }`}>
                  {scanMode ? (
                    <div className="space-y-2">
                      <Scan className="w-8 h-8 text-cyan-400 mx-auto animate-pulse" />
                      <p className="text-xs text-cyan-400">Escaneando...</p>
                    </div>
                  ) : (
                    <QrCode className="w-12 h-12 text-purple-400" />
                  )}
                </div>
                
                <h3 className="text-white mb-2">Escanear QR Code do Usuário</h3>
                <p className="text-sm text-purple-200 mb-6">
                  Posicione o código QR do usuário na frente da câmera
                </p>
                
                <Button 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white"
                  onClick={handleQRScan}
                  disabled={scanMode}
                >
                  <Scan className="w-5 h-5 mr-2" />
                  {scanMode ? 'Escaneando...' : 'Iniciar Escaneamento'}
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur border-purple-300/20">
              <CardContent className="p-6">
                <h4 className="text-white mb-3">Instruções</h4>
                <div className="space-y-2 text-sm text-purple-200">
                  <div className="flex gap-3">
                    <span className="w-6 h-6 bg-cyan-500/20 text-cyan-400 rounded-full flex items-center justify-center flex-shrink-0 text-xs">1</span>
                    <span>Peça para o usuário mostrar o QR Code do perfil</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="w-6 h-6 bg-cyan-500/20 text-cyan-400 rounded-full flex items-center justify-center flex-shrink-0 text-xs">2</span>
                    <span>Escaneie o código usando o botão acima</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="w-6 h-6 bg-cyan-500/20 text-cyan-400 rounded-full flex items-center justify-center flex-shrink-0 text-xs">3</span>
                    <span>Pese o material e registre o tipo</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="w-6 h-6 bg-cyan-500/20 text-cyan-400 rounded-full flex items-center justify-center flex-shrink-0 text-xs">4</span>
                    <span>Confirme para enviar as Chaves de Impacto</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Collection Form */
          <div className="space-y-6">
            {/* User Info */}
            <Card className="border-cyan-400/30 bg-white/10 backdrop-blur">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white">{collectionData.userName}</h3>
                    <Badge variant="outline" className="text-xs border-cyan-400/30 text-cyan-300 bg-cyan-500/10">
                      {collectionData.userLevel}
                    </Badge>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleCancel} className="border-purple-300/30 text-purple-200 hover:bg-purple-600/20">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Collection Form */}
            <Card className="bg-white/10 backdrop-blur border-purple-300/20">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-white">Dados da Coleta</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="weight" className="text-purple-200">Peso do Material (kg)</Label>
                  <div className="relative">
                    <Scale className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-purple-400" />
                    <Input
                      id="weight"
                      type="number"
                      step="0.1"
                      placeholder="0.0"
                      value={weight}
                      onChange={(e) => handleWeightChange(e.target.value)}
                      className="pl-10 bg-white/5 border-purple-300/30 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="material" className="text-purple-200">Tipo de Material</Label>
                  <Select value={materialType} onValueChange={handleMaterialChange}>
                    <SelectTrigger className="bg-white/5 border-purple-300/30 text-white">
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-purple-400" />
                        <SelectValue placeholder="Selecione o material" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      {materialTypes.map((material) => (
                        <SelectItem key={material.value} value={material.value}>
                          <div className="flex justify-between items-center w-full">
                            <span>{material.label}</span>
                            <span className="text-xs text-cyan-400 ml-4">
                              {material.keysPerKg} chaves/kg
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {weight && materialType && (
                  <div className="bg-cyan-500/10 border border-cyan-400/30 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-cyan-300">Chaves de Impacto a conceder:</span>
                      <Badge className="bg-cyan-600 text-white">
                        {collectionData.keysToAward} chaves
                      </Badge>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1 border-purple-300/30 text-purple-200 hover:bg-purple-600/20"
                onClick={handleCancel}
              >
                Cancelar
              </Button>
              <Button 
                className="flex-1 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white"
                onClick={handleConfirmCollection}
                disabled={!weight || !materialType || isProcessing}
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Processando...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Confirmar e Enviar Chaves
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gradient-to-r from-purple-600 to-cyan-600 mt-6">
        <div className="max-w-md mx-auto px-6 py-6">
          <div className="text-center">
            <p className="text-sm text-gray-900">Obrigado por ser Embaixador! 👑</p>
            <p className="text-xs text-gray-800 mt-1">Você está fazendo a diferença no Circuito</p>
          </div>
        </div>
      </div>
    </div>
  );
}