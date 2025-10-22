import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { QrCode, Download, X, Info } from 'lucide-react';
import { auth } from '../utils/api';

export function UserQRCode() {
  const [showQRCode, setShowQRCode] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');

  useEffect(() => {
    const user = auth.getCurrentUser();
    setCurrentUser(user);
  }, []);

  useEffect(() => {
    if (showQRCode && currentUser) {
      generateQRCode();
    }
  }, [showQRCode, currentUser]);

  const generateQRCode = async () => {
    if (!currentUser) return;

    // Criar dados do QR code com informações do usuário
    const qrData = JSON.stringify({
      userId: currentUser.id,
      userName: currentUser.nome,
      userEmail: currentUser.email,
      userLevel: currentUser.nivel || 'Iniciante',
      userKeys: currentUser.chaves_impacto || 0,
      timestamp: new Date().getTime()
    });

    // Carregar biblioteca QRCode.js dinamicamente
    if (!(window as any).QRCode) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js';
      script.onload = () => {
        createQRCode(qrData);
      };
      document.head.appendChild(script);
    } else {
      createQRCode(qrData);
    }
  };

  const createQRCode = (data: string) => {
    const container = document.getElementById('qrcode-container');
    if (!container) return;

    // Limpar container anterior
    container.innerHTML = '';

    // Criar QR code
    const QRCode = (window as any).QRCode;
    const qr = new QRCode(container, {
      text: data,
      width: 256,
      height: 256,
      colorDark: '#1f2937',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H
    });

    // Aguardar geração e capturar como imagem
    setTimeout(() => {
      const canvas = container.querySelector('canvas');
      if (canvas) {
        const dataUrl = canvas.toDataURL('image/png');
        setQrCodeDataUrl(dataUrl);
      }
    }, 100);
  };

  const downloadQRCode = () => {
    if (!qrCodeDataUrl) return;

    const link = document.createElement('a');
    link.download = `circuito-jovem-qrcode-${currentUser?.nome || 'usuario'}.png`;
    link.href = qrCodeDataUrl;
    link.click();
  };

  if (!showQRCode) {
    return (
      <Card className="bg-white/10 backdrop-blur border-purple-300/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-3 mb-4">
            <QrCode className="w-6 h-6 text-cyan-400 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-white mb-1">Meu QR Code</h3>
              <p className="text-sm text-purple-200">
                Use para validar suas coletas nas estações
              </p>
            </div>
          </div>
          <Button 
            className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white"
            onClick={() => setShowQRCode(true)}
          >
            <QrCode className="w-4 h-4 mr-2" />
            Gerar Meu QR Code
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/10 backdrop-blur border-purple-300/20">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white">Meu QR Code</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowQRCode(false)}
            className="text-purple-200 hover:text-white hover:bg-purple-600/20"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* QR Code */}
        <div className="bg-white rounded-xl p-6 mb-4">
          <div 
            id="qrcode-container" 
            className="flex items-center justify-center"
          />
        </div>

        {/* User Info */}
        <div className="bg-gradient-to-r from-cyan-600/20 to-purple-600/20 border border-purple-400/30 rounded-lg p-4 mb-4">
          <div className="text-center space-y-2">
            <p className="text-white">{currentUser?.nome}</p>
            <Badge variant="outline" className="bg-cyan-500/20 text-cyan-300 border-cyan-400/30">
              {currentUser?.nivel || 'Iniciante'}
            </Badge>
            <p className="text-sm text-purple-200">
              {currentUser?.chaves_impacto || 0} Chaves de Impacto
            </p>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-purple-500/10 border border-purple-400/20 rounded-lg p-3 mb-4">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-purple-300 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-purple-200">
              Mostre este QR code para o Embaixador da estação de coleta para validar sua entrega e receber suas chaves!
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1 border-purple-300/30 text-purple-200 hover:bg-purple-600/20"
            onClick={downloadQRCode}
            disabled={!qrCodeDataUrl}
          >
            <Download className="w-4 h-4 mr-2" />
            Baixar
          </Button>
          <Button
            className="flex-1 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white"
            onClick={() => setShowQRCode(false)}
          >
            Fechar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
