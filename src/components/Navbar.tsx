import PillNav from './bits/PillNav';

const Navbar = () => {
  const navItems = [
    { label: 'Home', to: 'home' },
    { label: 'About', to: 'about' },
    { label: 'Events', to: 'events' },
    { label: 'Memories', to: 'memories' },
    { label: 'Team', to: 'team' },
    { label: 'Contact', to: 'contact' },
  ];

  return (
    <div className="flex justify-center w-full fixed top-0 z-50">
      {/* @ts-ignore */}
      <PillNav
        items={navItems}
        baseColor="#000000"
        pillColor="#111111"
        pillTextColor="#ffffff"
        hoverPillBgColor="#ffffff"
        hoveredPillTextColor="#000000"
        className="mt-6 shadow-[0_0_30px_rgba(255,255,255,0.1)] border border-white/10"
      />
    </div>
  );
};

export default Navbar;
