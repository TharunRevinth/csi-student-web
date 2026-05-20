import { motion } from 'framer-motion';
import TextReveal from './bits/TextReveal';
import ScrambledText from './bits/ScrambledText';
import clsx from 'clsx';

const About = () => {
  const revealText = "Computer Society of India student chapter at VIT Chennai is a premier technical community. We bridge academia and industry through high-impact workshops, hackathons, and innovative projects. Our goal is to empower the next generation of technology leaders."

  return (
    <section id="about" className="py-32 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2 className="text-sm font-black text-black uppercase tracking-[1em] mb-4">Core Identity</h2>
          <div className="w-full h-[2px] bg-black"></div>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-20 items-start">
          <div className="space-y-12">
            {/* @ts-ignore */}
            <TextReveal body={revealText} className="relative w-full h-[600px]">
              {(tokens: string[]) => (
                <div className="sticky top-40 flex items-center text-4xl md:text-5xl font-black leading-[1.1] tracking-tighter text-black h-full">
                  <div className="flex flex-wrap gap-x-4">
                    {tokens.map((token: string, index: number) => (
                      /* @ts-ignore */
                      <TextReveal.Token key={index} index={index}>
                        {(isActive: boolean) => (
                          <span
                            className={clsx(
                              {
                                "text-black opacity-100": isActive,
                                "text-black/5": !isActive,
                              },
                              "transition-all duration-500",
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
          
          <div className="space-y-20 pt-20">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="p-12 border-4 border-black relative"
            >
              {/* @ts-ignore */}
              <ScrambledText className="text-2xl md:text-3xl font-black text-black leading-tight uppercase">
                WE DEVELOP TO INSPIRE. WE INNOVATE TO EMPOWER. JOIN THE TECHNICAL REVOLUTION AT VIT CHENNAI.
              </ScrambledText>
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-black"></div>
            </motion.div>

            <div className="grid grid-cols-1 gap-12">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="group"
              >
                <h3 className="text-black font-black text-xl uppercase tracking-widest mb-4">Our Vision</h3>
                <p className="text-black/60 text-lg font-light leading-relaxed border-l-4 border-black pl-6 group-hover:pl-8 transition-all">
                  To build a community of innovators who can solve real-world problems using technology.
                </p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="group"
              >
                <h3 className="text-black font-black text-xl uppercase tracking-widest mb-4">Our Mission</h3>
                <p className="text-black/60 text-lg font-light leading-relaxed border-l-4 border-black pl-6 group-hover:pl-8 transition-all">
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
