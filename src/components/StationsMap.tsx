import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { MapPin, Clock, User, List, Map, Navigation } from 'lucide-react';

interface Station {
  id: string;
  name: string;
  address: string;
  hours: string;
  ambassador: string;
  distance: string;
  status: 'open' | 'closed' | 'busy';
  coordinates: { lat: number; lng: number };
}

export function StationsMap() {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');

  const stations: Station[] = [
    {
      id: '1',
      name: 'UNINASSAU das Graças',
      address: 'R. Joaquim Nabuco, 1469 - Graças, Recife',
      hours: '07:00 - 22:00',
      ambassador: 'Ana Carolina Tech',
      distance: '0.3 km',
      status: 'open',
      coordinates: { lat: -8.0385, lng: -34.9039 }
    },
    {
      id: '2',
      name: 'UFPE - Campus Recife',
      address: 'Av. Prof. Moraes Rego, 1235 - Cidade Universitária',
      hours: '08:00 - 18:00',
      ambassador: 'Rafael Santos',
      distance: '2.1 km',
      status: 'open',
      coordinates: { lat: -8.0522, lng: -34.9519 }
    },
    {
      id: '3',
      name: 'UNICAP - Universidade Católica',
      address: 'R. do Príncipe, 526 - Boa Vista, Recife',
      hours: '07:30 - 21:00',
      ambassador: 'João Gabriel',
      distance: '1.8 km',
      status: 'busy',
      coordinates: { lat: -8.0476, lng: -34.8770 }
    },
    {
      id: '4',
      name: 'UFRPE - Campus Dois Irmãos',
      address: 'R. Dom Manoel de Medeiros, s/n - Dois Irmãos',
      hours: '08:00 - 17:00',
      ambassador: 'Mariana Silva',
      distance: '4.2 km',
      status: 'open',
      coordinates: { lat: -8.0107, lng: -34.9487 }
    },
    {
      id: '5',
      name: 'FBV - Faculdade Boa Viagem',
      address: 'R. Jean Émile Favre, 422 - Imbiribeira',
      hours: '09:00 - 17:00',
      ambassador: 'Pedro Costa',
      distance: '3.5 km',
      status: 'closed',
      coordinates: { lat: -8.1180, lng: -34.9058 }
    }
  ];

  const getStatusColor = (status: Station['status']) => {
    switch (status) {
      case 'open': return 'bg-cyan-100 text-cyan-800 border-cyan-200';
      case 'busy': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'closed': return 'bg-red-100 text-red-800 border-red-200';
    }
  };

  const getStatusText = (status: Station['status']) => {
    switch (status) {
      case 'open': return 'Aberta';
      case 'busy': return 'Ocupada';
      case 'closed': return 'Fechada';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-cyan-600 backdrop-blur-lg border-b border-purple-300/20">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg text-gray-900">Estações de Coleta</h1>
              <p className="text-sm text-gray-800">Recife, PE</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'map' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('map')}
                className={viewMode === 'map' ? 'bg-gray-900 hover:bg-gray-800 text-white' : 'border-gray-900/30 text-gray-900 hover:bg-gray-900/20'}
              >
                <Map className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' ? 'bg-gray-900 hover:bg-gray-800 text-white' : 'border-gray-900/30 text-gray-900 hover:bg-gray-900/20'}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto">
        {viewMode === 'map' ? (
          /* Map View */
          <div className="relative">
            <div className="h-64 bg-gradient-to-br from-cyan-600/20 to-purple-600/20 backdrop-blur-lg flex items-center justify-center border-b border-purple-300/20">
              <div className="text-center space-y-2">
                <MapPin className="w-12 h-12 text-cyan-400 mx-auto" />
                <p className="text-white">Mapa Interativo</p>
                <p className="text-sm text-purple-200 px-8">
                  Visualização completa das estações de coleta em Recife
                </p>
              </div>
            </div>
            
            {/* Map Pins Overlay */}
            <div className="absolute inset-0 pointer-events-none">
              {stations.map((station, index) => (
                <div
                  key={station.id}
                  className="absolute pointer-events-auto"
                  style={{
                    top: `${20 + index * 15}%`,
                    left: `${15 + index * 20}%`
                  }}
                >
                  <div className="relative group cursor-pointer">
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shadow-lg ${
                      station.status === 'open' ? 'bg-cyan-500 border-cyan-400' :
                      station.status === 'busy' ? 'bg-purple-500 border-purple-400' :
                      'bg-red-500 border-red-400'
                    }`}>
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <div className="bg-purple-900/90 backdrop-blur-lg text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap border border-purple-300/20">
                        {station.name}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-purple-900"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* Stations List */}
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-cyan-300">
              {stations.length} estações encontradas
            </p>
            <Button variant="outline" size="sm" className="border-purple-300/30 text-cyan-300 hover:bg-purple-600/20">
              <Navigation className="w-4 h-4 mr-2" />
              Mais próximas
            </Button>
          </div>

          <div className="space-y-3">
            {stations.map((station) => (
              <Card key={station.id} className="bg-white/10 backdrop-blur-lg border-purple-300/20 hover:bg-white/15 transition-all">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="text-white mb-1">{station.name}</h3>
                      <p className="text-sm text-cyan-300 mb-2">{station.address}</p>
                    </div>
                    <Badge variant="outline" className={getStatusColor(station.status)}>
                      {getStatusText(station.status)}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-cyan-300">
                      <Clock className="w-4 h-4" />
                      <span>{station.hours}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-cyan-300">
                      <User className="w-4 h-4" />
                      <span>Embaixador: {station.ambassador}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-cyan-300">
                      <Navigation className="w-4 h-4" />
                      <span>{station.distance}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Button 
                      size="sm" 
                      className="flex-1 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white"
                      disabled={station.status === 'closed'}
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      Ir para Estação
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-purple-300/30 text-cyan-300 hover:bg-purple-600/20"
                      disabled={station.status === 'closed'}
                    >
                      Info
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gradient-to-r from-purple-600 to-cyan-600 mt-6">
        <div className="max-w-md mx-auto px-6 py-6">
          <div className="text-center">
            <p className="text-sm text-gray-900">Encontre a estação mais próxima! 📍</p>
            <p className="text-xs text-gray-800 mt-1">Recife tem {stations.length} estações de coleta ativas</p>
          </div>
        </div>
      </div>
    </div>
  );
}