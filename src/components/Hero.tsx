import { Button } from "@/components/ui/button";
import { ArrowDown, Heart, BookOpen, Users } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Community food and book donation" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-accent/80 to-primary/90" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-float hidden lg:block">
        <div className="glass p-4 rounded-full">
          <Heart className="h-8 w-8 text-primary" />
        </div>
      </div>
      <div className="absolute top-40 right-20 animate-float hidden lg:block" style={{ animationDelay: "1s" }}>
        <div className="glass p-4 rounded-full">
          <BookOpen className="h-8 w-8 text-primary" />
        </div>
      </div>
      <div className="absolute bottom-40 left-20 animate-float hidden lg:block" style={{ animationDelay: "2s" }}>
        <div className="glass p-4 rounded-full">
          <Users className="h-8 w-8 text-primary" />
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            AnnSampark
          </h1>
          <p className="text-2xl md:text-3xl text-white/90 mb-4 font-light">
            Smart Redistribution of Surplus Food & Books
          </p>
          <p className="text-lg md:text-xl text-white/80 mb-12 max-w-2xl mx-auto">
            Connecting restaurants, donors, and readers for a zero-waste future. 
            Join us in building a sustainable community where no food or knowledge goes to waste.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <Link to="/auth">
              <Button variant="glass" size="lg" className="text-lg px-8 py-6">
                <Heart className="mr-2 h-5 w-5" />
                Donate Food
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant="glass" size="lg" className="text-lg px-8 py-6">
                <BookOpen className="mr-2 h-5 w-5" />
                Donate Books
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant="glass" size="lg" className="text-lg px-8 py-6">
                <Users className="mr-2 h-5 w-5" />
                Join as NGO
              </Button>
            </Link>
          </div>

          {/* Scroll Indicator */}
          <div className="mt-16 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <a href="#about" className="inline-flex flex-col items-center text-white/80 hover:text-white transition-colors group">
              <span className="text-sm mb-2">Scroll to Explore</span>
              <ArrowDown className="h-6 w-6 animate-bounce" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
