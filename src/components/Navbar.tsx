import PillNav from './bits/PillNav';

const Navbar = () => {
  const navItems = [
    { label: 'Home', to: 'home' },
    { label: 'About', to: 'about' },
    { label: 'Events', to: 'events' },
    { label: 'Team', to: 'team' },
    { label: 'Contact', to: 'contact' },
  ];

  return (
    <div className="flex justify-center w-full fixed top-0 z-50">
      {/* @ts-ignore */}
      <PillNav
        items={navItems}
        logo={null}
        baseColor="#ffffff"
        pillColor="#f3f4f6"
        pillTextColor="#000000"
        hoveredPillTextColor="#ffffff"
        className="mt-6 shadow-xl border border-black/5"
      />
    </div>
  );
};

export default Navbar;
