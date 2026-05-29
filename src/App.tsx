import { ReactLenis } from 'lenis/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Stats from './components/Stats';
import Events from './components/Events';
import Memories from './components/Memories';
import Team from './components/Team';
import Footer from './components/Footer';
import ScrollVelocity from './components/bits/ScrollVelocity';
import CustomCursor from './components/bits/CustomCursor';
import { QuestProvider } from './components/bits/QuestContext';
import QuestStatus from './components/bits/QuestStatus';

function App() {
  return (
    <QuestProvider>
      <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
        <div className="bg-black selection:bg-white selection:text-black min-h-screen text-white">
          <CustomCursor />
          <Navbar />
          <main>
            <Hero />
            
            <div className="bg-black py-12">
              {/* @ts-expect-error - ScrollVelocity types missing */}
              <ScrollVelocity texts={['INNOVATE', 'INSPIRE', 'DEVELOP', 'EMPOWER']} velocity={80} className="text-white font-black text-3xl sm:text-5xl md:text-6xl lg:text-8xl tracking-tighter" />
            </div>

            <About />
            
            <Stats />
            
            <div className="bg-black py-12 mt-20">
              {/* @ts-expect-error - ScrollVelocity types missing */}
              <ScrollVelocity texts={['UPCOMING EVENTS', 'HACKATHONS', 'WORKSHOPS']} velocity={-60} className="text-white font-black text-3xl sm:text-5xl md:text-6xl lg:text-8xl tracking-tighter" />
            </div>

            <Events />
            
            <Memories />

            <Team />
          </main>
          <Footer />
          <QuestStatus />
        </div>
      </ReactLenis>
    </QuestProvider>
  );
}

export default App;
