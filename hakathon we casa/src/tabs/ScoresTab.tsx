import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import type { Match } from './MatchesTab';

interface ScoresTabProps {
  matches: Match[];
}

export const ScoresTab: React.FC<ScoresTabProps> = ({ matches }) => {
  const [filter, setFilter] = useState<'All' | 'Today' | 'Mondial 2030' | 'CAN'>('All');

  const filteredMatches = matches.filter((match) => {
    if (filter === 'All') return true;
    if (filter === 'Today') return match.isLive; // Simulating today as live matches
    if (filter === 'Mondial 2030') return match.competition === 'Mondial 2030';
    if (filter === 'CAN') return match.competition === 'CAN 2028';
    return true;
  });

  return (
    <div className="space-y-4 pb-20">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white mb-1">Résultats en Direct</h1>
        <p className="text-xs text-slate-400">Scores en temps réel et résultats récents</p>
      </div>

      {/* Filter Row */}
      <div className="flex space-x-1.5 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
        {(['All', 'Today', 'Mondial 2030', 'CAN'] as const).map((cat) => {
          let label: string = cat;
          if (cat === 'All') label = 'Tous';
          if (cat === 'Today') label = "Aujourd'hui";
          if (cat === 'CAN') label = 'CAN 2028';
          return (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 text-xs rounded-full font-medium whitespace-nowrap transition-all duration-200 ${
                filter === cat
                  ? 'bg-brand-orange text-white shadow-md shadow-brand-orange/20'
                  : 'bg-brand-card text-slate-300 border border-brand-border hover:bg-brand-highlight'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Score Cards List */}
      <div className="space-y-3">
        {filteredMatches.map((match) => (
          <div 
            key={match.id} 
            className={`bg-brand-card border rounded-2xl p-4 transition-all duration-300 ${
              match.isLive 
                ? 'border-green-500/25 bg-gradient-to-br from-brand-card to-[#0d221c]' 
                : 'border-brand-border'
            }`}
          >
            {/* Status Info */}
            <div className="flex justify-between items-center mb-3">
              <span className="text-[9px] uppercase font-bold tracking-widest text-slate-400">
                {match.competition}
              </span>
              
              {match.isLive ? (
                <div className="flex items-center space-x-1.5 bg-green-500/10 border border-green-500/30 px-2.5 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse-fast"></span>
                  <span className="text-[9px] font-bold text-green-400 tracking-wider uppercase">En Direct</span>
                </div>
              ) : (
                <div className="flex items-center space-x-1 text-slate-500 text-[10px] font-semibold bg-brand-navy/60 px-2 py-0.5 border border-brand-border/40 rounded-full">
                  <CheckCircle className="w-3 h-3 text-slate-400" />
                  <span>Terminé</span>
                </div>
              )}
            </div>

            {/* Score Grid Layout */}
            <div className="grid grid-cols-7 items-center gap-1 my-3">
              {/* Home Team Flag + Name */}
              <div className="col-span-2 flex flex-col items-center">
                <span className="text-3xl filter drop-shadow">{match.homeFlag}</span>
                <span className="text-[11px] font-bold text-white text-center mt-1 truncate w-full">{match.homeTeam}</span>
              </div>

              {/* Home Score */}
              <div className="col-span-1 text-center">
                <span className={`text-2xl font-black tracking-tight ${match.isLive ? 'text-white animate-pulse-fast' : 'text-slate-300'}`}>
                  {match.score ? match.score.home : '-'}
                </span>
              </div>

              {/* Time / Separator */}
              <div className="col-span-1 flex flex-col items-center justify-center">
                {match.isLive ? (
                  <div className="bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded text-[9px] font-bold text-green-400 animate-pulse">
                    {match.time}
                  </div>
                ) : (
                  <span className="text-xs text-slate-500 font-bold">VS</span>
                )}
              </div>

              {/* Away Score */}
              <div className="col-span-1 text-center">
                <span className={`text-2xl font-black tracking-tight ${match.isLive ? 'text-white animate-pulse-fast' : 'text-slate-300'}`}>
                  {match.score ? match.score.away : '-'}
                </span>
              </div>

              {/* Away Team Flag + Name */}
              <div className="col-span-2 flex flex-col items-center">
                <span className="text-3xl filter drop-shadow">{match.awayFlag}</span>
                <span className="text-[11px] font-bold text-white text-center mt-1 truncate w-full">{match.awayTeam}</span>
              </div>
            </div>

            {/* Live Minute ticker note */}
            {match.isLive && (
              <div className="mt-3.5 bg-green-500/5 border border-green-500/10 rounded-xl p-2.5 flex items-center justify-between text-[10px]">
                <span className="text-slate-300 font-medium leading-none">
                  {match.homeTeam} domine la possession (56%).
                </span>
                <span className="text-green-400 font-bold uppercase tracking-wider text-[8px] border border-green-500/20 px-1 py-0.1 rounded">
                  Live stats
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
