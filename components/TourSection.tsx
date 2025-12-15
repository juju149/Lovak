import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Ticket } from 'lucide-react';

const dates = [
  { id: 1, date: '12 OCT', city: 'PARIS', venue: 'Le Zénith', status: 'SOLD OUT' },
  { id: 2, date: '15 OCT', city: 'LYON', venue: 'Le Transbordeur', status: 'AVAILABLE' },
  { id: 3, date: '18 OCT', city: 'MARSEILLE', venue: 'Le Dôme', status: 'AVAILABLE' },
  { id: 4, date: '22 OCT', city: 'BRUXELLES', venue: 'Forest National', status: 'SELLING FAST' },
  { id: 5, date: '25 OCT', city: 'GENÈVE', venue: 'Arena', status: 'AVAILABLE' },
  { id: 6, date: '30 OCT', city: 'NANTES', venue: 'Zénith', status: 'SOLD OUT' },
];

const TourSection: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto py-12">
      <div className="flex flex-col md:flex-row items-baseline justify-between mb-12 px-6">
        <h3 className="font-display text-5xl md:text-7xl text-white">
          TOUR <span className="text-primary">2025</span>
        </h3>
        <p className="text-gray-400 font-mono mt-2 md:mt-0">LA TOURNÉE DU CHAOS</p>
      </div>

      <div className="flex flex-col border-t border-white/10">
        {dates.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative flex flex-col md:flex-row items-center justify-between p-6 md:p-8 border-b border-white/10 hover:bg-white/5 transition-colors duration-300"
          >
            {/* Date & Venue */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12 w-full md:w-auto">
              <div className="flex items-center gap-3 text-primary font-bold font-mono text-xl w-32">
                <Calendar size={18} />
                {item.date}
              </div>
              
              <div className="flex flex-col">
                <span className="font-display text-3xl md:text-4xl text-white group-hover:text-primary transition-colors">
                  {item.city}
                </span>
                <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                  <MapPin size={14} />
                  {item.venue}
                </div>
              </div>
            </div>

            {/* Action */}
            <div className="mt-6 md:mt-0 flex items-center justify-between w-full md:w-auto gap-8">
              <div className="flex items-center">
                 {item.status === 'SOLD OUT' ? (
                   <span className="px-3 py-1 bg-red-900/30 text-red-500 border border-red-900/50 rounded text-xs font-bold tracking-widest">
                     SOLD OUT
                   </span>
                 ) : item.status === 'SELLING FAST' ? (
                    <span className="px-3 py-1 bg-secondary/20 text-secondary border border-secondary/50 rounded text-xs font-bold tracking-widest animate-pulse">
                     LAST TICKETS
                   </span>
                 ) : (
                   <span className="px-3 py-1 bg-green-900/30 text-green-500 border border-green-900/50 rounded text-xs font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                     AVAILABLE
                   </span>
                 )}
              </div>

              <button 
                disabled={item.status === 'SOLD OUT'}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm tracking-wider transition-all transform hover:scale-105 ${
                  item.status === 'SOLD OUT' 
                    ? 'bg-white/5 text-gray-600 cursor-not-allowed' 
                    : 'bg-white text-black hover:bg-primary hover:text-white'
                }`}
              >
                <Ticket size={16} />
                TICKETS
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TourSection;