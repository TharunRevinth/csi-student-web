import { useState } from 'react';
import { motion } from 'framer-motion';
import PixelImage from './bits/PixelImage';

const events = [
  {
    title: 'HACKATHON X',
    date: 'MARCH 15, 2024',
    description: 'A 24-hour marathon of innovation and coding.',
    type: 'EVENT',
  },
  {
    title: 'TECH SUMMIT',
    date: 'FEBRUARY 10, 2024',
    description: 'Exploring the future of artificial intelligence.',
    type: 'WORKSHOP',
  },
  {
    title: 'CODE QUEST',
    date: 'JANUARY 25, 2024',
    description: 'Competitive programming at its finest.',
    type: 'COMPETITION',
  },
];

const pixelPlaceholders = [
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1563089145-599997674d42?w=800&auto=format&fit=crop&q=60',
];

const EventCard = ({ event, index }: { event: any, index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-black text-white group relative overflow-hidden h-[600px] flex flex-col"
    >
      {/* PixelImage Integration */}
      <div className="absolute inset-0 z-0">
        <PixelImage 
          src={pixelPlaceholders[index % 3]} 
          active={isHovered}
          grid="8x8"
          grayscaleAnimation={false}
          pixelFadeInDuration={800}
          maxAnimationDelay={1000}
          className="w-full h-full opacity-60 group-hover:opacity-100 transition-opacity duration-700"
        />
      </div>

      <div className="relative z-10 p-12 mt-auto bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none">
        <div className="text-xs font-black tracking-[0.3em] mb-4 opacity-60 group-hover:text-white transition-colors">{event.date}</div>
        <h3 className="text-3xl font-black mb-6 leading-none group-hover:tracking-wider transition-all duration-500">{event.title}</h3>
        <p className="text-white/60 text-sm font-light mb-8 group-hover:text-white transition-colors max-w-xs">
          {event.description}
        </p>
        <div className="w-12 h-1 bg-white group-hover:w-full transition-all duration-700"></div>
      </div>
    </motion.div>
  );
};

const Events = () => {
  return (
    <section id="events" className="py-32 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title with Scroll Reveal Effect */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-24 flex items-end justify-between"
        >
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-sm font-black text-white uppercase tracking-[1em] mb-4"
            >
              Calendar
            </motion.h2>
            <motion.h3 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-6xl md:text-8xl font-black uppercase tracking-tighter"
            >
              Events
            </motion.h3>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-white/40 text-xs font-black uppercase tracking-[0.2em]">03 / Upcoming</p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-1 bg-white/10">
          {events.map((event, index) => (
            <EventCard key={index} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;
