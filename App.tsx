import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import BentoGrid from './components/BentoGrid';
import Tracklist from './components/Tracklist';
import TourSection from './components/TourSection';
import BioSection from './components/BioSection';
import MerchSection from './components/MerchSection';
import Footer from './components/Footer';
import SpotifyConfig from './components/SpotifyConfig';
import PersistentPlayer from './components/PersistentPlayer';
import { ALBUM_TRACKS } from './services/mockData';
import { Track } from './types';

const App: React.FC = () => {
  const [tracks, setTracks] = useState<Track[]>(ALBUM_TRACKS);
  const [currentTrack, setCurrentTrack] = useState<Track>(ALBUM_TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize Audio
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = 0.5;
    
    // Add event listeners for audio state
    const audio = audioRef.current;
    
    const onEnded = () => setIsPlaying(false);
    const onPause = () => setIsPlaying(false);
    const onPlay = () => setIsPlaying(true);
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration);

    audio.addEventListener('ended', onEnded);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);

    // Cleanup
    return () => {
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.pause();
    };
  }, []);

  // Handle Playback Logic
  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      if (!audioRef.current.src && currentTrack.previewUrl && currentTrack.previewUrl !== 'mock') {
         audioRef.current.src = currentTrack.previewUrl;
      }
      
      // If mock data, show alert
      if (currentTrack.previewUrl === 'mock') {
        alert("Connectez l'API Spotify (en bas de page) pour écouter les extraits.");
        return;
      }
      
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.error("Playback failed", error);
            setIsPlaying(false);
        });
      }
    }
  };

  const handleTrackSelect = (track: Track) => {
    if (!audioRef.current) return;

    if (currentTrack?.id === track.id) {
      handlePlayPause();
    } else {
      setCurrentTrack(track);
      if (track.previewUrl && track.previewUrl !== 'mock') {
        audioRef.current.src = track.previewUrl;
        audioRef.current.play().catch(e => console.error("Play error", e));
        setIsPlaying(true);
      } else {
        // Stop if switching to a track without preview
        audioRef.current.pause();
        setIsPlaying(false);
        if (track.previewUrl === 'mock') {
             // Optional: Auto open config or just wait for user interaction
        }
      }
    }
  };

  const handleSeek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleNext = () => {
    const currentIndex = tracks.findIndex(t => t.id === currentTrack.id);
    if (currentIndex < tracks.length - 1) {
      handleTrackSelect(tracks[currentIndex + 1]);
    } else {
      // Loop to start
      handleTrackSelect(tracks[0]);
    }
  };

  const handlePrev = () => {
    const currentIndex = tracks.findIndex(t => t.id === currentTrack.id);
    if (currentIndex > 0) {
      handleTrackSelect(tracks[currentIndex - 1]);
    } else {
      // Loop to end
      handleTrackSelect(tracks[tracks.length - 1]);
    }
  };

  const handleSpotifyConnect = (previewTracks: any[]) => {
    // Merge real previews into fictional tracks
    const updatedTracks = tracks.map((track, index) => {
        if (previewTracks[index]) {
            return {
                ...track,
                previewUrl: previewTracks[index].previewUrl
            };
        }
        return track;
    });
    setTracks(updatedTracks);
    setCurrentTrack(updatedTracks[0]); // Reset to first track with potential audio
  };

  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary selection:text-white pb-24">
      {/* Background Noise/Gradient Effect */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      ></div>
      
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full z-0 pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-secondary/5 blur-[120px] rounded-full z-0 pointer-events-none" />

      <Header />

      <main className="relative z-10 pt-32 pb-10 px-4 md:px-8 container mx-auto flex flex-col gap-24">
        
        {/* HERO SECTION */}
        <section id="album" className="scroll-mt-32">
          <BentoGrid 
            currentTrack={currentTrack} 
            isPlaying={isPlaying} 
            onPlayPause={handlePlayPause} 
          />
        </section>

        {/* TRACKLIST SECTION */}
        <section id="tracks" className="scroll-mt-32 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent via-primary to-transparent opacity-50"></div>
          <Tracklist 
            tracks={tracks} 
            currentTrack={currentTrack} 
            isPlaying={isPlaying} 
            onSelectTrack={handleTrackSelect} 
          />
        </section>

        {/* TOUR SECTION */}
        <section id="tour" className="scroll-mt-32 relative border-t border-white/5 pt-12">
           <TourSection />
        </section>

        {/* BIO SECTION */}
        <section id="bio" className="scroll-mt-32 relative bg-gradient-to-b from-transparent to-surface/30 rounded-3xl">
           <BioSection />
        </section>

        {/* MERCH SECTION */}
        <section id="merch" className="scroll-mt-32 relative border-t border-white/5 pt-12">
           <MerchSection />
        </section>

      </main>

      <Footer onOpenConfig={() => setIsConfigOpen(true)} />
      
      <SpotifyConfig 
        isOpen={isConfigOpen} 
        onClose={() => setIsConfigOpen(false)} 
        onConnect={handleSpotifyConnect}
      />

      <PersistentPlayer
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onNext={handleNext}
        onPrev={handlePrev}
        currentTime={currentTime}
        duration={duration}
        onSeek={handleSeek}
      />
    </div>
  );
};

export default App;