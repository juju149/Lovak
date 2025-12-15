import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-12 border-t border-white/5 bg-black mt-20">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-gray-500 text-sm font-mono">
          &copy; 2025 R.A.F RECORDS. TOUS DROITS RÉSERVÉS.
        </div>
        
        <div className="flex gap-8">
            <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm uppercase font-bold tracking-widest">
                Mentions Légales
            </a>
             <button 
                onClick={(e) => {
                    e.preventDefault();
                    alert("On s'en bat les couilles, non ?");
                }} 
                className="text-gray-500 hover:text-primary transition-colors text-sm uppercase font-bold tracking-widest"
            >
                Mode Avion
            </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;