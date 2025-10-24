import { Globe, TrendingUp, Users, Activity } from "lucide-react";

const Outcomes = () => {
  const outcomes = [
    {
      icon: Globe,
      title: "Unified Platform",
      description: "Single ecosystem for both food and book donations with seamless integration",
    },
    {
      icon: TrendingUp,
      title: "Transparent Tracking",
      description: "End-to-end visibility with real-time updates and delivery confirmation",
    },
    {
      icon: Users,
      title: "Community Growth",
      description: "Increased participation from donors, NGOs, and beneficiaries nationwide",
    },
    {
      icon: Activity,
      title: "Measurable Impact",
      description: "Data-driven insights on environmental and social impact metrics",
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
              Expected Outcomes
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Tangible results we aim to achieve through AnnSampark's innovative platform
            </p>
            <div className="w-24 h-1 bg-gradient-hero mx-auto mt-6 rounded-full" />
          </div>

          {/* Outcomes Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {outcomes.map((outcome, index) => (
              <div
                key={index}
                className="glass rounded-2xl p-8 hover-lift animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-6">
                  <div className="bg-gradient-hero p-4 rounded-xl shrink-0">
                    <outcome.icon className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-foreground">
                      {outcome.title}
                    </h3>
                    <p className="text-foreground/70 leading-relaxed">
                      {outcome.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Impact Metrics */}
          <div className="mt-16 glass rounded-2xl p-8 md:p-12 animate-fade-in-up">
            <h3 className="text-2xl font-bold text-center mb-8 text-foreground">
              Long-term Vision
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">100%</div>
                <p className="text-foreground/70">Digital transformation of donation processes</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">50K+</div>
                <p className="text-foreground/70">Lives impacted annually through our platform</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">Zero</div>
                <p className="text-foreground/70">Waste vision for surplus food and books</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Outcomes;
