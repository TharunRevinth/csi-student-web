import { motion } from 'framer-motion';
import TextReveal from './bits/TextReveal';
import ScrambledText from './bits/ScrambledText';

const About = () => {
  const revealText = "Computer Society of India student chapter at VIT Chennai is a premier technical community. We bridge academia and industry through high-impact workshops, hackathons, and innovative projects. Our goal is to empower the next generation of technology leaders."

  return (
    <section id="about" className="bg-black text-white">
      {/* Cinematic Text Reveal Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-sm font-black text-white uppercase tracking-[1em] mb-6">Core Identity</h2>
          <div className="w-full h-[1px] bg-white/20"></div>
        </motion.div>
        
        {/* Full width reveal for smoother experience and no grid-related gaps */}
        <TextReveal 
          body={revealText} 
          className="relative w-full h-[180vh]" 
          scrollRange={["start 0.5", "end 0.5"]}
        />
      </div>

      {/* Cards Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-40">
        <div className="grid md:grid-cols-2 gap-20 items-start">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="p-10 border border-white/20 bg-white/5 backdrop-blur-sm relative group hover:border-white transition-colors"
          >
            {/* @ts-ignore */}
            <ScrambledText className="text-xl md:text-2xl font-black text-white leading-snug uppercase">
              WE DEVELOP TO INSPIRE. WE INNOVATE TO EMPOWER. JOIN THE TECHNICAL REVOLUTION AT VIT CHENNAI.
            </ScrambledText>
            <div className="absolute -top-3 -right-3 w-8 h-8 bg-white"></div>
          </motion.div>

          <div className="grid grid-cols-1 gap-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-white font-black text-sm uppercase tracking-[0.5em] mb-6 opacity-40">Our Vision</h3>
              <p className="text-white/80 text-xl font-light leading-relaxed border-l-2 border-white pl-8">
                To build a community of innovators who can solve real-world problems using technology.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-white font-black text-sm uppercase tracking-[0.5em] mb-6 opacity-40">Our Mission</h3>
              <p className="text-white/80 text-xl font-light leading-relaxed border-l-2 border-white pl-8">
                To empower students with the right skills and opportunities to excel in the IT industry.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
