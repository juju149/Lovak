import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Instagram, Music, CloudRain, Wind, Thermometer, ExternalLink } from 'lucide-react';
import { Track } from '../types';

interface BentoGridProps {
  currentTrack: Track | null;
  isPlaying: boolean;
  onPlayPause: () => void;
}

const BentoCard = ({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    whileHover={{ y: -5, boxShadow: "0 20px 40px -10px rgba(255, 69, 0, 0.15)" }}
    className={`relative overflow-hidden rounded-3xl border border-white/10 bg-surface/50 backdrop-blur-sm p-6 ${className}`}
  >
    {children}
  </motion.div>
);

const BentoGrid: React.FC<BentoGridProps> = ({ currentTrack, isPlaying, onPlayPause }) => {
  // Simulate an audio visualizer
  const bars = [1, 2, 3, 4, 5, 6];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 h-auto md:h-[600px] w-full">
      
      {/* Card 1: Main Cover & CTA */}
      <BentoCard className="md:col-span-2 md:row-span-3 group relative flex flex-col justify-end" delay={0.1}>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
        <img 
          src="https://picsum.photos/800/800?grayscale&blur=2" 
          alt="Album Cover" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="relative z-20 mb-4">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest text-black bg-secondary rounded-full">
            OUT NOW
          </span>
          <h2 className="font-display text-6xl md:text-8xl text-white leading-none mb-2">
            R.A.F
          </h2>
          <p className="font-body text-gray-400 text-lg mb-6">RIEN À FOUTRE</p>
          <button 
            onClick={onPlayPause}
            className="flex items-center gap-3 bg-primary hover:bg-orange-600 text-white px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105"
          >
            {isPlaying ? <Pause fill="currentColor" /> : <Play fill="currentColor" />}
            {isPlaying ? 'PAUSE' : 'ÉCOUTER MAINTENANT'}
          </button>
        </div>
      </BentoCard>

      {/* Card 2: Audio Player / Visualizer */}
      <BentoCard className="md:col-span-2 md:row-span-1 flex flex-col justify-between bg-gradient-to-br from-surface to-surface/80" delay={0.2}>
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs text-primary font-bold tracking-wider mb-1">NOW PLAYING</p>
            <h3 className="font-display text-2xl truncate max-w-[200px]">
              {currentTrack ? currentTrack.title : 'Sélectionnez un titre'}
            </h3>
          </div>
          <div className="flex gap-1 h-8 items-end">
            {bars.map((bar) => (
              <div 
                key={bar}
                className={`w-1.5 bg-secondary rounded-t-sm ${isPlaying ? 'animate-equalizer' : 'h-[2px]'}`}
                style={{ animationDelay: `${bar * 0.1}s` }}
              ></div>
            ))}
          </div>
        </div>
        
        <div className="w-full bg-white/10 h-1 rounded-full mt-4 overflow-hidden">
           <motion.div 
             className="h-full bg-primary"
             initial={{ width: '0%' }}
             animate={{ width: isPlaying ? '100%' : '0%' }}
             transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
           />
        </div>
      </BentoCard>

      {/* Card 3: Socials */}
      <BentoCard className="md:col-span-1 md:row-span-1 flex flex-col justify-center items-center gap-4 hover:bg-white/5" delay={0.3}>
        <div className="flex gap-4">
          <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-primary hover:text-white transition-colors">
            <Instagram size={24} />
          </a>
          <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-primary hover:text-white transition-colors">
            <Music size={24} /> 
          </a>
        </div>
        <p className="text-xs text-gray-400 uppercase tracking-widest">Connect</p>
      </BentoCard>

      {/* Card 4: Quote */}
      <BentoCard className="md:col-span-1 md:row-span-2 flex flex-col justify-center bg-black border-primary/20" delay={0.4}>
        <div className="text-primary text-4xl font-display mb-4">"</div>
        <p className="font-display text-2xl md:text-3xl leading-tight text-gray-200">
          RIEN À FOUTRE.<br />
          C'EST MON GILET <span className="text-primary">PARE-BALLES</span>.
        </p>
      </BentoCard>

      {/* Card 5: Weather / Vibe */}
      <BentoCard className="md:col-span-1 md:row-span-1 flex flex-col justify-between" delay={0.5}>
        <div className="flex justify-between items-center text-gray-400">
           <CloudRain size={20} />
           <span className="text-xs font-mono">PARIS</span>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
             <Thermometer size={16} className="text-primary"/>
             <span className="font-bold text-xl">4°C</span>
          </div>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <Wind size={12} /> NUIT URBAINE
          </p>
        </div>
      </BentoCard>

    </div>
  );
};

export default BentoGrid;