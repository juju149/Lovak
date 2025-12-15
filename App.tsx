import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import BentoGrid from './components/BentoGrid';
import Tracklist from './components/Tracklist';
import Footer from './components/Footer';
import { ALBUM_TRACKS } from './services/mockData';
import { Track } from './types';

const App: React.FC = () => {
  const [currentTrack, setCurrentTrack] = useState<Track>(ALBUM_TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize Audio
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = 0.5;
    
    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      // In a real scenario, this would play track.previewUrl
      // For demo, we just simulate play state change
      // If we had a real file: audioRef.current.src = currentTrack.previewUrl;
      // audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTrackSelect = (track: Track) => {
    if (currentTrack?.id === track.id) {
      handlePlayPause();
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
      // Simulate starting new track
    }
  };

  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary selection:text-white">
      {/* Background Noise/Gradient Effect */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      ></div>
      
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full z-0 pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-secondary/5 blur-[120px] rounded-full z-0 pointer-events-none" />

      <Header />

      <main className="relative z-10 pt-32 pb-10 px-4 md:px-8 container mx-auto flex flex-col gap-16">
        
        {/* HERO SECTION */}
        <section id="album">
          <BentoGrid 
            currentTrack={currentTrack} 
            isPlaying={isPlaying} 
            onPlayPause={handlePlayPause} 
          />
        </section>

        {/* TRACKLIST SECTION */}
        <section id="tracklist" className="relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent via-primary to-transparent opacity-50"></div>
          <Tracklist 
            tracks={ALBUM_TRACKS} 
            currentTrack={currentTrack} 
            isPlaying={isPlaying} 
            onSelectTrack={handleTrackSelect} 
          />
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default App;