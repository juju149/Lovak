import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { Track } from '../types';

interface PersistentPlayerProps {
  currentTrack: Track | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

const PersistentPlayer: React.FC<PersistentPlayerProps> = ({
  currentTrack,
  isPlaying,
  onPlayPause,
  onNext,
  onPrev,
  currentTime,
  duration,
  onSeek
}) => {
  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-t border-white/10 px-4 py-3 md:px-8 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]"
    >
      <div className="container mx-auto flex items-center justify-between gap-4">
        {/* Track Info */}
        <div className="flex items-center gap-4 w-1/3 min-w-[140px]">
           <div className="w-12 h-12 bg-white/10 rounded-md overflow-hidden hidden sm:block relative group">
              <img src="https://picsum.photos/100/100?grayscale" alt="Cover" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 bg-primary/20 mix-blend-overlay"></div>
           </div>
           <div className="flex flex-col overflow-hidden">
             <span className="font-display text-lg text-white truncate leading-none mb-1">
               {currentTrack?.title || "SÉLECTIONNEZ UN TITRE"}
             </span>
             <span className="font-mono text-[10px] text-primary truncate tracking-widest uppercase">
               R.A.F - {currentTrack?.number ? `TRACK ${currentTrack.number.toString().padStart(2, '0')}` : 'ALBUM'}
             </span>
           </div>
        </div>

        {/* Controls & Progress */}
        <div className="flex flex-col items-center justify-center flex-1 max-w-lg">
          <div className="flex items-center gap-6 mb-1">
             <button onClick={onPrev} className="text-gray-500 hover:text-white transition-colors hover:scale-110 transform">
               <SkipBack size={20} />
             </button>
             <button 
               onClick={onPlayPause}
               className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white hover:bg-white hover:text-black transition-all transform hover:scale-105 shadow-[0_0_15px_rgba(255,69,0,0.4)]"
             >
               {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-0.5" />}
             </button>
             <button onClick={onNext} className="text-gray-500 hover:text-white transition-colors hover:scale-110 transform">
               <SkipForward size={20} />
             </button>
          </div>
          
          <div className="w-full flex items-center gap-3 text-xs font-mono text-gray-500 select-none">
             <span className="w-8 text-right tabular-nums">{formatTime(currentTime)}</span>
             <div className="relative flex-1 h-1 bg-white/10 rounded-full group cursor-pointer flex items-center">
                <div 
                   className="absolute top-0 left-0 h-full bg-primary rounded-full group-hover:bg-secondary transition-colors"
                   style={{ width: `${progress}%` }}
                />
                <div 
                    className="absolute h-3 w-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                    style={{ left: `${progress}%`, transform: 'translateX(-50%)' }}
                />
                <input 
                  type="range" 
                  min={0} 
                  max={duration || 100} 
                  value={currentTime}
                  onChange={(e) => onSeek(Number(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
             </div>
             <span className="w-8 tabular-nums">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume / Extra */}
        <div className="w-1/3 hidden md:flex justify-end items-center gap-4">
           <div className="flex items-center gap-2 text-gray-500">
             <Volume2 size={16} />
             <div className="w-20 h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="w-1/2 h-full bg-gray-500"></div>
             </div>
           </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PersistentPlayer;