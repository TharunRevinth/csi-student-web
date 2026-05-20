import { motion } from 'framer-motion';
import ProfileCard from './bits/ProfileCard';

const team = [
  {
    name: 'Dr. John Doe',
    role: 'Faculty Advisor',
    handle: 'johndoe',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60',
  },
  {
    name: 'Jane Smith',
    role: 'Chairperson',
    handle: 'janesmith',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60',
  },
  {
    name: 'Alex Johnson',
    role: 'Vice Chairperson',
    handle: 'alexj',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60',
  },
  {
    name: 'Sarah Williams',
    role: 'Technical Lead',
    handle: 'sarahw',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60',
  },
];

const Team = () => {
  return (
    <section id="team" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-24 text-center"
        >
          <h2 className="text-sm font-black text-black uppercase tracking-[1em] mb-4">Leadership</h2>
          <div className="w-24 h-1 bg-black mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 justify-items-center">
          {team.map((member, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="w-full"
            >
              {/* @ts-ignore */}
              <ProfileCard
                name={member.name}
                title={member.role}
                handle={member.handle}
                avatarUrl={member.image}
                behindGlowEnabled={true}
                behindGlowColor="rgba(0, 0, 0, 0.1)"
                behindGlowSize="60%"
                innerGradient="linear-gradient(145deg, #ffffff 0%, #f3f4f6 100%)"
                className="w-full grayscale hover:grayscale-0 transition-all duration-700"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
