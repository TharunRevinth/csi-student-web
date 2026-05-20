import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Stats from './components/Stats';
import Events from './components/Events';
import Team from './components/Team';
import Footer from './components/Footer';
import ScrollVelocity from './components/bits/ScrollVelocity';

function App() {
  return (
    <div className="bg-white selection:bg-black selection:text-white min-h-screen text-black">
      <Navbar />
      <main>
        <Hero />
        
        {/* @ts-ignore */}
        <ScrollVelocity texts={['INNOVATE', 'INSPIRE', 'DEVELOP', 'EMPOWER']} velocity={50} className="text-black/5 font-black text-9xl tracking-tighter" />

        <About />
        
        <Stats />
        
        {/* @ts-ignore */}
        <ScrollVelocity texts={['UPCOMING EVENTS', 'HACKATHONS', 'WORKSHOPS']} velocity={-40} className="text-black/5 py-10 font-black text-9xl tracking-tighter" />

        <Events />
        <Team />
      </main>
      <Footer />
    </div>
  );
}

export default App;
