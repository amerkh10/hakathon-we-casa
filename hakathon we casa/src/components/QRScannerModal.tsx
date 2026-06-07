import React, { useState, useEffect } from 'react';
import { QrCode, X, Camera, RefreshCw } from 'lucide-react';

interface QRScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanSuccess: () => void;
}

export const QRScannerModal: React.FC<QRScannerModalProps> = ({ isOpen, onClose, onScanSuccess }) => {
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'analyzing' | 'success'>('idle');

  useEffect(() => {
    if (!isOpen) {
      setScanState('idle');
      return;
    }

    setScanState('scanning');

    // Simulate scanning pipeline
    const analyzeTimer = setTimeout(() => {
      setScanState('analyzing');
    }, 1800);

    const successTimer = setTimeout(() => {
      setScanState('success');
    }, 3200);

    const finishTimer = setTimeout(() => {
      onScanSuccess();
      onClose();
    }, 4200);

    return () => {
      clearTimeout(analyzeTimer);
      clearTimeout(successTimer);
      clearTimeout(finishTimer);
    };
  }, [isOpen, onScanSuccess, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-brand-dark/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-brand-card border border-brand-border w-full max-w-[340px] rounded-3xl p-5 relative overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2 text-brand-orange font-bold text-xs">
            <Camera className="w-4 h-4" />
            <span>Simulateur Scanner QR</span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 bg-brand-navy border border-brand-border rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scanner Body */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-[#030712] rounded-2xl border border-brand-border/60 overflow-hidden flex items-center justify-center">
            
            {/* Camera mock background representation */}
            <div className="absolute inset-0 opacity-40 flex flex-wrap gap-1 p-1">
              {Array.from({ length: 144 }).map((_, i) => (
                <div key={i} className="w-[6%] aspect-square border-[0.5px] border-slate-900 rounded-[1px]"></div>
              ))}
            </div>

            {/* Target Scanner Square Frame */}
            <div className="relative w-48 h-48 border-2 border-slate-700/60 rounded-2xl flex items-center justify-center">
              
              {/* Glowing green corners */}
              <div className="absolute -top-1.5 -left-1.5 w-6 h-6 border-t-4 border-l-4 border-brand-orange rounded-tl-md"></div>
              <div className="absolute -top-1.5 -right-1.5 w-6 h-6 border-t-4 border-r-4 border-brand-orange rounded-tr-md"></div>
              <div className="absolute -bottom-1.5 -left-1.5 w-6 h-6 border-b-4 border-l-4 border-brand-orange rounded-bl-md"></div>
              <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 border-b-4 border-r-4 border-brand-orange rounded-br-md"></div>

              {/* QR Code representation inside target */}
              <div className="w-24 h-24 text-slate-600/40 opacity-70 flex items-center justify-center">
                <QrCode className="w-full h-full stroke-[1]" />
              </div>

              {/* Laser Line Overlay (Only shows when scanning) */}
              {(scanState === 'scanning' || scanState === 'analyzing') && (
                <div className="absolute left-0 w-full h-0.5 bg-brand-orange/80 shadow-md shadow-brand-orange/60 animate-scan"></div>
              )}
            </div>

            {/* Scan State UI details */}
            {scanState === 'analyzing' && (
              <div className="absolute inset-0 bg-brand-navy/60 backdrop-blur-xs flex flex-col items-center justify-center space-y-2">
                <RefreshCw className="w-8 h-8 text-brand-orange animate-spin" />
                <span className="text-[10px] font-bold text-brand-orange tracking-widest uppercase">Analyse du billet...</span>
              </div>
            )}

            {scanState === 'success' && (
              <div className="absolute inset-0 bg-brand-navy/70 backdrop-blur-xs flex flex-col items-center justify-center space-y-2 animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white text-lg font-bold animate-bounce shadow shadow-emerald-500/20">
                  ✓
                </div>
                <span className="text-[10px] font-bold text-emerald-400 tracking-widest uppercase">Accès Autorisé !</span>
              </div>
            )}
          </div>

          {/* Prompt Messages */}
          <div className="text-center">
            {scanState === 'scanning' && (
              <p className="text-[11px] text-slate-300 font-semibold animate-pulse">Alignez le code QR dans le cadre</p>
            )}
            {scanState === 'analyzing' && (
              <p className="text-[11px] text-brand-orange font-semibold">Lecture des données de sécurité...</p>
            )}
            {scanState === 'success' && (
              <p className="text-[11px] text-emerald-400 font-bold">Billet validé : Tribune B3 • Porte C</p>
            )}
          </div>
        </div>

        {/* Decorative Grid footer */}
        <div className="mt-4 pt-3 border-t border-brand-border/60 flex justify-between items-center text-[8.5px] text-slate-500 uppercase tracking-widest">
          <span>Match: MAR v ESP</span>
          <span>FIFA WC 2030</span>
        </div>
      </div>
    </div>
  );
};
