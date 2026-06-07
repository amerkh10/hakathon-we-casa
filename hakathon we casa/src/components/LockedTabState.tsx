import React from 'react';
import { Lock, QrCode } from 'lucide-react';

interface LockedTabStateProps {
  title: string;
  subtitle: string;
  onOpenScanner: () => void;
}

export const LockedTabState: React.FC<LockedTabStateProps> = ({ title, subtitle, onOpenScanner }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6 pb-20">
      {/* Visual locked icon representation */}
      <div className="relative mb-6">
        {/* Outer pulsing ring */}
        <div className="absolute inset-0 bg-brand-orange/10 rounded-full blur-xl animate-pulse-fast"></div>
        
        {/* Styled Circle with lock */}
        <div className="relative w-24 h-24 rounded-full bg-brand-navy border-2 border-brand-border flex items-center justify-center shadow-lg shadow-brand-navy/50">
          <div className="absolute inset-2 rounded-full border border-dashed border-brand-orange/30 animate-spin" style={{ animationDuration: '15s' }}></div>
          <Lock className="w-10 h-10 text-brand-orange" />
        </div>

        {/* Mini QR badge */}
        <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-lg bg-brand-orange text-white flex items-center justify-center shadow-md shadow-brand-orange/30 border border-brand-navy">
          <QrCode className="w-4 h-4" />
        </div>
      </div>

      {/* Text Info */}
      <h1 className="text-xl font-extrabold text-white mb-2">{title}</h1>
      <p className="text-xs text-slate-400 max-w-[280px] leading-relaxed mb-6">
        {subtitle}
      </p>

      {/* Button to scan */}
      <button
        onClick={onOpenScanner}
        className="w-full max-w-[240px] bg-brand-orange text-white hover:bg-brand-orange/90 font-bold py-3.5 px-6 rounded-2xl transition-all duration-200 flex items-center justify-center space-x-2.5 shadow-lg shadow-brand-orange/25 cursor-pointer text-sm"
      >
        <QrCode className="w-4.5 h-4.5" />
        <span>Scanner mon Billet</span>
      </button>

      {/* Quick helpful note */}
      <p className="text-[10px] text-slate-500 mt-6 max-w-[220px]">
        Vous trouverez votre code QR sur votre billet physique ou sur votre application d'achat (Guichet.ma).
      </p>
    </div>
  );
};
