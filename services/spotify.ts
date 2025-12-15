import { Track } from '../types';

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const SEARCH_ENDPOINT = 'https://api.spotify.com/v1/search';

export const SpotifyService = {
  getToken: async (clientId: string, clientSecret: string): Promise<string> => {
    const result = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
      },
      body: 'grant_type=client_credentials'
    });

    if (!result.ok) {
        throw new Error('Failed to get token');
    }

    const data = await result.json();
    return data.access_token;
  },

  getVibeTracks: async (token: string, limit: number = 13): Promise<Partial<Track>[]> => {
    // Search for tracks with a specific vibe (French Boom Bap / Old School)
    // We use a search query to find tracks that likely have previews
    const query = encodeURIComponent('genre:"french hip hop" year:1995-2005'); 
    // Or just "Boom Bap" to get the sound texture
    
    try {
        const result = await fetch(`${SEARCH_ENDPOINT}?q=style:boombap%20fr&type=track&limit=${limit * 2}`, {
            headers: { 'Authorization': 'Bearer ' + token }
        });

        if (!result.ok) return [];

        const data = await result.json();
        
        // Filter tracks that actually have a preview_url
        const validTracks = data.tracks.items
            .filter((t: any) => t.preview_url)
            .map((t: any) => ({
                previewUrl: t.preview_url,
                // We could also map duration if we wanted to be precise, but we keep the fictional metadata
            }));

        return validTracks.slice(0, limit);
    } catch (error) {
        console.error("Error fetching tracks", error);
        return [];
    }
  }
};