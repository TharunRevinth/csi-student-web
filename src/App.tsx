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
    <div className="bg-black selection:bg-white selection:text-black min-h-screen text-white">
      <Navbar />
      <main>
        <Hero />
        
        <div className="bg-black py-12">
          {/* @ts-ignore */}
          <ScrollVelocity texts={['INNOVATE', 'INSPIRE', 'DEVELOP', 'EMPOWER']} velocity={80} className="text-white font-black text-4xl md:text-6xl lg:text-8xl tracking-tighter" />
        </div>

        <About />
        
        <Stats />
        
        <div className="bg-black py-12 mt-20">
          {/* @ts-ignore */}
          <ScrollVelocity texts={['UPCOMING EVENTS', 'HACKATHONS', 'WORKSHOPS']} velocity={-60} className="text-white font-black text-4xl md:text-6xl lg:text-8xl tracking-tighter" />
        </div>

        <Events />
        <Team />
      </main>
      <Footer />
    </div>
  );
}

export default App;
