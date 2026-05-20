import { motion } from 'framer-motion';

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
  'https://images.unsplash.com/photo-1558478551-1a378f63ad28?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1563089145-599997674d42?w=800&auto=format&fit=crop&q=60',
];

const Events = () => {
  return (
    <section id="events" className="py-32 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-24 flex items-end justify-between"
        >
          <div>
            <h2 className="text-sm font-black text-white uppercase tracking-[1em] mb-4">Calendar</h2>
            <h3 className="text-6xl font-black uppercase tracking-tighter">Events</h3>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-white/40 text-xs font-black uppercase tracking-[0.2em]">03 / Upcoming</p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-1 bg-white/10">
          {events.map((event, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-black text-white p-12 hover:bg-white hover:text-black transition-all duration-500 group relative overflow-hidden h-[500px] flex flex-col justify-end"
            >
              <img 
                src={pixelPlaceholders[index % 3]} 
                alt={event.title} 
                className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale group-hover:opacity-10 transition-opacity"
              />
              <div className="relative z-10">
                <div className="text-xs font-black tracking-[0.3em] mb-4 opacity-60 group-hover:text-black/60 transition-colors">{event.date}</div>
                <h3 className="text-3xl font-black mb-6 leading-none">{event.title}</h3>
                <p className="text-white/60 text-sm font-light mb-8 group-hover:text-black/80 transition-colors">
                  {event.description}
                </p>
                <div className="w-12 h-1 bg-white group-hover:bg-black transition-colors"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;
