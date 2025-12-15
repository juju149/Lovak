import React from 'react';
import { motion } from 'framer-motion';

const BioSection: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto py-20 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Image / Visual */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-primary/20 blur-2xl rounded-full z-0"></div>
          <div className="relative z-10 aspect-[3/4] overflow-hidden rounded-lg bg-surface border border-white/10">
             <img 
               src="https://picsum.photos/600/800?grayscale&contrast=2" 
               alt="Artist Portrait" 
               className="w-full h-full object-cover opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-700"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
             <div className="absolute bottom-6 left-6">
                <h2 className="font-display text-8xl text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-600 leading-none">
                  R.A.F
                </h2>
             </div>
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col justify-center space-y-8"
        >
          <h3 className="font-display text-4xl md:text-5xl leading-tight">
            "JE NE FAIS PAS DE LA MUSIQUE POUR PLAIRE. JE FAIS DU BRUIT POUR <span className="text-primary underline decoration-4 decoration-secondary underline-offset-4">DÉRANGER</span>."
          </h3>
          
          <div className="space-y-6 font-body text-gray-400 text-lg leading-relaxed border-l-2 border-primary/50 pl-6">
            <p>
              Né dans le béton froid d'une métropole en décomposition, R.A.F n'est pas un artiste, c'est un symptôme. 
              Le symptôme d'une génération qui a arrêté de croire aux promesses du JT de 20h.
            </p>
            <p>
              Son style ? Du Boom Bap passé à la moulinette industrielle. Des samples sales, des basses qui saturent 
              comme une migraine lendemain de cuite, et des textes qui coupent comme du verre brisé.
            </p>
            <p>
              "Rien À Foutre" n'est pas juste un titre d'album. C'est une philosophie de survie. 
              Pas de morale, pas de leçon. Juste un miroir tendu vers le vide.
            </p>
          </div>

          <div className="pt-4">
            <img 
              src="https://via.placeholder.com/200x80?text=SIGNATURE" 
              alt="Signature" 
              className="h-20 opacity-50 invert" 
              style={{ filter: 'invert(1) brightness(2)' }}
            />
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default BioSection;