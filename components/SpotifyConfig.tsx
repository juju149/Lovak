import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, AlertCircle, CheckCircle } from 'lucide-react';
import { SpotifyService } from '../services/spotify';

interface SpotifyConfigProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (tracksData: any[]) => void;
}

const SpotifyConfig: React.FC<SpotifyConfigProps> = ({ isOpen, onClose, onConnect }) => {
  const [clientId, setClientId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const token = await SpotifyService.getToken(clientId, clientSecret);
      const tracks = await SpotifyService.getVibeTracks(token);
      
      if (tracks.length === 0) {
        throw new Error("Aucun extrait audio trouvé sur Spotify (problème de droits ?)");
      }

      onConnect(tracks);
      setStatus('success');
      setTimeout(() => {
        onClose();
        setStatus('idle');
      }, 1500);
    } catch (err: any) {
      console.error(err);
      setStatus('error');
      setErrorMessage(err.message || 'Erreur de connexion');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative bg-surface border border-white/10 p-8 rounded-2xl w-full max-w-md shadow-2xl"
          >
            <button 
              onClick={onClose} 
              className="absolute top-4 right-4 text-gray-500 hover:text-white"
            >
              <X size={24} />
            </button>

            <h2 className="font-display text-3xl mb-2">SPOTIFY <span className="text-primary">API</span></h2>
            <p className="text-gray-400 text-sm mb-6 font-mono">
              Pour activer les extraits audio, entrez vos identifiants Spotify Developer.
              (Mode Démo : Aucune donnée n'est stockée).
            </p>

            <form onSubmit={handleConnect} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">CLIENT ID</label>
                <input 
                  type="text" 
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors"
                  placeholder="Ex: 89327e..."
                  required
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">CLIENT SECRET</label>
                <input 
                  type="password" 
                  value={clientSecret}
                  onChange={(e) => setClientSecret(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors"
                  placeholder="Ex: 4d2a1..."
                  required
                />
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-500 text-sm bg-red-500/10 p-3 rounded-lg">
                  <AlertCircle size={16} />
                  {errorMessage}
                </div>
              )}

              {status === 'success' && (
                <div className="flex items-center gap-2 text-green-500 text-sm bg-green-500/10 p-3 rounded-lg">
                  <CheckCircle size={16} />
                  Connexion réussie !
                </div>
              )}

              <button 
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="mt-2 bg-primary hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all"
              >
                {status === 'loading' ? (
                  <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"/>
                ) : (
                  <>
                    <Save size={18} /> CONNECTER
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SpotifyConfig;