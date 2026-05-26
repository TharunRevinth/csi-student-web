import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import './TeamAccordion.css';

const TeamItem = ({ member, isExpanded, onExpand, isDragging, isMobile = false }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { damping: 50, stiffness: 300 });
  const mouseYSpring = useSpring(y, { damping: 50, stiffness: 300 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current || isExpanded || isDragging) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (isMobile) {
    return (
      <div className="mobile-frame-item flex-shrink-0 w-[85vw] flex flex-col items-center">
        <div className="mobile-frame-box">
           <div className="absolute top-6 left-6 z-10 font-handwriting text-white/40 text-lg">
             member profile —
           </div>
           <div className="mobile-frame-inner">
             <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
           </div>
           <div className="absolute bottom-6 right-6 z-10 font-handwriting text-white/40 text-sm italic">
             CSI_CRAFT_V2
           </div>
        </div>
        
        <div className="mt-8 text-center px-4">
           <h3 className="text-3xl font-serif-editorial mb-2">{member.name}</h3>
           <p className="font-handwriting text-xl text-white/50 mb-6">{member.role}</p>
           <div className="w-12 h-[1px] bg-white/20 mx-auto mb-6"></div>
           <p className="text-lg font-serif-editorial italic text-white/70 leading-relaxed">
             "{member.quote}"
           </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={`team-item hidden sm:flex ${isExpanded ? 'expanded' : 'collapsed'}`}
      onMouseEnter={() => !isDragging && onExpand()}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => !isDragging && onExpand()}
      style={{
        rotateX: isExpanded ? 0 : rotateX,
        rotateY: isExpanded ? 0 : rotateY,
        transformStyle: "preserve-3d",
      }}
      layout
      transition={{ type: 'spring', stiffness: 200, damping: 25, mass: 1 }}
    >
      <div className="team-item-content">
        <div className="image-container">
          <img src={member.image} alt={member.name} className="member-image" draggable={false} />
          <div className="image-overlay" />
          {!isExpanded && (
             <motion.div className="collapsed-info" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
               <span className="vertical-name">{member.name}</span>
             </motion.div>
          )}
        </div>
        
        <AnimatePresence mode="wait">
          {isExpanded && (
            <motion.div 
              className="member-details"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.6 }}
            >
              <div className="details-inner">
                <div className="info-line" />
                <p className="member-quote">{member.quote}</p>
                <div className="member-info">
                  <h3 className="member-name">— {member.name}</h3>
                  <p className="member-role">{member.role}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const TeamAccordion = ({ members }) => {
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });
  const [mobileConstraints, setMobileConstraints] = useState({ left: 0, right: 0 });
  
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const mobileScrollRef = useRef(null);

  useEffect(() => {
    const updateConstraints = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        if (scrollRef.current) {
          setConstraints({ left: -(scrollRef.current.scrollWidth - containerWidth + 64), right: 0 });
        }
        if (mobileScrollRef.current) {
          setMobileConstraints({ left: -(mobileScrollRef.current.scrollWidth - containerWidth + 32), right: 0 });
        }
      }
    };

    updateConstraints();
    window.addEventListener('resize', updateConstraints);
    return () => window.removeEventListener('resize', updateConstraints);
  }, [members]);

  return (
    <div className="team-accordion-wrapper" ref={containerRef}>
      {/* Desktop Grid Layout (Hidden on Mobile) */}
      <motion.div 
        ref={scrollRef}
        className="team-accordion hidden sm:flex"
        drag="x"
        dragConstraints={constraints}
        dragElastic={0.2}
        dragTransition={{ power: 0.5, timeConstant: 100 }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setTimeout(() => setIsDragging(false), 50)}
      >
        {members.map((member, index) => (
          <TeamItem 
            key={index} 
            member={member} 
            isExpanded={expandedIndex === index} 
            onExpand={() => setExpandedIndex(index)}
            isDragging={isDragging}
          />
        ))}
      </motion.div>

      {/* Mobile Horizontal Scroll Layout (Visible only on Mobile) */}
      <motion.div 
        ref={mobileScrollRef}
        className="sm:hidden mobile-scroll-container"
        drag="x"
        dragConstraints={mobileConstraints}
        dragElastic={0.2}
        dragTransition={{ power: 0.8, timeConstant: 200 }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setTimeout(() => setIsDragging(false), 50)}
      >
        {members.map((member, index) => (
          <TeamItem 
            key={index} 
            member={member} 
            isMobile={true}
          />
        ))}
      </motion.div>
      
      <div className="drag-hint flex items-center justify-center gap-4 mt-12 opacity-30">
        <span className="w-12 h-[1px] bg-white"></span>
        <span className="text-[10px] font-black uppercase tracking-widest">Drag to explore team</span>
        <span className="w-12 h-[1px] bg-white"></span>
      </div>
    </div>
  );
};

export default TeamAccordion;
