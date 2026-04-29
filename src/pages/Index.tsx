import { useEffect, useState } from "react";
import BootLoader from "@/components/BootLoader";
import CursorGlow from "@/components/CursorGlow";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    if (booted) document.body.style.overflow = "";
    else document.body.style.overflow = "hidden";
  }, [booted]);

  return (
    <>
      {!booted && <BootLoader onDone={() => setBooted(true)} />}
      <CursorGlow />
      <main className="relative">
        <Nav />
        <Hero />
        <About />
        <Projects />
        <Contact />
        <Footer />
      </main>
    </>
  );
};

export default Index;
