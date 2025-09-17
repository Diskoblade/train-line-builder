import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Station {
  id: string;
  name: string;
  x: number;
  y: number;
  isMajor: boolean;
}

interface ElevationPoint {
  distance_km: number;
  elevation_m: number;
}

interface Track {
  id: string;
  from: string;
  to: string;
  type: 'main' | 'express' | 'local';
  length: number;
  elevation_profile: ElevationPoint[];
  num_curves: number;
}

interface Train {
  id: string;
  name: string;
  from: string;
  to: string;
  weight: number;
  speed: number;
  type: 'express' | 'passenger' | 'freight';
  x: number;
  y: number;
  progress: number;
  isActive: boolean;
}

const RailwayNetwork: React.FC = () => {
  const [trains, setTrains] = useState<Train[]>([]);
  const [newTrain, setNewTrain] = useState({
    name: '',
    from: '',
    to: '',
    weight: '',
    speed: '',
    type: 'passenger' as const
  });

  // Define stations based on your railway map reference
  const stations: Station[] = [
    { id: 'bangalore', name: 'Bangalore', x: 300, y: 400, isMajor: true },
    { id: 'davanagere', name: 'Davanagere', x: 200, y: 200, isMajor: true },
    { id: 'ballari', name: 'Ballari', x: 350, y: 150, isMajor: true },
    { id: 'anantapur', name: 'Anantapur', x: 400, y: 250, isMajor: true },
    { id: 'chennai', name: 'Chennai', x: 600, y: 450, isMajor: true },
    { id: 'mysuru', name: 'Mysuru', x: 250, y: 500, isMajor: true },
    { id: 'tumakuru', name: 'Tumakuru', x: 250, y: 350, isMajor: false },
    { id: 'hosur', name: 'Hosur', x: 350, y: 480, isMajor: false },
    { id: 'krishnagiri', name: 'Krishnagiri', x: 450, y: 400, isMajor: false },
    { id: 'kadapa', name: 'Kadapa', x: 500, y: 300, isMajor: false },
  ];

  const tracks: Track[] = [
    { 
      id: 't1', 
      from: 'bangalore', 
      to: 'davanagere', 
      type: 'main', 
      length: 180,
      elevation_profile: [
        { distance_km: 0, elevation_m: 900 },
        { distance_km: 90, elevation_m: 800 },
        { distance_km: 180, elevation_m: 600 }
      ],
      num_curves: 8
    },
    { 
      id: 't2', 
      from: 'davanagere', 
      to: 'ballari', 
      type: 'express', 
      length: 200,
      elevation_profile: [
        { distance_km: 0, elevation_m: 600 },
        { distance_km: 100, elevation_m: 500 },
        { distance_km: 200, elevation_m: 450 }
      ],
      num_curves: 5
    },
    { 
      id: 't3', 
      from: 'ballari', 
      to: 'anantapur', 
      type: 'main', 
      length: 120,
      elevation_profile: [
        { distance_km: 0, elevation_m: 450 },
        { distance_km: 60, elevation_m: 500 },
        { distance_km: 120, elevation_m: 520 }
      ],
      num_curves: 6
    },
    { 
      id: 't4', 
      from: 'anantapur', 
      to: 'kadapa', 
      type: 'local', 
      length: 140,
      elevation_profile: [
        { distance_km: 0, elevation_m: 520 },
        { distance_km: 70, elevation_m: 480 },
        { distance_km: 140, elevation_m: 400 }
      ],
      num_curves: 12
    },
    { 
      id: 't5', 
      from: 'bangalore', 
      to: 'mysuru', 
      type: 'express', 
      length: 150,
      elevation_profile: [
        { distance_km: 0, elevation_m: 900 },
        { distance_km: 75, elevation_m: 800 },
        { distance_km: 150, elevation_m: 770 }
      ],
      num_curves: 4
    },
    { 
      id: 't6', 
      from: 'bangalore', 
      to: 'tumakuru', 
      type: 'local', 
      length: 80,
      elevation_profile: [
        { distance_km: 0, elevation_m: 900 },
        { distance_km: 40, elevation_m: 850 },
        { distance_km: 80, elevation_m: 820 }
      ],
      num_curves: 7
    },
    { 
      id: 't7', 
      from: 'bangalore', 
      to: 'hosur', 
      type: 'main', 
      length: 60,
      elevation_profile: [
        { distance_km: 0, elevation_m: 900 },
        { distance_km: 30, elevation_m: 880 },
        { distance_km: 60, elevation_m: 850 }
      ],
      num_curves: 3
    },
    { 
      id: 't8', 
      from: 'hosur', 
      to: 'krishnagiri', 
      type: 'main', 
      length: 100,
      elevation_profile: [
        { distance_km: 0, elevation_m: 850 },
        { distance_km: 50, elevation_m: 700 },
        { distance_km: 100, elevation_m: 600 }
      ],
      num_curves: 8
    },
    { 
      id: 't9', 
      from: 'krishnagiri', 
      to: 'chennai', 
      type: 'express', 
      length: 200,
      elevation_profile: [
        { distance_km: 0, elevation_m: 600 },
        { distance_km: 100, elevation_m: 300 },
        { distance_km: 200, elevation_m: 50 }
      ],
      num_curves: 6
    },
    { 
      id: 't10', 
      from: 'kadapa', 
      to: 'chennai', 
      type: 'main', 
      length: 180,
      elevation_profile: [
        { distance_km: 0, elevation_m: 400 },
        { distance_km: 90, elevation_m: 200 },
        { distance_km: 180, elevation_m: 50 }
      ],
      num_curves: 9
    },
  ];

  const getStationById = (id: string) => stations.find(s => s.id === id);

  const calculateTrainTravelTimeContinuous = (
    elevationProfile: ElevationPoint[],
    weightTonnes: number,
    averageSpeedKmh: number,
    numCurves: number
  ): number => {
    if (!elevationProfile || elevationProfile.length < 2) {
      return 1; // Default to 1 hour if invalid profile
    }
    if (averageSpeedKmh <= 0) {
      return Infinity;
    }

    let totalTimeHours = 0.0;

    // Iterate through each segment of the track
    for (let i = 0; i < elevationProfile.length - 1; i++) {
      const startPoint = elevationProfile[i];
      const endPoint = elevationProfile[i + 1];
      
      const segmentLengthKm = endPoint.distance_km - startPoint.distance_km;
      const elevationChangeM = endPoint.elevation_m - startPoint.elevation_m;
      
      // Base time for the segment (on flat track)
      const baseSegmentTimeHours = segmentLengthKm / averageSpeedKmh;
      
      // Calculate slope influence
      const slopeInfluence = (elevationChangeM / segmentLengthKm) * (weightTonnes / 1000);
      const effectiveSpeedFactor = Math.max(0.01, 1.0 - (slopeInfluence * 1.5e-3));
      
      const segmentTimeHours = baseSegmentTimeHours / effectiveSpeedFactor;
      totalTimeHours += segmentTimeHours;
    }

    // Add penalty for curves (3 minutes per curve)
    const curvePenaltyHours = numCurves * 0.05;
    totalTimeHours += curvePenaltyHours;

    return totalTimeHours;
  };

  const getTrackById = (from: string, to: string) => {
    return tracks.find(track => 
      (track.from === from && track.to === to) || 
      (track.from === to && track.to === from)
    );
  };

  const calculateTrainPosition = (train: Train) => {
    const fromStation = getStationById(train.from);
    const toStation = getStationById(train.to);
    
    if (!fromStation || !toStation) return { x: 0, y: 0 };

    const progress = train.progress / 100;
    const x = fromStation.x + (toStation.x - fromStation.x) * progress;
    const y = fromStation.y + (toStation.y - fromStation.y) * progress;
    
    return { x, y };
  };

  const addTrain = () => {
    if (!newTrain.name || !newTrain.from || !newTrain.to || !newTrain.weight || !newTrain.speed) {
      return;
    }

    const train: Train = {
      id: `train-${Date.now()}`,
      name: newTrain.name,
      from: newTrain.from,
      to: newTrain.to,
      weight: parseInt(newTrain.weight),
      speed: parseInt(newTrain.speed),
      type: newTrain.type,
      x: 0,
      y: 0,
      progress: 0,
      isActive: true
    };

    setTrains(prev => [...prev, train]);
    setNewTrain({
      name: '',
      from: '',
      to: '',
      weight: '',
      speed: '',
      type: 'passenger'
    });
  };

  const getTrainColor = (type: string) => {
    switch (type) {
      case 'express': return 'hsl(var(--train-express))';
      case 'freight': return 'hsl(var(--train-secondary))';
      default: return 'hsl(var(--train-primary))';
    }
  };

  const getTrackClass = (type: string) => {
    switch (type) {
      case 'express': return 'railway-track-express';
      case 'local': return 'railway-track-alt';
      default: return 'railway-track';
    }
  };

  // Animate trains with realistic travel times
  useEffect(() => {
    const interval = setInterval(() => {
      setTrains(prevTrains => 
        prevTrains.map(train => {
          if (!train.isActive) return train;
          
          const track = getTrackById(train.from, train.to);
          if (!track) return train;

          // Calculate realistic travel time for this track
          const travelTimeHours = calculateTrainTravelTimeContinuous(
            track.elevation_profile,
            train.weight,
            train.speed,
            track.num_curves
          );
          
          // Convert to progress increment (100% over total travel time)
          const progressIncrement = (100 / (travelTimeHours * 3600)) * 100; // per 100ms
          const newProgress = train.progress + progressIncrement;
          
          if (newProgress >= 100) {
            // Train reached destination, reverse direction
            return {
              ...train,
              from: train.to,
              to: train.from,
              progress: 0
            };
          }
          
          const position = calculateTrainPosition({ ...train, progress: newProgress });
          
          return {
            ...train,
            progress: newProgress,
            x: position.x,
            y: position.y
          };
        })
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[hsl(var(--network-bg))] p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-foreground">
          Railway Network Simulator
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Control Panel */}
          <div className="lg:col-span-1">
            <Card className="control-panel">
              <CardHeader>
                <CardTitle>Add New Train</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="trainName">Train Name</Label>
                  <Input
                    id="trainName"
                    value={newTrain.name}
                    onChange={(e) => setNewTrain(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Express 101"
                  />
                </div>
                
                <div>
                  <Label htmlFor="fromStation">From Station</Label>
                  <Select value={newTrain.from} onValueChange={(value) => setNewTrain(prev => ({ ...prev, from: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select station" />
                    </SelectTrigger>
                    <SelectContent>
                      {stations.map(station => (
                        <SelectItem key={station.id} value={station.id}>
                          {station.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="toStation">To Station</Label>
                  <Select value={newTrain.to} onValueChange={(value) => setNewTrain(prev => ({ ...prev, to: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select station" />
                    </SelectTrigger>
                    <SelectContent>
                      {stations.filter(s => s.id !== newTrain.from).map(station => (
                        <SelectItem key={station.id} value={station.id}>
                          {station.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="weight">Weight (tons)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={newTrain.weight}
                    onChange={(e) => setNewTrain(prev => ({ ...prev, weight: e.target.value }))}
                    placeholder="500"
                  />
                </div>
                
                <div>
                  <Label htmlFor="speed">Average Speed (km/h)</Label>
                  <Input
                    id="speed"
                    type="number"
                    value={newTrain.speed}
                    onChange={(e) => setNewTrain(prev => ({ ...prev, speed: e.target.value }))}
                    placeholder="80"
                  />
                </div>
                
                <div>
                  <Label htmlFor="trainType">Train Type</Label>
                  <Select value={newTrain.type} onValueChange={(value: any) => setNewTrain(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="passenger">Passenger</SelectItem>
                      <SelectItem value="express">Express</SelectItem>
                      <SelectItem value="freight">Freight</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button onClick={addTrain} className="w-full" disabled={!newTrain.name || !newTrain.from || !newTrain.to}>
                  Add Train to Network
                </Button>
              </CardContent>
            </Card>
            
            {/* Active Trains List */}
            <Card className="mt-4 control-panel">
              <CardHeader>
                <CardTitle>Active Trains ({trains.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {trains.map(train => (
                    <div key={train.id} className="flex items-center justify-between p-2 bg-muted rounded">
                      <div>
                        <div className="font-medium text-sm">{train.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {getStationById(train.from)?.name} → {getStationById(train.to)?.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {train.weight}t • {train.speed}km/h
                        </div>
                      </div>
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: getTrainColor(train.type) }}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Railway Network Visualization */}
          <div className="lg:col-span-3">
            <Card className="control-panel h-[600px]">
              <CardContent className="p-6 h-full">
                <svg width="100%" height="100%" viewBox="0 0 700 600" className="border rounded">
                  {/* Railway Tracks */}
                  {tracks.map(track => {
                    const fromStation = getStationById(track.from);
                    const toStation = getStationById(track.to);
                    if (!fromStation || !toStation) return null;
                    
                    return (
                      <line
                        key={track.id}
                        x1={fromStation.x}
                        y1={fromStation.y}
                        x2={toStation.x}
                        y2={toStation.y}
                        className={getTrackClass(track.type)}
                        strokeDasharray={track.type === 'local' ? '5,5' : 'none'}
                      />
                    );
                  })}
                  
                  {/* Stations */}
                  {stations.map(station => (
                    <g key={station.id}>
                      <circle
                        cx={station.x}
                        cy={station.y}
                        r={station.isMajor ? 8 : 5}
                        className={station.isMajor ? 'railway-station-major' : 'railway-station'}
                      />
                      <text
                        x={station.x}
                        y={station.y - (station.isMajor ? 15 : 12)}
                        textAnchor="middle"
                        className="text-xs font-medium fill-foreground"
                      >
                        {station.name}
                      </text>
                    </g>
                  ))}
                  
                  {/* Moving Trains */}
                  {trains.map(train => {
                    const position = calculateTrainPosition(train);
                    return (
                      <g key={train.id}>
                        <circle
                          cx={position.x}
                          cy={position.y}
                          r="6"
                          fill={getTrainColor(train.type)}
                          className="train-circle"
                        />
                        <text
                          x={position.x}
                          y={position.y - 12}
                          textAnchor="middle"
                          className="text-xs font-medium fill-foreground"
                        >
                          {train.name}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RailwayNetwork;