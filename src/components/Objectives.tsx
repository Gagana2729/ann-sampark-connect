import { Target, TrendingUp, Users, BarChart } from "lucide-react";

const Objectives = () => {
  const objectives = [
    {
      icon: Target,
      title: "Easy-to-Use Platform",
      description: "Build an intuitive online platform that simplifies food and book donations for everyone.",
    },
    {
      icon: TrendingUp,
      title: "Transparent Tracking",
      description: "Enable real-time tracking of donations from donor to recipient for complete transparency.",
    },
    {
      icon: Users,
      title: "Community Engagement",
      description: "Encourage sustainable habits and active participation among communities and organizations.",
    },
    {
      icon: BarChart,
      title: "Measurable Impact",
      description: "Connect people through a shared cause while measuring and reporting social impact metrics.",
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 gradient-text">Our Objectives</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Clear goals driving our mission to create a zero-waste, socially responsible ecosystem
            </p>
            <div className="w-24 h-1 bg-gradient-hero mx-auto mt-6 rounded-full" />
          </div>

          {/* Objectives Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {objectives.map((objective, index) => (
              <div
                key={index}
                className="glass rounded-2xl p-8 hover-lift animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-6">
                  <div className="bg-gradient-hero p-4 rounded-xl shrink-0">
                    <objective.icon className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-foreground">
                      {objective.title}
                    </h3>
                    <p className="text-foreground/70 leading-relaxed">
                      {objective.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Objectives;
