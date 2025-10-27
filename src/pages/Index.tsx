import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Problem from "@/components/Problem";
import Objectives from "@/components/Objectives";
import Methodology from "@/components/Methodology";
import BookBlock from "@/components/BookBlock";
import Outcomes from "@/components/Outcomes";
import Novelty from "@/components/Novelty";
import Team from "@/components/Team";
import Contact from "@/components/Contact";
import ImpactDashboard from "@/components/ImpactDashboard";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Problem />
      <Objectives />
      <Methodology />
      <BookBlock />
      <Outcomes />
      <Novelty />
      <ImpactDashboard />
      <Team />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
