import { Target, Eye, Heart } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 gradient-text">About AnnSampark</h2>
            <div className="w-24 h-1 bg-gradient-hero mx-auto rounded-full" />
          </div>

          {/* Mission & Vision Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Mission Card */}
            <div className="glass rounded-2xl p-8 hover-lift animate-slide-in-left">
              <div className="bg-gradient-hero p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">Our Mission</h3>
              <p className="text-foreground/80 leading-relaxed text-lg">
                To minimize food and resource waste by connecting surplus donors with people in need 
                through a smart online platform. We believe every meal matters and every book can 
                change a life.
              </p>
            </div>

            {/* Vision Card */}
            <div className="glass rounded-2xl p-8 hover-lift animate-slide-in-right">
              <div className="bg-gradient-hero p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Eye className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">Our Vision</h3>
              <p className="text-foreground/80 leading-relaxed text-lg">
                To build a sustainable community where no food or knowledge goes to waste. 
                We envision a world where technology bridges the gap between abundance and need, 
                creating lasting social impact.
              </p>
            </div>
          </div>

          {/* Values Section */}
          <div className="glass rounded-2xl p-8 md:p-12 animate-fade-in-up">
            <div className="text-center mb-8">
              <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">Our Values</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-3">🌱</div>
                <h4 className="font-semibold text-lg mb-2 text-foreground">Sustainability</h4>
                <p className="text-foreground/70">Reducing waste for a healthier planet</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🤝</div>
                <h4 className="font-semibold text-lg mb-2 text-foreground">Community</h4>
                <p className="text-foreground/70">Building connections that matter</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">💡</div>
                <h4 className="font-semibold text-lg mb-2 text-foreground">Innovation</h4>
                <p className="text-foreground/70">Smart solutions for social good</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
