import { motion } from 'framer-motion';
import { FaInstagram, FaLinkedinIn, FaXTwitter, FaFacebookF, FaGithub } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer id="contact" className="bg-black text-white pt-32 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-20 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-8xl font-black tracking-tighter mb-12">TALK TO US.</h2>
            <div className="flex gap-8">
              {[FaInstagram, FaLinkedinIn, FaGithub, FaXTwitter, FaFacebookF].map((Icon, i) => (
                <motion.a 
                  key={i} 
                  href="#" 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i, duration: 0.5 }}
                  className="text-white/40 hover:text-white transition-all transform hover:scale-125"
                >
                  <Icon size={32} />
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          <div className="grid grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-8 opacity-40">Navigate</h3>
              <ul className="space-y-4 text-xl font-bold">
                {['HOME', 'ABOUT', 'EVENTS', 'TEAM'].map((link) => (
                  <li key={link}>
                    <a href={`#${link.toLowerCase()}`} className="hover:line-through transition-all">{link}</a>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-8 opacity-40">Connect</h3>
              <ul className="space-y-4 text-xl font-bold">
                <li><a href="mailto:csi.vitc@vit.ac.in" className="hover:line-through transition-all">EMAIL</a></li>
                <li><a href="#" className="hover:line-through transition-all">LINKEDIN</a></li>
                <li><a href="#" className="hover:line-through transition-all">GITHUB</a></li>
                <li><a href="#" className="hover:line-through transition-all">INSTAGRAM</a></li>
              </ul>
            </motion.div>
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-8"
        >
          <p className="text-white/20 text-xs font-black tracking-[0.2em]">
            © 2024 CSI VIT CHENNAI. ALL RIGHTS RESERVED.
          </p>
          <p className="text-white/20 text-xs font-black tracking-[0.2em]">
            MADE WITH INTENT BY CSI VITC TECHNICAL TEAM
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
