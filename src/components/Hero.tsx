import { motion } from 'framer-motion';
import Grainient from './bits/Grainient';
import Shuffle from './bits/Shuffle';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 bg-white overflow-hidden">
      {/* Background Grainient in Monochrome */}
      <div className="absolute inset-0 z-0">
        {/* @ts-ignore */}
        <Grainient
          color1="#ffffff"
          color2="#f3f4f6"
          color3="#e5e7eb"
          timeSpeed={0.1}
          warpStrength={0.3}
          zoom={1.0}
          grainAmount={0.3}
        />
        <div className="absolute inset-0 bg-white/20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <div className="mb-8">
          <div className="flex flex-col items-center">
            {/* @ts-ignore */}
            <Shuffle
              text="CSI"
              tag="h1"
              className="text-[12rem] md:text-[16rem] font-black text-black leading-none tracking-tighter"
              shuffleDirection="down"
              duration={1}
              stagger={0.1}
              colorTo="#000000"
            />
            {/* @ts-ignore */}
            <Shuffle
              text="Computer Society of India"
              tag="h2"
              className="text-xl md:text-3xl font-medium text-black/60 uppercase tracking-[0.3em] mt-[-2rem]"
              shuffleDirection="right"
              duration={0.6}
              stagger={0.03}
              colorTo="#000000"
            />
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="inline-block px-8 py-2 border-2 border-black mt-12"
          >
            <h1 className="text-3xl md:text-5xl font-black text-black uppercase tracking-widest">
              VIT Chennai
            </h1>
          </motion.div>
        </div>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-xl text-black/70 mb-12 max-w-2xl mx-auto font-light leading-relaxed"
        >
          Advancing computer science and information technology through innovation, excellence, and community.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex flex-col sm:flex-row justify-center gap-6"
        >
          <button className="bg-black text-white px-10 py-4 font-bold transition-all hover:invert">
            EXPLORE EVENTS
          </button>
          <button className="border-2 border-black text-black px-10 py-4 font-bold transition-all hover:bg-black hover:text-white">
            JOIN THE TEAM
          </button>
        </motion.div>
      </div>

      {/* Animated Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-black text-xs font-bold uppercase tracking-[0.5em]">Scroll</span>
        <div className="w-[1px] h-16 bg-black"></div>
      </motion.div>
    </section>
  );
};

export default Hero;
