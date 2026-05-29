import { motion } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';
import Shuffle from './bits/Shuffle';
import TerminalJoin from './bits/TerminalJoin';
import SourceCodeStream from './bits/SourceCodeStream';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 bg-black overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 bg-black">
        <SourceCodeStream opacity={0.6} speed={1.2} />
        {/* Subtle white radial glow for depth without color */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.06)_0%,transparent_70%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 py-20">
        {/* Logos in Hero - Balanced sizing */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-6 sm:gap-12 mb-16"
        >
          <img src="/assets/csi-logo.png" alt="CSI Logo" className="h-16 sm:h-20 md:h-28 object-contain filter drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
          <div className="w-[1px] h-12 sm:h-16 bg-white/20"></div>
          <img src="/assets/vit-logo.png" alt="VIT Logo" className="h-16 sm:h-20 md:h-28 object-contain brightness-0 invert opacity-90 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
        </motion.div>

        <div className="mb-12">
          <div className="flex flex-col items-center">
            {/* @ts-expect-error - Shuffle component types are currently loose */}
            <Shuffle
              text="CSI"
              tag="h1"
              className="text-7xl sm:text-[10rem] md:text-[12rem] lg:text-[16rem] font-black text-white leading-none tracking-tight sm:tracking-tighter"
              shuffleDirection="down"
              duration={1}
              stagger={0.1}
              shuffleTimes={3}
              triggerOnHover={true}
            />
            {/* @ts-expect-error - Shuffle component types are currently loose */}
            <Shuffle
              text="VIT CHENNAI"
              tag="h2"
              className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-[0.2em] sm:tracking-[0.3em] mt-4 py-3 border-y-2 sm:border-y-4 border-white"
              shuffleDirection="right"
              duration={0.8}
              stagger={0.05}
              shuffleTimes={2}
            />
            {/* @ts-expect-error - Shuffle component types are currently loose */}
            <Shuffle
              text="Computer Society of India"
              tag="p"
              className="text-[10px] sm:text-xs md:text-lg lg:text-xl font-medium text-white/50 uppercase tracking-[0.15em] sm:tracking-[0.4em] mt-8"
              shuffleDirection="up"
              duration={0.6}
              stagger={0.02}
              shuffleTimes={1}
            />
          </div>
        </div>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="text-lg md:text-xl text-white/60 mb-16 max-w-2xl mx-auto font-light leading-relaxed px-4"
        >
          Advancing computer science and information technology through innovation, excellence, and community.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.7 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-20"
        >
          <ScrollLink 
            to="events" 
            smooth={true} 
            duration={500} 
            offset={-70}
            className="bg-white text-black px-12 py-5 font-black transition-all hover:bg-white/80 text-sm tracking-[0.2em] uppercase cursor-pointer"
          >
            EXPLORE EVENTS
          </ScrollLink>
          <TerminalJoin />
        </motion.div>
      </div>

      {/* Animated Scroll Indicator - Moved down and styled */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
      >
        <span className="text-white/30 text-[10px] font-black uppercase tracking-[0.8em] ml-[0.8em]">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent"></div>
      </motion.div>
    </section>
  );
};

export default Hero;
