import React, { useState } from 'react';
import { Bus, Car, Navigation, Bell, AlertTriangle } from 'lucide-react';
import type { Match } from './MatchesTab';

interface TransportTabProps {
  selectedMatch: Match;
  showToast: (message: string, type: 'info' | 'success' | 'warning') => void;
}

export const TransportTab: React.FC<TransportTabProps> = ({ selectedMatch, showToast }) => {
  const [notify, setNotify] = useState(false);

  const handleToggleNotify = () => {
    const nextState = !notify;
    setNotify(nextState);
    if (nextState) {
      showToast("Rappel activé : Vous serez notifié 1h30 avant le match.", "success");
    } else {
      showToast("Rappel désactivé.", "info");
    }
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white mb-1">Rejoindre le Stade</h1>
        <p className="text-xs text-slate-400">Itinéraires en temps réel vers votre événement</p>
      </div>

      {/* Selected Match Card Context */}
      <div className="bg-brand-card/50 border border-brand-border/60 rounded-2xl p-3 flex.items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">{selectedMatch.homeFlag} {selectedMatch.awayFlag}</div>
          <div>
            <h3 className="text-xs font-semibold text-white truncate max-w-[200px]">
              {selectedMatch.homeTeam} vs {selectedMatch.awayTeam}
            </h3>
            <p className="text-[10px] text-slate-400 flex items-center">
              <span>{selectedMatch.stadium}</span>
            </p>
          </div>
        </div>
        <div className="bg-brand-orange/10 border border-brand-orange/30 px-2 py-0.5 rounded text-[9px] font-bold text-brand-orange">
          {selectedMatch.city}
        </div>
      </div>

      {/* Mock Map Container */}
      <div className="relative bg-brand-navy rounded-2xl border border-brand-border overflow-hidden h-48 shadow-inner">
        {/* SVG Route Map */}
        <svg className="w-full h-full bg-[#08121e]" viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg">
          {/* Grids / Roads */}
          <path d="M 0 50 L 300 70" stroke="#1b2e46" strokeWidth="6" fill="none" opacity="0.6" />
          <path d="M 50 0 L 80 180" stroke="#1b2e46" strokeWidth="4" fill="none" opacity="0.6" />
          <path d="M 120 0 C 120 80, 220 80, 220 180" stroke="#1b2e46" strokeWidth="8" fill="none" opacity="0.5" />
          <path d="M 0 140 Q 150 120 300 130" stroke="#1b2e46" strokeWidth="5" fill="none" opacity="0.6" />
          
          {/* Labels */}
          <text x="15" y="40" fill="#4a6572" fontSize="6" fontFamily="sans-serif" letterSpacing="0.5">Bd de la Corniche</text>
          <text x="190" y="160" fill="#4a6572" fontSize="6" fontFamily="sans-serif" letterSpacing="0.5">Autoroute A3</text>
          <text x="210" y="115" fill="#4a6572" fontSize="5" fontFamily="sans-serif">Stade Station</text>
          
          {/* Route Line (Orange dashed) */}
          <path 
            d="M 60 150 Q 120 130 150 90 T 235 65" 
            stroke="#E67E22" 
            strokeWidth="3.5" 
            strokeLinecap="round" 
            strokeDasharray="6 4" 
            fill="none" 
          />
          <path 
            d="M 60 150 Q 120 130 150 90 T 235 65" 
            stroke="#E67E22" 
            strokeWidth="3.5" 
            strokeLinecap="round" 
            strokeDasharray="6 4" 
            fill="none" 
            opacity="0.6"
            className="animate-pulse"
          />

          {/* User Location Marker */}
          <circle cx="60" cy="150" r="6" fill="#3b82f6" opacity="0.3" className="animate-ping" />
          <circle cx="60" cy="150" r="4.5" fill="#2563eb" stroke="#ffffff" strokeWidth="1" />
          <text x="70" y="153" fill="#94a3b8" fontSize="6" fontWeight="bold">Ma Position</text>

          {/* Stadium Marker */}
          <g transform="translate(235, 65)">
            {/* Glow */}
            <circle cx="0" cy="0" r="8" fill="#E67E22" opacity="0.2" className="animate-pulse-fast" />
            <circle cx="0" cy="0" r="4" fill="#E67E22" />
            {/* Stadium Pin Emoji (or representation) */}
            <text x="-5" y="-7" fill="#ffffff" fontSize="10">🏟️</text>
          </g>
          <text x="220" y="50" fill="#E67E22" fontSize="7" fontWeight="bold">Grand Stade</text>
        </svg>

        {/* Map Overlay Badge */}
        <div className="absolute top-2.5 left-2.5 bg-brand-dark/80 backdrop-blur-md border border-brand-border px-2.5 py-1 rounded-lg flex items-center space-x-1.5">
          <Navigation className="w-3.5 h-3.5 text-brand-orange animate-pulse" />
          <span className="text-[10px] font-semibold text-white">Itinéraire optimisé</span>
        </div>

        {/* Zoom & Controls Mock */}
        <div className="absolute bottom-2.5 right-2.5 flex flex-col space-y-1">
          <button className="w-6 h-6 bg-brand-card border border-brand-border rounded flex items-center justify-center text-xs font-bold hover:bg-brand-highlight text-white">+</button>
          <button className="w-6 h-6 bg-brand-card border border-brand-border rounded flex items-center justify-center text-xs font-bold hover:bg-brand-highlight text-white">-</button>
        </div>
      </div>

      {/* Transit Options List */}
      <div className="space-y-2.5">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Options de transport disponibles</h2>

        {/* Option 1: Tram */}
        <div className="bg-brand-card border border-brand-border rounded-xl p-3 flex items-center justify-between transition-all duration-200 hover:border-brand-border/80">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <span className="text-lg">🚋</span>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-white">Tramway Ligne 1</h4>
              <p className="text-[10px] text-slate-400">Départ toutes les 5 min · Station à 100m</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs font-bold text-white">35 min</div>
            <span className="inline-block text-[8px] font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/25 px-1.5 py-0.5 rounded-full uppercase tracking-wider">Fluide</span>
          </div>
        </div>

        {/* Option 2: Voiture */}
        <div className="bg-brand-card border border-brand-border rounded-xl p-3 flex items-center justify-between transition-all duration-200 hover:border-brand-border/80">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-white">Voiture / Parking P4</h4>
              <p className="text-[10px] text-slate-400">Accès direct par N1 · Trafic modéré</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs font-bold text-white">30 min</div>
            <span className="inline-block text-[8px] font-bold text-amber-400 bg-amber-500/15 border border-amber-500/25 px-1.5 py-0.5 rounded-full uppercase tracking-wider">Modéré</span>
          </div>
        </div>

        {/* Option 3: Taxi */}
        <div className="bg-brand-card border border-brand-border rounded-xl p-3 flex items-center justify-between transition-all duration-200 hover:border-brand-border/80">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <span className="text-lg">🚖</span>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-white">Petit Taxi</h4>
              <p className="text-[10px] text-slate-400">Haute demande · Tarif estimé : 40 MAD</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs font-bold text-white">25 min</div>
            <span className="inline-block text-[8px] font-bold text-rose-400 bg-rose-500/15 border border-rose-500/25 px-1.5 py-0.5 rounded-full uppercase tracking-wider">Saturé</span>
          </div>
        </div>

        {/* Option 4: Bus */}
        <div className="bg-brand-card border border-brand-border rounded-xl p-3 flex items-center justify-between transition-all duration-200 hover:border-brand-border/80">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Bus className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-white">Bus Ligne 36</h4>
              <p className="text-[10px] text-slate-400">Départ toutes les 20 min · Station Sud</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs font-bold text-white">45 min</div>
            <span className="inline-block text-[8px] font-bold text-amber-400 bg-amber-500/15 border border-amber-500/25 px-1.5 py-0.5 rounded-full uppercase tracking-wider">Modéré</span>
          </div>
        </div>
      </div>

      {/* Reminder Toggle Card */}
      <div className="bg-gradient-to-r from-brand-card to-brand-navy border border-brand-border rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-start space-x-3 max-w-[70%]">
          <div className="p-2 bg-brand-orange/15 rounded-xl text-brand-orange mt-0.5">
            <Bell className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">Rappel de départ intelligent</h4>
            <p className="text-[10px] text-slate-400 leading-normal mt-0.5">
              Recevez une alerte quand le trafic commence à se densifier sur votre itinéraire.
            </p>
          </div>
        </div>

        <button
          onClick={handleToggleNotify}
          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
            notify ? 'bg-brand-orange' : 'bg-slate-700'
          }`}
          role="switch"
          aria-checked={notify}
        >
          <span
            aria-hidden="true"
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
              notify ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {/* Security note */}
      <div className="flex items-center space-x-2 bg-brand-orange/5 border border-brand-orange/10 p-3 rounded-xl">
        <AlertTriangle className="w-4 h-4 text-brand-orange flex-shrink-0" />
        <p className="text-[9px] text-slate-300 leading-snug">
          <strong>Attention supporters :</strong> Les routes autour du <strong>{selectedMatch.stadium}</strong> fermeront aux véhicules privés 2h avant le coup d'envoi. Privilégiez les transports publics.
        </p>
      </div>
    </div>
  );
};
