import { motion } from 'framer-motion';
import TeamAccordion from './bits/TeamAccordion';
import QuestFragment from './bits/QuestFragment';

const team = [
  {
    name: 'Dr. John Doe',
    role: 'Faculty Advisor',
    handle: 'johndoe',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&auto=format&fit=crop&q=60',
    quote: 'Guiding the next generation of innovators through mentorship and academic excellence.',
    instagram: 'https://www.instagram.com/csi.vitc/'
  },
  {
    name: 'Jane Smith',
    role: 'Chairperson',
    handle: 'janesmith',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&auto=format&fit=crop&q=60',
    quote: 'Empowering students to build impactful solutions and lead with vision.',
    instagram: 'https://www.instagram.com/csi.vitc/'
  },
  {
    name: 'Alex Johnson',
    role: 'Vice Chairperson',
    handle: 'alexj',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=60',
    quote: 'Fostering a culture of collaboration and technical growth within the community.',
    instagram: 'https://www.instagram.com/csi.vitc/'
  },
  {
    name: 'Sarah Williams',
    role: 'Technical Lead',
    handle: 'sarahw',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60',
    quote: 'Driving technical excellence and exploring the frontiers of modern web development.',
    instagram: 'https://www.instagram.com/csi.vitc/'
  },
  {
    name: 'Michael Brown',
    role: 'Events Head',
    handle: 'mikeb',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60',
    quote: 'Creating memorable experiences that bridge the gap between learning and fun.',
    instagram: 'https://www.instagram.com/csi.vitc/'
  },
  {
    name: 'Emily Davis',
    role: 'Design Head',
    handle: 'emilyd',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60',
    quote: 'Crafting beautiful interfaces that tell a story and delight users.',
    instagram: 'https://www.instagram.com/csi.vitc/'
  }
];

const Team = () => {
  return (
    <section id="team" className="py-24 sm:py-40 bg-black text-white overflow-hidden relative">
      <QuestFragment index={2} className="absolute bottom-10 right-10" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-sm font-black text-white uppercase tracking-[0.5em] sm:tracking-[1em] mb-4"
          >
            TECHNICALS
          </motion.h2>
          <div className="w-24 h-1 bg-white mx-auto"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <TeamAccordion members={team} />
        </motion.div>
      </div>
    </section>
  );
};

export default Team;
