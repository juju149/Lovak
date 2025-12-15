import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'HOODIE "CYNIQUE"',
    price: '65,00 €',
    image: 'https://picsum.photos/400/400?grayscale',
    tag: 'BESTSELLER'
  },
  {
    id: 2,
    name: 'VINYL R.A.F (COLLECTOR)',
    price: '35,00 €',
    image: 'https://picsum.photos/401/401?grayscale',
    tag: 'LIMITED'
  },
  {
    id: 3,
    name: 'T-SHIRT "NO FUTURE"',
    price: '30,00 €',
    image: 'https://picsum.photos/402/402?grayscale',
    tag: null
  }
];

const MerchSection: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto py-16 px-6">
      <div className="flex justify-between items-end mb-12">
        <h3 className="font-display text-5xl text-white">
          OFFICIAL <span className="text-stroke text-transparent" style={{ WebkitTextStroke: '1px #ff4500' }}>MERCH</span>
        </h3>
        <a href="#" className="hidden md:flex items-center gap-2 text-primary hover:text-white transition-colors font-bold tracking-widest text-sm">
          VOIR TOUT LE SHOP <ArrowRight size={16} />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-surface border border-white/5 p-4 rounded-2xl hover:border-primary/50 transition-colors duration-300"
          >
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden rounded-xl bg-black/50 mb-6">
              {product.tag && (
                <div className="absolute top-4 left-4 z-10 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded">
                  {product.tag}
                </div>
              )}
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100"
              />
              {/* Overlay Button */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <button className="bg-white text-black px-6 py-3 rounded-full font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                   <ShoppingBag size={16} /> ACHETER
                 </button>
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-1">
              <h4 className="font-display text-2xl text-white tracking-wide">{product.name}</h4>
              <p className="font-mono text-primary font-bold">{product.price}</p>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-12 flex justify-center md:hidden">
        <a href="#" className="flex items-center gap-2 text-primary hover:text-white transition-colors font-bold tracking-widest text-sm">
          VOIR TOUT LE SHOP <ArrowRight size={16} />
        </a>
      </div>
    </div>
  );
};

export default MerchSection;