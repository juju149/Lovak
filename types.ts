export interface Track {
  id: string;
  number: number;
  title: string;
  duration: string;
  previewUrl: string | null; // Placeholder for Spotify preview URL
  isExplicit?: boolean;
}

export interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  volume: number;
}