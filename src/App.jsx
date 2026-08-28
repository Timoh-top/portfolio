import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Work from "./components/Work";
import Capabilities from "./components/Capabilities";
import Process from "./components/Process";
import CurrentlyBuilding from "./components/CurrentlyBuilding";
import About from "./components/About";
import FinalCTA from "./components/FinalCTA";
import CustomCursor from "./components/CustomCursor";
import PortalIntro from "./components/PortalIntro";
import { initLenis, destroyLenis, getLenis } from "./lib/lenis";
import { gsap, ScrollTrigger } from "./lib/gsap";
import "./index.css";

function App() {
  const [introActive, setIntroActive] = useState(true);

  useEffect(() => {
    const lenis = initLenis();

    if (lenis) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
      document.fonts.ready.then(() => ScrollTrigger.refresh());
      window.addEventListener("load", () => ScrollTrigger.refresh());
      lenis.stop();
    }

    return () => {
      destroyLenis();
      gsap.ticker.remove(getLenis);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", introActive);
    const lenis = getLenis();
    if (!lenis) return;
    if (introActive) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [introActive]);

  return (
    <>
      <CustomCursor />
      {introActive && <PortalIntro onComplete={() => setIntroActive(false)} />}
      <Navbar />
      <main>
        <Hero />
        <Work />
        <Capabilities />
        <Process />
        <CurrentlyBuilding />
        <About />
        <FinalCTA />
      </main>
    </>
  );
}

export default App;
