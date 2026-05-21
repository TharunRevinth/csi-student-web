import { useState, useRef, useEffect } from 'react';
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
  {
    title: 'WORKSHOP 101',
    date: 'APRIL 5, 2024',
    description: 'Mastering the basics of cloud computing.',
    type: 'WORKSHOP',
  },
  {
    title: 'DESIGN SPRINT',
    date: 'MAY 12, 2024',
    description: 'A deep dive into UI/UX design principles.',
    type: 'EVENT',
  },
];

const pixelPlaceholders = [
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1563089145-599997674d42?w=800&auto=format&fit=crop&q=60',
];

const EventCard = ({ event, index, isDragging }: { event: any, index: number, isDragging: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        transition: {
          duration: 0.8,
          delay: 0.1 * index,
          ease: [0.215, 0.61, 0.355, 1]
        }
      }}
      onViewportEnter={() => setIsInView(true)}
      viewport={{ once: true, margin: "-50px" }}
      onMouseEnter={() => !isDragging && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-black text-white group relative overflow-hidden h-[500px] w-[85vw] sm:w-[350px] md:w-[450px] flex-shrink-0 flex flex-col border border-white/5 select-none"
    >
      {/* PixelImage Integration */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <PixelImage 
          src={pixelPlaceholders[index % 3]} 
          active={isInView || isHovered}
          grid="8x8"
          grayscaleAnimation={false}
          pixelFadeInDuration={1200}
          maxAnimationDelay={1000}
          customGrid={undefined}
          className="w-full h-full opacity-40 group-hover:opacity-100 transition-opacity duration-1000"
        />
      </div>

      <div className="relative z-10 p-10 mt-auto bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 + (0.1 * index) }}
          className="text-xs font-black tracking-[0.3em] mb-4 opacity-60 group-hover:text-white transition-colors"
        >
          {event.date}
        </motion.div>
        
        <h3 className="text-2xl font-black mb-4 leading-none group-hover:tracking-wider transition-all duration-700">
          {event.title}
        </h3>
        
        <p className="text-white/60 text-sm font-light mb-6 group-hover:text-white transition-all duration-700 max-w-xs transform group-hover:translate-x-2">
          {event.description}
        </p>
        
        <div className="w-12 h-1 bg-white group-hover:w-full transition-all duration-1000"></div>
      </div>
    </motion.div>
  );
};

const Events = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateConstraints = () => {
      if (containerRef.current && scrollRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const scrollWidth = scrollRef.current.scrollWidth;
        setConstraints({ left: -(scrollWidth - containerWidth + 64), right: 0 });
      }
    };

    updateConstraints();
    window.addEventListener('resize', updateConstraints);
    return () => window.removeEventListener('resize', updateConstraints);
  }, []);

  return (
    <section id="events" className="py-32 bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        {/* Title with Scroll Reveal Effect */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-end justify-between"
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
              className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter"
            >
              Events
            </motion.h3>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-white/40 text-xs font-black uppercase tracking-[0.2em]">03 / Upcoming</p>
          </div>
        </motion.div>
      </div>

      <div className="relative px-4 sm:px-6 lg:px-8" ref={containerRef}>
        <motion.div 
          ref={scrollRef}
          drag="x"
          dragConstraints={constraints}
          dragElastic={0.2}
          dragMomentum={true}
          dragTransition={{ power: 0.5, timeConstant: 100 }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setTimeout(() => setIsDragging(false), 50)}
          className="flex gap-4 cursor-grab active:cursor-grabbing touch-action-none"
        >
          {events.map((event, index) => (
            <EventCard key={index} event={event} index={index} isDragging={isDragging} />
          ))}
        </motion.div>
      </div>

      <div className="mt-16 flex items-center justify-center gap-4 opacity-30">
        <span className="text-[10px] font-black tracking-[0.5em] uppercase">Drag to explore</span>
        <div className="w-20 h-[1px] bg-white"></div>
      </div>
    </section>
  );
};

export default Events;
