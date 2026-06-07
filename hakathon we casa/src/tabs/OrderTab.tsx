import React, { useState, useEffect } from 'react';
import { ShoppingBag, Plus, Minus, CreditCard, Check, RefreshCw, X } from 'lucide-react';
import { LockedTabState } from '../components/LockedTabState';

interface OrderTabProps {
  unlocked: boolean;
  onOpenScanner: () => void;
  showToast: (message: string, type: 'info' | 'success' | 'warning') => void;
  cart: { [key: string]: number };
  setCart: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>;
  orderStatus: 'none' | 'received' | 'preparing' | 'ready' | 'collected';
  setOrderStatus: React.Dispatch<React.SetStateAction<'none' | 'received' | 'preparing' | 'ready' | 'collected'>>;
}

interface Product {
  id: string;
  name: string;
  price: number;
  emoji: string;
  bgColor: string;
}

const PRODUCTS: Product[] = [
  { id: 'cafe', name: 'Café Espresso', price: 25, emoji: '☕', bgColor: 'bg-amber-950/40 border-amber-800/20 text-amber-300' },
  { id: 'sandwich', name: 'Sandwich Poulet', price: 45, emoji: '🥪', bgColor: 'bg-emerald-950/40 border-emerald-800/20 text-emerald-300' },
  { id: 'eau', name: 'Eau Minérale', price: 10, emoji: '💧', bgColor: 'bg-blue-950/40 border-blue-800/20 text-blue-300' },
  { id: 'jus', name: 'Jus d\'Orange', price: 20, emoji: '🧃', bgColor: 'bg-orange-950/40 border-orange-800/20 text-orange-300' },
  { id: 'hotdog', name: 'Hot Dog Stadium', price: 35, emoji: '🌭', bgColor: 'bg-rose-950/40 border-rose-800/20 text-rose-300' },
  { id: 'chips', name: 'Chips Artisanales', price: 15, emoji: '🥔', bgColor: 'bg-yellow-950/40 border-yellow-800/20 text-yellow-300' },
];

export const OrderTab: React.FC<OrderTabProps> = ({
  unlocked,
  onOpenScanner,
  showToast,
  cart,
  setCart,
  orderStatus,
  setOrderStatus
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [trackingStep, setTrackingStep] = useState(0); // 0: received, 1: preparing, 2: ready, 3: collected

  // Locked check
  if (!unlocked) {
    return (
      <LockedTabState
        title="Click & Collect"
        subtitle="Scannez le code QR de votre billet pour commander des boissons et de la nourriture directement depuis votre siège et éviter les files d'attente."
        onOpenScanner={onOpenScanner}
      />
    );
  }

  // Calculate cart quantities and totals
  const cartItemCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  const cartTotal = Object.entries(cart).reduce((total, [id, qty]) => {
    const p = PRODUCTS.find((prod) => prod.id === id);
    return total + (p ? p.price * qty : 0);
  }, 0);

  const updateQty = (id: string, delta: number) => {
    setCart((prev) => {
      const current = prev[id] || 0;
      const next = current + delta;
      if (next <= 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: next };
    });
  };

  const handlePay = () => {
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      setDrawerOpen(false);
      setCart({}); // Empty cart
      setOrderStatus('received');
      setTrackingStep(0);
      showToast("Paiement réussi ! Commande envoyée au Kiosque B2.", "success");
    }, 1500);
  };

  // Auto-advance order simulation
  useEffect(() => {
    if (orderStatus === 'none' || orderStatus === 'collected') return;

    const interval = setInterval(() => {
      setTrackingStep((prev) => {
        const next = prev + 1;
        if (next === 1) {
          setOrderStatus('preparing');
          showToast("Votre commande est en cours de préparation 🍳", "info");
        } else if (next === 2) {
          setOrderStatus('ready');
          showToast("Commande prête ! Récupérez-la au Kiosque B2 🛍️", "success");
        } else if (next === 3) {
          setOrderStatus('collected');
          showToast("Commande récupérée. Bon appétit ! 😋", "success");
          clearInterval(interval);
        }
        return next;
      });
    }, 7000);

    return () => clearInterval(interval);
  }, [orderStatus]);

  const resetOrder = () => {
    setOrderStatus('none');
    setTrackingStep(0);
  };

  const trackingSteps = [
    { label: 'Reçue', desc: 'Commande validée', icon: '✓', status: 'received' },
    { label: 'Préparation', desc: 'En cuisine', icon: '🍳', status: 'preparing' },
    { label: 'Prête', desc: 'Prête au Kiosque B2', icon: '🛍️', status: 'ready' },
    { label: 'Récupérée', desc: 'Merci de votre visite', icon: '😋', status: 'collected' },
  ];

  return (
    <div className="space-y-4 pb-20 relative min-h-[70vh]">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white mb-1">Click & Collect</h1>
        <p className="text-xs text-slate-400">Commandez depuis votre siège et évitez la file</p>
      </div>

      {orderStatus === 'none' ? (
        <>
          {/* Service Banner */}
          <div className="bg-brand-orange/10 border border-brand-orange/30 rounded-2xl p-3 flex items-center space-x-3">
            <span className="text-xl">⚡</span>
            <div>
              <h3 className="text-xs font-bold text-white">Retrait Express : Kiosque B2 (30m)</h3>
              <p className="text-[9.5px] text-brand-orange mt-0.5">Temps d'attente estimé : &lt; 5 min</p>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 gap-3 pb-8">
            {PRODUCTS.map((product) => {
              const qty = cart[product.id] || 0;
              return (
                <div 
                  key={product.id} 
                  className="bg-brand-card border border-brand-border rounded-2xl p-3 flex flex-col justify-between transition-all duration-200 hover:border-brand-orange/40"
                >
                  {/* Emoji Background image placeholder */}
                  <div className={`w-full h-24 rounded-xl flex items-center justify-center text-4xl border ${product.bgColor} select-none`}>
                    {product.emoji}
                  </div>

                  {/* Info */}
                  <div className="mt-3">
                    <h3 className="text-xs font-bold text-white truncate">{product.name}</h3>
                    <p className="text-xs font-extrabold text-brand-orange mt-0.5">{product.price} MAD</p>
                  </div>

                  {/* Actions */}
                  <div className="mt-3 flex items-center justify-between">
                    {qty > 0 ? (
                      <div className="flex items-center space-x-2 bg-brand-navy border border-brand-border rounded-xl w-full justify-between p-1">
                        <button 
                          onClick={() => updateQty(product.id, -1)}
                          className="w-6 h-6 rounded-lg bg-brand-highlight flex items-center justify-center text-white text-xs hover:bg-brand-border"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold text-white text-center w-6">{qty}</span>
                        <button 
                          onClick={() => updateQty(product.id, 1)}
                          className="w-6 h-6 rounded-lg bg-brand-highlight flex items-center justify-center text-white text-xs hover:bg-brand-border"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => updateQty(product.id, 1)}
                        className="w-full bg-brand-orange text-white hover:bg-brand-orange/95 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Ajouter</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Floating Cart Button */}
          {cartItemCount > 0 && (
            <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 w-full max-w-[390px] px-4 z-40 animate-bounce">
              <button
                onClick={() => setDrawerOpen(true)}
                className="w-full bg-brand-orange text-white font-bold py-3.5 px-5 rounded-2xl transition-all duration-300 flex items-center justify-between shadow-lg shadow-brand-orange/30 cursor-pointer text-xs"
              >
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="w-4.5 h-4.5" />
                  <span className="bg-white/20 px-2 py-0.5 rounded-lg text-[10px]">{cartItemCount} Articles</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>Voir le Panier</span>
                  <span className="font-extrabold bg-brand-dark/30 px-2.5 py-0.5 rounded-lg ml-2">{cartTotal} MAD</span>
                </div>
              </button>
            </div>
          )}
        </>
      ) : (
        /* Order Tracking Screen */
        <div className="bg-brand-card border border-brand-border rounded-2xl p-5 space-y-6">
          {/* Tracking Header */}
          <div className="text-center pb-3 border-b border-brand-border/60">
            <span className="text-[10px] uppercase font-bold tracking-widest text-brand-orange bg-brand-orange/10 px-3 py-1 rounded-full">
              Kiosque B2 (Niveau 2)
            </span>
            <h2 className="text-base font-extrabold text-white mt-3.5">Suivi de votre commande</h2>
            <p className="text-[11px] text-slate-400 mt-1">Numéro de commande : <strong className="text-white">#SC-2030</strong></p>
          </div>

          {/* Stepper Graphic */}
          <div className="space-y-5 relative pl-7 before:absolute before:left-3 before:top-2.5 before:bottom-2.5 before:w-0.5 before:bg-brand-border">
            {trackingSteps.map((step, idx) => {
              const isDone = trackingStep >= idx;
              const isCurrent = trackingStep === idx;
              return (
                <div key={idx} className="flex items-start space-x-4 relative transition-opacity duration-300">
                  {/* Step Dot */}
                  <div 
                    className={`absolute -left-[23px] w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border-2 transition-all duration-300 ${
                      isDone 
                        ? 'bg-brand-orange border-brand-orange text-white' 
                        : 'bg-brand-dark border-brand-border text-slate-500'
                    } ${isCurrent ? 'ring-4 ring-brand-orange/20 animate-pulse' : ''}`}
                  >
                    {isDone && idx < trackingStep ? '✓' : step.icon}
                  </div>

                  <div>
                    <h3 className={`text-xs font-bold transition-colors duration-300 ${isDone ? 'text-white font-extrabold' : 'text-slate-500'}`}>
                      {step.label}
                    </h3>
                    <p className={`text-[10px] mt-0.5 transition-colors duration-300 ${isDone ? 'text-slate-300' : 'text-slate-600'}`}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Progress Bar */}
          <div className="space-y-1.5 pt-3">
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>Progression globale</span>
              <span className="font-semibold text-brand-orange">
                {Math.round((trackingStep / 3) * 100)}%
              </span>
            </div>
            <div className="w-full bg-brand-navy border border-brand-border h-2 rounded-full overflow-hidden">
              <div 
                className="bg-brand-orange h-full rounded-full transition-all duration-700 ease-out"
                style={{ width: `${(trackingStep / 3) * 100}%` }}
              />
            </div>
          </div>

          {/* Quick simulation advance for convenience */}
          <div className="pt-2 flex space-x-2">
            {trackingStep < 3 ? (
              <button 
                onClick={() => {
                  const nextStep = trackingStep + 1;
                  setTrackingStep(nextStep);
                  if (nextStep === 1) {
                    setOrderStatus('preparing');
                    showToast("Votre commande est en cours de préparation 🍳", "info");
                  } else if (nextStep === 2) {
                    setOrderStatus('ready');
                    showToast("Commande prête ! Récupérez-la au Kiosque B2 🛍️", "success");
                  } else if (nextStep === 3) {
                    setOrderStatus('collected');
                    showToast("Commande récupérée. Bon appétit ! 😋", "success");
                  }
                }}
                className="w-full bg-brand-highlight hover:bg-brand-border border border-brand-border/60 text-slate-200 text-[10px] font-bold py-2 px-3 rounded-lg flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Simuler l'étape suivante</span>
              </button>
            ) : (
              <button 
                onClick={resetOrder}
                className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white text-[10px] font-bold py-2.5 px-3 rounded-lg flex items-center justify-center space-x-1.5 transition-all cursor-pointer shadow"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Nouvelle Commande</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Cart Drawer Modal */}
      {drawerOpen && (
        <div className="fixed inset-0 bg-brand-dark/85 backdrop-blur-sm z-50 flex items-end justify-center transition-all duration-300">
          <div className="bg-brand-card border-t border-brand-border w-full max-w-[390px] rounded-t-3xl p-5 space-y-4 shadow-2xl relative animate-slide-up max-h-[85vh] overflow-y-auto no-scrollbar">
            {/* Header */}
            <div className="flex justify-between items-center pb-2 border-b border-brand-border/60">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5 text-brand-orange" />
                <h2 className="text-sm font-bold text-white">Récapitulatif Commande</h2>
              </div>
              <button 
                onClick={() => setDrawerOpen(false)}
                className="p-1 bg-brand-navy hover:bg-brand-highlight border border-brand-border rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Items List */}
            <div className="space-y-3.5">
              {Object.entries(cart).map(([id, qty]) => {
                const prod = PRODUCTS.find((p) => p.id === id);
                if (!prod) return null;
                return (
                  <div key={id} className="flex justify-between items-center bg-brand-navy/55 border border-brand-border/40 p-2.5 rounded-xl">
                    <div className="flex items-center space-x-2.5">
                      <span className="text-xl">{prod.emoji}</span>
                      <div>
                        <h4 className="text-xs font-semibold text-white">{prod.name}</h4>
                        <p className="text-[10px] text-brand-orange font-medium">{prod.price} MAD · unité</p>
                      </div>
                    </div>
                    {/* Controls */}
                    <div className="flex items-center space-x-2.5 bg-brand-card px-2 py-1 rounded-lg border border-brand-border/40">
                      <button 
                        onClick={() => updateQty(id, -1)}
                        className="text-slate-400 hover:text-white"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-white w-4 text-center">{qty}</span>
                      <button 
                        onClick={() => updateQty(id, 1)}
                        className="text-slate-400 hover:text-white"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Price Details */}
            <div className="bg-brand-navy/40 border border-brand-border/40 p-3 rounded-xl space-y-1.5 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Sous-total</span>
                <span>{cartTotal} MAD</span>
              </div>
              <div className="flex justify-between">
                <span>Frais Click & Collect</span>
                <span className="text-emerald-400 font-bold">Gratuit</span>
              </div>
              <div className="flex justify-between border-t border-brand-border/40 pt-1.5 font-bold text-white">
                <span>Total</span>
                <span className="text-brand-orange">{cartTotal} MAD</span>
              </div>
            </div>

            {/* Pay Button */}
            <button
              onClick={handlePay}
              disabled={isPaying}
              className="w-full bg-brand-orange text-white hover:bg-brand-orange/95 py-3.5 rounded-xl font-bold flex items-center justify-center space-x-2 shadow-lg shadow-brand-orange/20 cursor-pointer text-xs disabled:opacity-50"
            >
              {isPaying ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Traitement du paiement...</span>
                </>
              ) : (
                <>
                  <CreditCard className="w-4 h-4" />
                  <span>Payer {cartTotal} MAD</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
