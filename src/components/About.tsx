import { motion } from 'framer-motion';
import TextReveal from './bits/TextReveal';
import ScrambledText from './bits/ScrambledText';
import clsx from 'clsx';

const About = () => {
  const revealText = "Computer Society of India student chapter at VIT Chennai is a premier technical community. We bridge academia and industry through high-impact workshops, hackathons, and innovative projects. Our goal is to empower the next generation of technology leaders."

  return (
    <section id="about" className="py-40 bg-black overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with clear separation */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <h2 className="text-sm font-black text-white uppercase tracking-[1em] mb-6">Core Identity</h2>
          <div className="w-full h-[1px] bg-white/20"></div>
        </motion.div>
        
        <div className="grid md:grid-cols-5 gap-12 lg:gap-20 items-start">
          {/* Main Text Reveal - Spanning 3 columns for better width */}
          <div className="md:col-span-3">
            {/* @ts-ignore */}
            <TextReveal body={revealText} className="relative w-full h-[800px]">
              {(tokens: string[]) => (
                <div className="sticky top-40 flex items-start text-4xl md:text-5xl lg:text-6xl font-black leading-[1.2] tracking-tighter text-white">
                  <div className="flex flex-wrap gap-x-3 gap-y-1">
                    {tokens.map((token: string, index: number) => (
                      /* @ts-ignore */
                      <TextReveal.Token key={index} index={index}>
                        {(isActive: boolean) => (
                          <span
                            className={clsx(
                              {
                                "text-white opacity-100": isActive,
                                "text-white/20": !isActive, // Increased inactive opacity from 5 to 20 for better legibility
                              },
                              "transition-all duration-300",
                            )}>
                            {token}
                          </span>
                        )}
                      </TextReveal.Token>
                    ))}
                  </div>
                </div>
              )}
            </TextReveal>
          </div>
          
          {/* Tagline and Vision/Mission - Spanning 2 columns */}
          <div className="md:col-span-2 space-y-24 pt-10">
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
      </div>
    </section>
  );
};

export default About;
