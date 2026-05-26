import { motion } from 'framer-motion';
import PixelImage from './bits/PixelImage';

const memories = [
  {
    title: 'HACKATHON 2023',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=60',
    grid: '8x8'
  },
  {
    title: 'AI WORKSHOP',
    image: 'https://images.unsplash.com/photo-1591453089816-0fbb971b454c?w=800&auto=format&fit=crop&q=60',
    grid: '10x10'
  },
  {
    title: 'IDEATHON',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=60',
    grid: '6x6'
  },
  {
    title: 'TECH EXPO',
    image: 'https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?w=800&auto=format&fit=crop&q=60',
    grid: '12x12'
  },
  {
    title: 'CODING CONTEST',
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&auto=format&fit=crop&q=60',
    grid: '8x8'
  },
  {
    title: 'COMMUNITY MEETUP',
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&auto=format&fit=crop&q=60',
    grid: '10x10'
  }
];

const Memories = () => {
  return (
    <section id="memories" className="py-32 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-sm font-black text-white uppercase tracking-[1em] mb-4">Legacy</h2>
          <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Memories</h3>
          <div className="w-full h-[1px] bg-white/20 mt-8"></div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {memories.map((memory, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group aspect-square overflow-hidden border border-white/10"
            >
              <PixelImage
                src={memory.image}
                active={true}
                grid={memory.grid as any}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6 text-center">
                <p className="text-xl font-black tracking-widest uppercase">{memory.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Memories;
