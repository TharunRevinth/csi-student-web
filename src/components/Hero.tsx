import { motion } from 'framer-motion';
import Grainient from './bits/Grainient';
import Shuffle from './bits/Shuffle';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 bg-black overflow-hidden">
      {/* Background Grainient in Dark Monochrome */}
      <div className="absolute inset-0 z-0">
        {/* @ts-ignore */}
        <Grainient
          color1="#000000"
          color2="#111111"
          color3="#222222"
          timeSpeed={0.1}
          warpStrength={0.3}
          zoom={1.0}
          grainAmount={0.3}
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        {/* Logos in Hero - Restoring CSI Original Color */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-6 mb-12"
        >
          <img src="/assets/csi-logo.png" alt="CSI Logo" className="h-16 md:h-20 object-contain shadow-lg" />
          <div className="w-[2px] h-12 bg-white/10"></div>
          <img src="/assets/vit-logo.png" alt="VIT Logo" className="h-16 md:h-20 object-contain grayscale brightness-200" />
        </motion.div>

        <div className="mb-8">
          <div className="flex flex-col items-center">
            {/* @ts-ignore */}
            <Shuffle
              text="CSI"
              tag="h1"
              className="text-[10rem] md:text-[14rem] font-black text-white leading-none tracking-tighter"
              shuffleDirection="down"
              duration={1}
              stagger={0.1}
            />
            {/* @ts-ignore */}
            <Shuffle
              text="VIT CHENNAI"
              tag="h2"
              className="text-4xl md:text-6xl font-black text-white uppercase tracking-[0.2em] mt-4 py-2 border-y-4 border-white"
              shuffleDirection="right"
              duration={0.8}
              stagger={0.05}
              delay={0.5}
            />
            {/* @ts-ignore */}
            <Shuffle
              text="Computer Society of India"
              tag="p"
              className="text-lg md:text-2xl font-medium text-white/60 uppercase tracking-[0.3em] mt-8"
              shuffleDirection="up"
              duration={0.6}
              stagger={0.02}
              delay={1}
            />
          </div>
        </div>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="text-xl text-white/70 mb-12 max-w-2xl mx-auto font-light leading-relaxed"
        >
          Advancing computer science and information technology through innovation, excellence, and community.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.7 }}
          className="flex flex-col sm:flex-row justify-center gap-6"
        >
          <button className="bg-white text-black px-10 py-4 font-bold transition-all hover:bg-white/90 text-sm tracking-widest">
            EXPLORE EVENTS
          </button>
          <button className="border-2 border-white text-white px-10 py-4 font-bold transition-all hover:bg-white hover:text-black text-sm tracking-widest">
            JOIN THE TEAM
          </button>
        </motion.div>
      </div>

      {/* Animated Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-white text-xs font-bold uppercase tracking-[0.5em]">Scroll</span>
        <div className="w-[1px] h-16 bg-white"></div>
      </motion.div>
    </section>
  );
};

export default Hero;
