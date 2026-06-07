import { useState, useEffect } from 'react';
import { MatchesTab } from './tabs/MatchesTab';
import type { Match } from './tabs/MatchesTab';
import { TransportTab } from './tabs/TransportTab';
import { GateTab } from './tabs/GateTab';
import { SeatTab } from './tabs/SeatTab';
import { OrderTab } from './tabs/OrderTab';
import { ScoresTab } from './tabs/ScoresTab';
import { Toast } from './components/Toast';
import type { ToastItem } from './components/Toast';
import { QRScannerModal } from './components/QRScannerModal';
import { Wifi, Battery, Home, Bus, DoorOpen, Compass, ShoppingBag, BarChart2, RefreshCw } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'matches' | 'transport' | 'gate' | 'seat' | 'order' | 'scores'>('matches');
  const [unlocked, setUnlocked] = useState(false);
  
  // Toasts state
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const showToast = (message: string, type: 'info' | 'success' | 'warning') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
  };
  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // QR Scanner Modal state
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  // Ticket redirect modal state
  const [redirectingMatch, setRedirectingMatch] = useState<Match | null>(null);

  // Cart state
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [orderStatus, setOrderStatus] = useState<'none' | 'received' | 'preparing' | 'ready' | 'collected'>('none');

  // Matches State with Live scoring simulation
  const [matches, setMatches] = useState<Match[]>([
    {
      id: 'm1',
      homeTeam: 'Maroc',
      homeFlag: '🇲🇦',
      awayTeam: 'Espagne',
      awayFlag: '🇪🇸',
      date: 'Aujourd\'hui',
      time: '74\'',
      stadium: 'Grand Stade de Casablanca',
      city: 'Casablanca',
      competition: 'Mondial 2030',
      isLive: true,
      score: { home: 2, away: 1 }
    },
    {
      id: 'm2',
      homeTeam: 'Portugal',
      homeFlag: '🇵🇹',
      awayTeam: 'Argentine',
      awayFlag: '🇦🇷',
      date: 'Aujourd\'hui',
      time: '52\'',
      stadium: 'Stade Mohammed V',
      city: 'Casablanca',
      competition: 'Mondial 2030',
      isLive: true,
      score: { home: 1, away: 1 }
    },
    {
      id: 'm3',
      homeTeam: 'Sénégal',
      homeFlag: '🇸🇳',
      awayTeam: 'Égypte',
      awayFlag: '🇪🇬',
      date: 'Aujourd\'hui',
      time: '15\'',
      stadium: 'Grand Stade de Casablanca',
      city: 'Casablanca',
      competition: 'CAN 2028',
      isLive: true,
      score: { home: 0, away: 0 }
    },
    {
      id: 'm4',
      homeTeam: 'Maroc',
      homeFlag: '🇲🇦',
      awayTeam: 'Portugal',
      awayFlag: '🇵🇹',
      date: '03 Juin 2030',
      time: 'Terminé',
      stadium: 'Stade Mohammed V',
      city: 'Casablanca',
      competition: 'Mondial 2030',
      isLive: false,
      score: { home: 1, away: 0 }
    },
    {
      id: 'm5',
      homeTeam: 'Wydad AC',
      homeFlag: '🇲🇦',
      awayTeam: 'Al Ahly',
      awayFlag: '🇪🇬',
      date: '20 Mai 2028',
      time: 'Terminé',
      stadium: 'Stade Mohammed V',
      city: 'Casablanca',
      competition: 'Champions League',
      isLive: false,
      score: { home: 2, away: 1 }
    },
    {
      id: 'm6',
      homeTeam: 'Raja CA',
      homeFlag: '🇲🇦',
      awayTeam: 'Espérance Tunis',
      awayFlag: '🇹🇳',
      date: '22 Mai 2028',
      time: 'Terminé',
      stadium: 'Stade Mohammed V',
      city: 'Casablanca',
      competition: 'Champions League',
      isLive: false,
      score: { home: 0, away: 0 }
    },
    {
      id: 'm7',
      homeTeam: 'France',
      homeFlag: '🇫🇷',
      awayTeam: 'Brésil',
      awayFlag: '🇧🇷',
      date: '04 Juin 2030',
      time: 'Terminé',
      stadium: 'Grand Stade de Casablanca',
      city: 'Casablanca',
      competition: 'Mondial 2030',
      isLive: false,
      score: { home: 2, away: 3 }
    },
    {
      id: 'm8',
      homeTeam: 'Belgique',
      homeFlag: '🇧🇪',
      awayTeam: 'Maroc',
      awayFlag: '🇲🇦',
      date: '31 Mai 2030',
      time: 'Terminé',
      stadium: 'Grand Stade de Casablanca',
      city: 'Casablanca',
      competition: 'Mondial 2030',
      isLive: false,
      score: { home: 1, away: 2 }
    }
  ]);

  // Selected match for context (default: Maroc vs Espagne)
  const selectedMatch = matches[0];

  // Live score update simulator (runs every 30 seconds)
  useEffect(() => {
    const scoreInterval = setInterval(() => {
      // Pick a random live match
      const liveMatches = matches.filter(m => m.isLive);
      if (liveMatches.length === 0) return;

      const randomMatchIndex = Math.floor(Math.random() * liveMatches.length);
      const chosenMatch = liveMatches[randomMatchIndex];

      // Determine who scores
      const isHomeScoring = Math.random() > 0.45; // slightly higher chance for home team
      
      setMatches((prevMatches) => 
        prevMatches.map((m) => {
          if (m.id === chosenMatch.id && m.score) {
            const nextHome = isHomeScoring ? m.score.home + 1 : m.score.home;
            const nextAway = !isHomeScoring ? m.score.away + 1 : m.score.away;
            const scoringTeamName = isHomeScoring ? m.homeTeam : m.awayTeam;
            const flag = isHomeScoring ? m.homeFlag : m.awayFlag;
            
            // Show toast notification
            showToast(`⚽ BUT pour ${flag} ${scoringTeamName} ! Score: ${nextHome} - ${nextAway}`, 'success');

            return {
              ...m,
              score: { home: nextHome, away: nextAway }
            };
          }
          return m;
        })
      );
    }, 30000);

    return () => clearInterval(scoreInterval);
  }, [matches]);

  // Handle buy ticket action
  const handleBuyTicket = (match: Match) => {
    setRedirectingMatch(match);
    setTimeout(() => {
      setRedirectingMatch(null);
      showToast(`Redirection vers Guichet.ma effectuée.`, 'success');
    }, 2200);
  };

  // Handle successful QR scan
  const handleScanSuccess = () => {
    setUnlocked(true);
    showToast("✓ Billet activé ! Fonctionnalités du stade déverrouillées.", "success");
    showToast("📍 Porte C conseillée (2 min d'attente)", "info");
    setActiveTab('gate'); // Auto transition to gate tab to show the unlocked map!
  };

  return (
    <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center p-0 md:p-6 overflow-hidden relative">
      {/* Decorative desktop backgrounds */}
      <div className="absolute top-[-20%] left-[-20%] w-[60%] aspect-square rounded-full bg-brand-orange/5 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-20%] w-[60%] aspect-square rounded-full bg-brand-navy/35 blur-3xl pointer-events-none"></div>

      {/* Main viewport shell (phone mockup on desktop, fullscreen on mobile) */}
      <div className="w-full max-w-[390px] h-screen md:h-[830px] md:rounded-[40px] md:border-8 md:border-slate-800 bg-brand-navy flex flex-col relative overflow-hidden shadow-2xl md:ring-1 md:ring-brand-border">
        
        {/* Mock Phone Notch & Status Bar */}
        <div className="bg-brand-navy/95 pt-2 px-6 flex justify-between items-center text-[10px] text-slate-300 font-bold z-30 select-none">
          <span>19:12</span>
          {/* Notch Spacer */}
          <div className="w-24 h-4 bg-brand-dark rounded-b-xl hidden md:block absolute top-0 left-1/2 transform -translate-x-1/2"></div>
          <div className="flex items-center space-x-1">
            <Wifi className="w-3 h-3 text-slate-300" />
            <span className="text-[9px]">5G</span>
            <Battery className="w-3.5 h-3.5 text-slate-300 fill-slate-300" />
          </div>
        </div>

        {/* Global App Logo / Sub-header bar */}
        <div className="bg-brand-navy/95 px-4 pt-2 pb-1 border-b border-brand-border/60 flex justify-between items-center z-30 select-none">
          <div className="flex items-center space-x-1.5">
            <span className="text-lg">🦁</span>
            <div>
              <span className="text-xs font-black tracking-tight text-white block leading-none">SmartCrowd</span>
              <span className="text-[8.5px] uppercase font-extrabold tracking-widest text-brand-orange leading-none">Stadium Hub</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-1 bg-brand-card border border-brand-border py-0.5 px-2 rounded-full">
            <span className={`w-1.5 h-1.5 rounded-full ${unlocked ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
            <span className="text-[9px] font-bold text-slate-300">
              {unlocked ? 'Siège Activé' : 'Mode Visiteur'}
            </span>
          </div>
        </div>

        {/* Main Tab Screen Content (scrollable) */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-4 bg-brand-dark relative z-10">
          
          {/* Active Tab rendering with transitions (using a simple fade-in transition container) */}
          <div className="animate-fade-in duration-300">
            {activeTab === 'matches' && (
              <MatchesTab onBuyTicket={handleBuyTicket} matches={matches} />
            )}
            {activeTab === 'transport' && (
              <TransportTab selectedMatch={selectedMatch} showToast={showToast} />
            )}
            {activeTab === 'gate' && (
              <GateTab unlocked={unlocked} onOpenScanner={() => setIsScannerOpen(true)} />
            )}
            {activeTab === 'seat' && (
              <SeatTab unlocked={unlocked} onOpenScanner={() => setIsScannerOpen(true)} />
            )}
            {activeTab === 'order' && (
              <OrderTab 
                unlocked={unlocked} 
                onOpenScanner={() => setIsScannerOpen(true)} 
                showToast={showToast} 
                cart={cart}
                setCart={setCart}
                orderStatus={orderStatus}
                setOrderStatus={setOrderStatus}
              />
            )}
            {activeTab === 'scores' && (
              <ScoresTab matches={matches} />
            )}
          </div>
        </div>

        {/* Persistent Bottom Nav Navigation Bar */}
        <div className="bg-brand-navy/95 border-t border-brand-border/85 pb-5 pt-2 px-2.5 flex justify-between items-center z-30 select-none">
          {/* Tab Button 1: Matches */}
          <button 
            onClick={() => setActiveTab('matches')} 
            className={`flex flex-col items-center flex-1 py-1 transition-all ${
              activeTab === 'matches' ? 'text-brand-orange font-bold scale-105' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Home className="w-5 h-5 mb-0.5" />
            <span className="text-[9px] uppercase tracking-wide">Matchs</span>
          </button>

          {/* Tab Button 2: Transport */}
          <button 
            onClick={() => setActiveTab('transport')} 
            className={`flex flex-col items-center flex-1 py-1 transition-all ${
              activeTab === 'transport' ? 'text-brand-orange font-bold scale-105' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Bus className="w-5 h-5 mb-0.5" />
            <span className="text-[9px] uppercase tracking-wide">Trajet</span>
          </button>

          {/* Tab Button 3: Gate */}
          <button 
            onClick={() => setActiveTab('gate')} 
            className={`flex flex-col items-center flex-1 py-1 transition-all relative ${
              activeTab === 'gate' ? 'text-brand-orange font-bold scale-105' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {!unlocked && <span className="absolute top-0 right-4 w-1.5 h-1.5 bg-amber-500 rounded-full"></span>}
            <DoorOpen className="w-5 h-5 mb-0.5" />
            <span className="text-[9px] uppercase tracking-wide">Porte</span>
          </button>

          {/* Tab Button 4: Seat */}
          <button 
            onClick={() => setActiveTab('seat')} 
            className={`flex flex-col items-center flex-1 py-1 transition-all relative ${
              activeTab === 'seat' ? 'text-brand-orange font-bold scale-105' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {!unlocked && <span className="absolute top-0 right-4 w-1.5 h-1.5 bg-amber-500 rounded-full"></span>}
            <Compass className="w-5 h-5 mb-0.5" />
            <span className="text-[9px] uppercase tracking-wide">Siège</span>
          </button>

          {/* Tab Button 5: Order */}
          <button 
            onClick={() => setActiveTab('order')} 
            className={`flex flex-col items-center flex-1 py-1 transition-all relative ${
              activeTab === 'order' ? 'text-brand-orange font-bold scale-105' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {!unlocked && <span className="absolute top-0 right-4 w-1.5 h-1.5 bg-amber-500 rounded-full"></span>}
            <ShoppingBag className="w-5 h-5 mb-0.5" />
            <span className="text-[9px] uppercase tracking-wide">Panier</span>
          </button>

          {/* Tab Button 6: Scores */}
          <button 
            onClick={() => setActiveTab('scores')} 
            className={`flex flex-col items-center flex-1 py-1 transition-all ${
              activeTab === 'scores' ? 'text-brand-orange font-bold scale-105' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BarChart2 className="w-5 h-5 mb-0.5" />
            <span className="text-[9px] uppercase tracking-wide">Scores</span>
          </button>
        </div>

        {/* Global Toast notifications Stack overlay */}
        <Toast toasts={toasts} removeToast={removeToast} />

        {/* QR Scanner Modal component */}
        <QRScannerModal 
          isOpen={isScannerOpen} 
          onClose={() => setIsScannerOpen(false)} 
          onScanSuccess={handleScanSuccess} 
        />

        {/* Ticket buy redirect modal loader simulation */}
        {redirectingMatch && (
          <div className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm z-50 flex items-center justify-center p-6 select-none">
            <div className="bg-brand-card border border-brand-border p-5 rounded-2xl max-w-[280px] text-center space-y-4 shadow-2xl">
              <RefreshCw className="w-8 h-8 text-brand-orange animate-spin mx-auto" />
              <div>
                <h3 className="text-sm font-bold text-white">Redirection vers Guichet.ma</h3>
                <p className="text-[10px] text-slate-400 mt-1">Vous allez être redirigé vers notre partenaire officiel de billetterie pour acheter vos places.</p>
              </div>
              <div className="text-[9px] text-slate-500 bg-brand-navy/60 p-2 rounded-lg truncate">
                {redirectingMatch.homeTeam} vs {redirectingMatch.awayTeam}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
