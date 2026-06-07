import React from 'react';
import { CheckCircle, Clock } from 'lucide-react';
import { LockedTabState } from '../components/LockedTabState';

interface GateTabProps {
  unlocked: boolean;
  onOpenScanner: () => void;
}

export const GateTab: React.FC<GateTabProps> = ({ unlocked, onOpenScanner }) => {
  if (!unlocked) {
    return (
      <LockedTabState
        title="Accès aux Portes"
        subtitle="Scannez le code QR de votre billet pour déverrouiller la carte des portes et connaître les temps d'attente en temps réel."
        onOpenScanner={onOpenScanner}
      />
    );
  }

  // Gates density data
  const gates = [
    { name: 'Gate A', density: 'high', color: '#ef4444', label: 'Saturé', time: '18 min' },
    { name: 'Gate B', density: 'medium', color: '#f59e0b', label: 'Modéré', time: '8 min' },
    { name: 'Gate C', density: 'low', color: '#10b981', label: 'Fluide', time: '2 min', recommended: true },
    { name: 'Gate D', density: 'high', color: '#ef4444', label: 'Saturé', time: '15 min' },
    { name: 'Gate E', density: 'medium', color: '#f59e0b', label: 'Modéré', time: '9 min' },
  ];

  return (
    <div className="space-y-4 pb-20">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white mb-1">Accès Portes</h1>
        <p className="text-xs text-slate-400">Flux d'entrée en temps réel et recommandations</p>
      </div>

      {/* Recommendation Notification Card */}
      <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 flex items-center space-x-3.5 relative overflow-hidden">
        {/* Glow background effect */}
        <div className="absolute -top-12 -right-12 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl animate-pulse"></div>

        <div className="p-2.5 bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-emerald-400">
          <CheckCircle className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h3 className="text-xs font-extrabold text-white">Porte C Recommandée</h3>
          <p className="text-[10px] text-emerald-400/90 mt-0.5 font-medium">Temps d'attente estimé : <strong className="text-white">2 min</strong></p>
        </div>
        <span className="text-[9px] font-bold text-white bg-emerald-500 px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse-fast">Idéal</span>
      </div>

      {/* SVG Gates Density Map */}
      <div className="bg-brand-card border border-brand-border rounded-2xl p-4 relative overflow-hidden flex flex-col items-center">
        <h3 className="text-xs font-bold text-slate-300 self-start mb-4 uppercase tracking-wider">Carte d'affluence des Portes</h3>

        <div className="relative w-full max-w-[280px] h-[220px]">
          {/* SVG Stadium circular representation */}
          <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            {/* Outer Ground */}
            <circle cx="50" cy="50" r="45" fill="none" stroke="#1b2e46" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
            
            {/* Stadium Outer Wall */}
            <rect x="20" y="20" width="60" height="60" rx="30" fill="#0d1b2a" stroke="#1E314A" strokeWidth="4" />
            
            {/* Inner Pitch */}
            <rect x="35" y="32" width="30" height="36" rx="3" fill="#10b981" opacity="0.15" stroke="#10b981" strokeWidth="1" />
            <line x1="35" y1="50" x2="65" y2="50" stroke="#10b981" strokeWidth="0.5" opacity="0.3" />
            <circle cx="50" cy="50" r="5" fill="none" stroke="#10b981" strokeWidth="0.5" opacity="0.3" />

            {/* Gate Markers on Outer Wall */}
            {/* Gate A (Top Left) */}
            <circle cx="20" cy="35" r="4.5" fill="#ef4444" stroke="#0d1b2a" strokeWidth="1" />
            <text x="18" y="37" fill="#ffffff" fontSize="5" fontWeight="bold">A</text>

            {/* Gate B (Top Right) */}
            <circle cx="80" cy="35" r="4.5" fill="#f59e0b" stroke="#0d1b2a" strokeWidth="1" />
            <text x="78" y="37" fill="#ffffff" fontSize="5" fontWeight="bold">B</text>

            {/* Gate C (Bottom - Recommended!) */}
            <g>
              {/* Outer pulsing ring */}
              <circle cx="50" cy="85" r="7" fill="#10b981" opacity="0.3" className="animate-ping" />
              <circle cx="50" cy="85" r="4.5" fill="#10b981" stroke="#ffffff" strokeWidth="1" />
              <text x="48.5" y="87" fill="#ffffff" fontSize="5" fontWeight="bold">C</text>
            </g>

            {/* Gate D (Bottom Left) */}
            <circle cx="20" cy="65" r="4.5" fill="#ef4444" stroke="#0d1b2a" strokeWidth="1" />
            <text x="18" y="67" fill="#ffffff" fontSize="5" fontWeight="bold">D</text>

            {/* Gate E (Bottom Right) */}
            <circle cx="80" cy="65" r="4.5" fill="#f59e0b" stroke="#0d1b2a" strokeWidth="1" />
            <text x="78" y="67" fill="#ffffff" fontSize="5" fontWeight="bold">E</text>

            {/* Indicator Line pointing to C */}
            <path d="M 50 85 L 50 95" stroke="#10b981" strokeWidth="0.8" strokeDasharray="1 1" />
          </svg>

          {/* Absolute labels on top of SVG */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Tribune</span>
            <span className="text-xs font-extrabold text-white">OFFICIELLE</span>
          </div>

          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 bg-emerald-500/10 border border-emerald-500/40 px-2 py-0.5 rounded-full flex items-center space-x-1">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse-fast"></span>
            <span className="text-[8px] font-bold text-emerald-400 tracking-wider">ACCÈS OPTIMAL PORTE C</span>
          </div>
        </div>
      </div>

      {/* Gates Info Table / list */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Temps d'attente par porte</h4>
        {gates.map((g) => (
          <div 
            key={g.name} 
            className={`p-3 rounded-xl border flex items-center justify-between transition-all duration-200 ${
              g.recommended 
                ? 'bg-emerald-500/5 border-emerald-500/40 shadow-sm shadow-emerald-500/5' 
                : 'bg-brand-card border-brand-border'
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <span 
                className="w-2.5 h-2.5 rounded-full inline-block"
                style={{ backgroundColor: g.color }}
              ></span>
              <span className={`text-xs font-bold ${g.recommended ? 'text-emerald-400' : 'text-white'}`}>
                {g.name === 'Gate A' ? 'Porte A' : g.name === 'Gate B' ? 'Porte B' : g.name === 'Gate C' ? 'Porte C' : g.name === 'Gate D' ? 'Porte D' : 'Porte E'}
              </span>
              {g.recommended && (
                <span className="text-[8px] font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/25 px-1.5 py-0.2 rounded uppercase">
                  Recommandée
                </span>
              )}
            </div>
            <div className="flex items-center space-x-3 text-xs">
              <span className="text-slate-400 flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>{g.time}</span>
              </span>
              <span 
                className="text-[9px] font-bold px-2 py-0.5 rounded-md uppercase"
                style={{ 
                  color: g.color, 
                  backgroundColor: `${g.color}15`,
                  border: `1px solid ${g.color}30`
                }}
              >
                {g.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
