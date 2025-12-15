import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Mic2 } from 'lucide-react';
import { Track } from '../types';

interface TracklistProps {
  tracks: Track[];
  currentTrack: Track | null;
  isPlaying: boolean;
  onSelectTrack: (track: Track) => void;
}

const Tracklist: React.FC<TracklistProps> = ({ tracks, currentTrack, isPlaying, onSelectTrack }) => {
  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-6">
      <h3 className="font-display text-4xl mb-8 text-white flex items-center gap-3">
        <Mic2 className="text-primary" /> TRACKLIST
      </h3>
      
      <div className="flex flex-col gap-2">
        {tracks.map((track, index) => {
          const isActive = currentTrack?.id === track.id;
          
          return (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onSelectTrack(track)}
              className={`group flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all duration-300 border border-transparent ${
                isActive 
                  ? 'bg-white/10 border-primary/30' 
                  : 'hover:bg-white/5 hover:border-white/10'
              }`}
            >
              <div className="flex items-center gap-6">
                <span className={`font-mono text-sm w-6 ${isActive ? 'text-primary' : 'text-gray-500'}`}>
                  {track.number.toString().padStart(2, '0')}
                </span>
                
                <div className="flex flex-col">
                  <span className={`font-display text-xl tracking-wide ${isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                    {track.title}
                  </span>
                </div>
                
                {track.isExplicit && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold border border-gray-600 text-gray-400">E</span>
                )}
              </div>

              <div className="flex items-center gap-4">
                <span className="font-mono text-xs text-gray-500 group-hover:text-gray-300">
                  {track.duration}
                </span>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  isActive ? 'bg-primary text-white' : 'bg-white/10 text-transparent group-hover:text-white group-hover:bg-white/20'
                }`}>
                  {isActive && isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Tracklist;