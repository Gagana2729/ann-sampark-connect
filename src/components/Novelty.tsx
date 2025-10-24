import { Sparkles, Activity, BarChart3, Zap } from "lucide-react";

const Novelty = () => {
  const features = [
    {
      icon: Sparkles,
      title: "Dual-Resource Platform",
      description: "First-of-its-kind ecosystem combining food and book redistribution in a single seamless platform",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Activity,
      title: "Real-Time Intelligence",
      description: "AI-powered matching and live tracking system ensuring optimal donor-recipient connections",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: BarChart3,
      title: "Impact Analytics",
      description: "Comprehensive data dashboard measuring environmental, social, and economic impact metrics",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Zap,
      title: "Sustainable Innovation",
      description: "Technology-driven solution addressing multiple UN Sustainable Development Goals simultaneously",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-muted/30 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
              <Sparkles className="h-5 w-5" />
              <span className="font-semibold">Innovation</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 gradient-text">
              What Makes Us Unique
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              AnnSampark brings groundbreaking innovation to the social impact sector through technology
            </p>
          </div>

          {/* Novelty Features Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className="glass rounded-2xl p-8 hover-lift animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`bg-gradient-to-br ${feature.gradient} p-4 rounded-xl w-16 h-16 flex items-center justify-center mb-6`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Key Differentiators */}
          <div className="glass rounded-2xl p-8 md:p-12 animate-fade-in-up">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-12 text-foreground">
              Key Differentiators
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-gradient-hero p-6 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl text-white">🎯</span>
                </div>
                <h4 className="font-bold mb-2 text-foreground">Integrated Approach</h4>
                <p className="text-sm text-foreground/70">Holistic solution addressing multiple resource types</p>
              </div>
              <div className="text-center">
                <div className="bg-gradient-hero p-6 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl text-white">🚀</span>
                </div>
                <h4 className="font-bold mb-2 text-foreground">Scalable Technology</h4>
                <p className="text-sm text-foreground/70">Built to grow from local to national impact</p>
              </div>
              <div className="text-center">
                <div className="bg-gradient-hero p-6 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl text-white">💚</span>
                </div>
                <h4 className="font-bold mb-2 text-foreground">Social Responsibility</h4>
                <p className="text-sm text-foreground/70">Purpose-driven mission with measurable outcomes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Novelty;
