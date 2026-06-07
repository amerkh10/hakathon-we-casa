import React from 'react';
import { MapPin, ArrowRight, Eye, Coffee, Map } from 'lucide-react';
import { LockedTabState } from '../components/LockedTabState';

interface SeatTabProps {
  unlocked: boolean;
  onOpenScanner: () => void;
}

export const SeatTab: React.FC<SeatTabProps> = ({ unlocked, onOpenScanner }) => {
  if (!unlocked) {
    return (
      <LockedTabState
        title="Localisation du Siège"
        subtitle="Scannez le code QR de votre billet pour afficher le plan en 3D de votre tribune et recevoir l'itinéraire précis vers votre siège."
        onOpenScanner={onOpenScanner}
      />
    );
  }

  return (
    <div className="space-y-4 pb-20">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white mb-1">Rejoindre mon Siège</h1>
        <p className="text-xs text-slate-400">Itinéraire personnalisé à l'intérieur du stade</p>
      </div>

      {/* Seat Detail Card */}
      <div className="bg-gradient-to-r from-brand-orange to-[#d35400] rounded-2xl p-4 text-white shadow-lg shadow-brand-orange/20 relative overflow-hidden">
        {/* Decorative SVG ball in background */}
        <div className="absolute right-0 bottom-0 translate-y-4 translate-x-4 opacity-15">
          <svg width="120" height="120" viewBox="0 0 100 100" fill="currentColor">
            <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="2" fill="none" />
            <path d="M 15 50 Q 50 15 85 50" stroke="white" strokeWidth="2" fill="none" />
            <path d="M 15 50 Q 50 85 85 50" stroke="white" strokeWidth="2" fill="none" />
            <line x1="50" y1="10" x2="50" y2="90" stroke="white" strokeWidth="2" />
          </svg>
        </div>

        <div className="flex justify-between items-start">
          <div>
            <span className="text-[9px] uppercase font-extrabold tracking-widest bg-white/20 px-2 py-0.5 rounded-full text-white">
              Votre Billet Activé
            </span>
            <h2 className="text-3xl font-black mt-2 tracking-tight">Tribune B3</h2>
            <p className="text-sm font-medium opacity-90 mt-1">Rangée 12 · Siège 7</p>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold block opacity-75">Niveau</span>
            <span className="text-3xl font-black">2</span>
          </div>
        </div>

        <hr className="border-white/20 my-3" />

        <div className="flex justify-between items-center text-xs opacity-90">
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-green-400 inline-block animate-pulse"></span>
            <span>Entrée recommandée : <strong>Porte C</strong></span>
          </div>
          <span className="font-semibold underline cursor-pointer text-[11px] flex items-center space-x-1">
            <Eye className="w-3.5 h-3.5" />
            <span>Voir E-Billet</span>
          </span>
        </div>
      </div>

      {/* SVG Stadium Map representation */}
      <div className="bg-brand-card border border-brand-border rounded-2xl p-4 flex flex-col items-center">
        <h3 className="text-xs font-bold text-slate-300 self-start mb-3 uppercase tracking-wider">Vue 3D de votre Section</h3>

        <div className="relative w-full max-w-[280px] h-[200px]">
          <svg className="w-full h-full" viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg">
            {/* Dark green pitch representing stadium center */}
            <ellipse cx="50" cy="40" rx="35" ry="25" fill="#0d1b2a" stroke="#1E314A" strokeWidth="2" />
            <ellipse cx="50" cy="40" rx="20" ry="12" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="1" strokeDasharray="2 2" opacity="0.7" />

            {/* Stadium Sectors */}
            {/* Tribune A (Top) */}
            <path d="M 22 23 C 35 12, 65 12, 78 23 L 83 18 C 68 5, 32 5, 17 18 Z" fill="#1b2e46" stroke="#0d1b2a" strokeWidth="0.8" opacity="0.6" />
            <text x="50" y="14" fill="#94a3b8" fontSize="4.5" textAnchor="middle" fontWeight="bold">Tribune A</text>

            {/* Tribune C (Right) */}
            <path d="M 78 23 C 88 32, 88 48, 78 57 L 83 62 C 95 50, 95 30, 83 18 Z" fill="#1b2e46" stroke="#0d1b2a" strokeWidth="0.8" opacity="0.6" />
            <text x="89" y="42" fill="#94a3b8" fontSize="4.5" textAnchor="middle" fontWeight="bold" transform="rotate(90 89 42)">Tribune C</text>

            {/* Tribune D (Bottom) */}
            <path d="M 78 57 C 65 68, 35 68, 22 57 L 17 62 C 32 75, 68 75, 83 62 Z" fill="#1b2e46" stroke="#0d1b2a" strokeWidth="0.8" opacity="0.6" />
            <text x="50" y="70" fill="#94a3b8" fontSize="4.5" textAnchor="middle" fontWeight="bold">Tribune D</text>

            {/* Tribune B (Left - User's section!) */}
            {/* Splitting Tribune B into B1, B2, B3 */}
            {/* B1 (Top portion) */}
            <path d="M 22 23 C 14 30, 14 37, 18 42 L 13 45 C 8 38, 8 28, 17 18 Z" fill="#1b2e46" stroke="#0d1b2a" strokeWidth="0.8" opacity="0.6" />
            <text x="13" y="32" fill="#475569" fontSize="3" fontWeight="bold">B1</text>
            
            {/* B2 (Middle portion) */}
            <path d="M 18 42 C 18 45, 18 48, 22 57 L 17 62 C 13 52, 13 47, 13 45 Z" fill="#1b2e46" stroke="#0d1b2a" strokeWidth="0.8" opacity="0.6" />
            <text x="14" y="52" fill="#475569" fontSize="3" fontWeight="bold">B2</text>
            
            {/* B3 (Fan's section - Orange and glowing!) */}
            <g>
              <path 
                d="M 22 23 C 17 28, 15 35, 18 42 L 13 45 C 9 37, 11 28, 17 18 Z" 
                fill="#E67E22" 
                stroke="#0d1b2a" 
                strokeWidth="1" 
                className="animate-pulse-fast" 
              />
              <path 
                d="M 22 23 C 17 28, 15 35, 18 42 L 13 45 C 9 37, 11 28, 17 18 Z" 
                fill="#E67E22" 
                stroke="#ffffff" 
                strokeWidth="0.8" 
              />
              {/* Star seat marker */}
              <circle cx="17.5" cy="31.5" r="2" fill="#ffffff" className="animate-ping" />
              <circle cx="17.5" cy="31.5" r="1.2" fill="#ffffff" />
            </g>
            <text x="17" y="32" fill="#ffffff" fontSize="4.5" fontWeight="black" textAnchor="middle">B3</text>

            {/* Path from Gate C (Gate C is near bottom middle) to Section B3 */}
            <path 
              d="M 50 67 C 32 67, 26 55, 19 44" 
              stroke="#E67E22" 
              strokeWidth="1.2" 
              strokeDasharray="2 1.5" 
              fill="none" 
              opacity="0.8" 
            />
            {/* Arrowhead */}
            <polygon points="18.5,46 19,41 21,43.5" fill="#E67E22" />
          </svg>

          {/* Map floating labels */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-brand-navy border border-brand-border/60 py-1 px-2.5 rounded-lg text-center shadow-md">
            <span className="text-[10px] font-bold text-white tracking-wide">PELOUSE</span>
          </div>

          <div className="absolute top-2 right-2 bg-brand-navy/80 border border-brand-border rounded-lg py-0.5 px-2 flex items-center space-x-1">
            <Map className="w-3.5 h-3.5 text-brand-orange" />
            <span className="text-[8px] font-bold text-slate-300">PLAN TRIBUNE</span>
          </div>
        </div>
      </div>

      {/* Step-by-Step Directions Card */}
      <div className="bg-brand-card border border-brand-border rounded-2xl p-4">
        <h3 className="text-xs font-bold text-slate-300 mb-3.5 uppercase tracking-wider flex items-center space-x-1.5">
          <MapPin className="w-4 h-4 text-brand-orange" />
          <span>Itinéraire pas-à-pas</span>
        </h3>

        <div className="space-y-3 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-brand-border/80">
          {/* Step 1 */}
          <div className="flex items-start space-x-3.5 relative">
            <div className="w-7.5 h-7.5 rounded-full bg-brand-navy border border-brand-border flex items-center justify-center text-xs font-bold text-slate-300 z-10">
              1
            </div>
            <div className="pt-0.5 flex-1">
              <h4 className="text-xs font-bold text-white flex items-center space-x-1">
                <span>Entrez par la Porte C</span>
              </h4>
              <p className="text-[10px] text-slate-400 mt-0.5">Scannez votre billet et accédez au hall intérieur.</p>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 mt-2" />
          </div>

          {/* Step 2 */}
          <div className="flex items-start space-x-3.5 relative">
            <div className="w-7.5 h-7.5 rounded-full bg-brand-navy border border-brand-border flex items-center justify-center text-xs font-bold text-slate-300 z-10">
              2
            </div>
            <div className="pt-0.5 flex-1">
              <h4 className="text-xs font-bold text-white">Tournez à droite</h4>
              <p className="text-[10px] text-slate-400 mt-0.5">Suivez la signalétique verte vers la zone Ouest.</p>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 mt-2" />
          </div>

          {/* Step 3 */}
          <div className="flex items-start space-x-3.5 relative">
            <div className="w-7.5 h-7.5 rounded-full bg-brand-navy border border-brand-border flex items-center justify-center text-xs font-bold text-slate-300 z-10">
              3
            </div>
            <div className="pt-0.5 flex-1">
              <h4 className="text-xs font-bold text-white">Prenez l'escalier vers le Niveau 2</h4>
              <p className="text-[10px] text-slate-400 mt-0.5">Montezen haut des marches de la zone B.</p>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 mt-2" />
          </div>

          {/* Step 4 */}
          <div className="flex items-start space-x-3.5 relative">
            <div className="w-7.5 h-7.5 rounded-full bg-brand-orange text-white flex items-center justify-center text-xs font-extrabold z-10 shadow-sm shadow-brand-orange/30">
              4
            </div>
            <div className="pt-0.5 flex-1">
              <h4 className="text-xs font-bold text-brand-orange">Section B3 est sur votre gauche</h4>
              <p className="text-[10px] text-slate-400 mt-0.5">Votre siège 7 est au rang 12 (milieu de section).</p>
            </div>
          </div>
        </div>
      </div>

      {/* Points of Interest Nearby */}
      <div className="bg-brand-card/60 border border-brand-border/60 rounded-2xl p-4">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Services à proximité (Tribune B3)</h4>
        
        <div className="grid grid-cols-2 gap-3">
          {/* Toilet POI */}
          <div className="bg-brand-navy/40 border border-brand-border/60 rounded-xl p-3 flex items-center space-x-3 transition-all hover:bg-brand-navy/60">
            <div className="w-8.5 h-8.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 text-base">
              🚻
            </div>
            <div>
              <h5 className="text-xs font-semibold text-white">Toilettes</h5>
              <p className="text-[9px] text-slate-400">À 50 mètres · Zone B3</p>
            </div>
          </div>

          {/* Kiosk POI */}
          <div className="bg-brand-navy/40 border border-brand-border/60 rounded-xl p-3 flex items-center space-x-3 transition-all hover:bg-brand-navy/60">
            <div className="w-8.5 h-8.5 rounded-lg bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center text-brand-orange text-base">
              <Coffee className="w-4.5 h-4.5" />
            </div>
            <div>
              <h5 className="text-xs font-semibold text-white">Kiosque B2</h5>
              <p className="text-[9px] text-slate-400">À 30 mètres · Zone B2</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
