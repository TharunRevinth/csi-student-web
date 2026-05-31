import { motion } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';
import Shuffle from './bits/Shuffle';
import TerminalJoin from './bits/TerminalJoin';
import SourceCodeStream from './bits/SourceCodeStream';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden pt-24 md:pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 bg-black">
        <SourceCodeStream opacity={0.6} speed={1.2} />
        {/* Subtle white radial glow for depth without color */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.06)_0%,transparent_70%)]" />
      </div>

      {/* Main Content Container - Using padding and flex to manage space without absolute overlaps */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 flex flex-col items-center w-full py-12">
        {/* Logos in Hero - Balanced sizing and margin for Navbar clearance */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-4 sm:gap-12 mb-8 md:mb-16 mt-4 md:mt-0"
        >
          <img src="/assets/csi-logo.png" alt="CSI Logo" className="h-10 sm:h-20 md:h-28 object-contain filter drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
          <div className="w-[1px] h-8 sm:h-16 bg-white/20"></div>
          <img src="/assets/vit-logo.png" alt="VIT Logo" className="h-10 sm:h-20 md:h-28 object-contain brightness-0 invert opacity-90 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
        </motion.div>

        <div className="mb-8 md:mb-12">
          <div className="flex flex-col items-center">
            {/* @ts-expect-error - Shuffle component types are currently loose */}
            <Shuffle
              text="CSI"
              tag="h1"
              className="text-5xl sm:text-7xl md:text-[10rem] lg:text-[14rem] font-black text-white leading-none tracking-tight sm:tracking-tighter"
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
              className="text-base sm:text-2xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-[0.2em] sm:tracking-[0.3em] mt-2 md:mt-4 py-2 md:py-4 border-y-[1px] sm:border-y-4 border-white"
              shuffleDirection="right"
              duration={0.8}
              stagger={0.05}
              shuffleTimes={2}
            />
            {/* @ts-expect-error - Shuffle component types are currently loose */}
            <Shuffle
              text="Computer Society of India"
              tag="p"
              className="text-[9px] sm:text-xs md:text-lg lg:text-xl font-medium text-white/50 uppercase tracking-[0.15em] sm:tracking-[0.4em] mt-4 md:mt-8"
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
          className="text-sm md:text-xl text-white/70 mb-10 md:mb-16 max-w-2xl mx-auto font-light leading-relaxed px-4"
        >
          Advancing computer science and information technology through innovation, excellence, and community.
        </motion.p>
        
        {/* Horizontal on mobile, and added bottom margin for Desktop spacing */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.7 }}
          className="flex flex-row justify-center items-center gap-2 sm:gap-6 w-full sm:w-auto mb-16 md:mb-32"
        >
          <ScrollLink 
            to="events" 
            smooth={true} 
            duration={500} 
            offset={-70}
            className="flex-1 sm:flex-none bg-white text-black px-4 sm:px-10 py-4 md:py-5 font-black transition-all hover:bg-white/80 text-[10px] sm:text-sm tracking-[0.1em] sm:tracking-[0.2em] uppercase cursor-pointer text-center"
          >
            EXPLORE EVENTS
          </ScrollLink>
          <div className="flex-1 sm:flex-none">
            <TerminalJoin />
          </div>
        </motion.div>

        {/* Mobile-only Easter Egg Hook - Redesigned to stay in flow and avoid overlaps */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="md:hidden mt-8 px-6 py-5 border border-white/20 bg-white/[0.05] backdrop-blur-md relative w-full max-w-[320px] mx-auto text-left"
        >
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 bg-white rounded-full animate-ping flex-shrink-0"></div>
            <div>
              <div className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em] mb-1">System Objective</div>
              <div className="text-sm font-black text-white uppercase tracking-widest leading-tight">RECONSTRUCT THE SOURCE</div>
            </div>
          </div>
          <p className="text-[10px] text-white/30 uppercase tracking-wider mt-4 leading-relaxed font-medium">
            3 binary fragments are scattered. Find them all to bypass security.
          </p>
        </motion.div>

        {/* Mobile-only Scroll Indicator - Integrated into the flow to prevent overlap */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="md:hidden mt-16 flex flex-col items-center gap-4"
        >
          <span className="text-white/40 text-[10px] font-black uppercase tracking-[0.8em] ml-[0.8em]">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/60 to-transparent"></div>
        </motion.div>
      </div>

      {/* Desktop-only Absolute Elements - Maintained for large screens */}
      <div className="hidden md:block">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="absolute bottom-12 left-8 z-20 max-w-xs group cursor-default"
        >
          <div className="relative p-6 border border-white/20 bg-black/60 backdrop-blur-xl">
            <div className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-white/60 group-hover:w-full group-hover:h-full transition-all duration-700"></div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
              <div className="text-[11px] font-black text-white/60 uppercase tracking-[0.3em]">Priority Objective</div>
            </div>
            <div className="text-base font-black text-white uppercase tracking-widest mb-3">RECONSTRUCT THE SOURCE</div>
            <div className="text-[11px] text-white/40 font-medium uppercase tracking-wider leading-relaxed">
              3 binary fragments are scattered. Find them all to bypass security and access classified mainframe intel.
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
        >
          <span className="text-white/40 text-[10px] font-black uppercase tracking-[0.8em] ml-[0.8em]">Scroll</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-white/60 to-transparent"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
