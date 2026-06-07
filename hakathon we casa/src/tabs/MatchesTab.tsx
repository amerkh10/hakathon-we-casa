import React, { useState } from 'react';
import { Ticket, Calendar, MapPin } from 'lucide-react';

export interface Match {
  id: string;
  homeTeam: string;
  homeFlag: string;
  awayTeam: string;
  awayFlag: string;
  date: string;
  time: string;
  stadium: string;
  city: string;
  competition: 'Mondial 2030' | 'CAN 2028' | 'Champions League';
  isLive: boolean;
  score?: { home: number; away: number };
}

interface MatchesTabProps {
  onBuyTicket: (match: Match) => void;
  matches: Match[];
}

export const MatchesTab: React.FC<MatchesTabProps> = ({ onBuyTicket, matches }) => {
  const [filter, setFilter] = useState<'All' | 'Mondial 2030' | 'CAN 2028' | 'Champions League'>('All');

  const filteredMatches = filter === 'All' 
    ? matches 
    : matches.filter(m => m.competition === filter);

  return (
    <div className="space-y-4 pb-20">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white mb-1">Matchs à venir</h1>
        <p className="text-xs text-slate-400">Coupe du Monde FIFA 2030 & Événements Majeurs au Maroc</p>
      </div>

      {/* Filter Row */}
      <div className="flex space-x-1.5 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
        {(['All', 'Mondial 2030', 'CAN 2028', 'Champions League'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1.5 text-xs rounded-full font-medium whitespace-nowrap transition-all duration-200 ${
              filter === cat
                ? 'bg-brand-orange text-white shadow-md shadow-brand-orange/20'
                : 'bg-brand-card text-slate-300 border border-brand-border hover:bg-brand-highlight'
            }`}
          >
            {cat === 'All' ? 'Tous' : cat}
          </button>
        ))}
      </div>

      {/* Match Cards List */}
      <div className="space-y-3.5">
        {filteredMatches.map((match) => (
          <div 
            key={match.id} 
            className="bg-brand-card border border-brand-border rounded-2xl p-4 relative overflow-hidden transition-all duration-300 hover:border-brand-orange/40 hover:shadow-lg hover:shadow-brand-orange/5"
          >
            {/* Live Indicator or Competition */}
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 px-2 py-0.5 bg-brand-navy border border-brand-border rounded-full">
                {match.competition}
              </span>
              
              {match.isLive ? (
                <div className="flex items-center space-x-1.5 bg-green-500/10 border border-green-500/30 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse-fast"></span>
                  <span className="text-[9px] font-bold text-green-400 tracking-wider">LIVE</span>
                </div>
              ) : (
                <div className="flex items-center space-x-1 text-slate-400 text-[11px]">
                  <Calendar className="w-3.5 h-3.5 text-brand-orange" />
                  <span>{match.date}</span>
                </div>
              )}
            </div>

            {/* Teams and Score */}
            <div className="flex items-center justify-between my-3">
              {/* Home Team */}
              <div className="flex flex-col items-center flex-1">
                <span className="text-3xl mb-1 filter drop-shadow-sm">{match.homeFlag}</span>
                <span className="text-sm font-semibold text-white text-center line-clamp-1">{match.homeTeam}</span>
              </div>

              {/* Match Status / Score */}
              <div className="flex flex-col items-center px-4">
                {match.isLive && match.score ? (
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-extrabold text-white tracking-wider tabular-nums">
                      {match.score.home}
                    </span>
                    <span className="text-slate-500 font-bold text-lg">-</span>
                    <span className="text-2xl font-extrabold text-white tracking-wider tabular-nums">
                      {match.score.away}
                    </span>
                  </div>
                ) : (
                  <div className="bg-brand-navy/60 px-3 py-1 rounded-lg border border-brand-border/40">
                    <span className="text-xs font-bold text-brand-orange tracking-wide">{match.time}</span>
                  </div>
                )}
              </div>

              {/* Away Team */}
              <div className="flex flex-col items-center flex-1">
                <span className="text-3xl mb-1 filter drop-shadow-sm">{match.awayFlag}</span>
                <span className="text-sm font-semibold text-white text-center line-clamp-1">{match.awayTeam}</span>
              </div>
            </div>

            <hr className="border-brand-border/50 my-3" />

            {/* Stadium & Action */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-1.5 text-slate-300 max-w-[60%]">
                <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <div className="truncate">
                  <p className="font-medium truncate text-white">{match.stadium}</p>
                  <p className="text-[10px] text-slate-400">{match.city}</p>
                </div>
              </div>

              <button
                onClick={() => onBuyTicket(match)}
                className="bg-brand-orange text-white hover:bg-brand-orange/90 font-semibold px-3.5 py-2 rounded-xl transition-all duration-200 flex items-center space-x-1 shadow-md shadow-brand-orange/20 cursor-pointer text-xs"
              >
                <Ticket className="w-3.5 h-3.5" />
                <span>Billet</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
