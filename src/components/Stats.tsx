import { motion } from 'framer-motion';

const stats = [
  { label: 'Events Conducted', value: '50+' },
  { label: 'Students Impacted', value: '2500+' },
  { label: 'Core Members', value: '40+' },
  { label: 'Years of Excellence', value: '5+' },
];

const Stats = () => {
  return (
    <section className="py-32 bg-black text-white relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-6xl md:text-7xl font-black mb-4 tracking-tighter">{stat.value}</div>
              <div className="text-white/40 text-xs font-black uppercase tracking-[0.3em]">
                {stat.label}
              </div>
              <div className="w-12 h-1 bg-white mx-auto mt-6"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
