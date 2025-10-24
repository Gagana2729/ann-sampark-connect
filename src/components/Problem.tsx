import { AlertCircle, Trash2, BookX, Link2Off } from "lucide-react";

const Problem = () => {
  const problems = [
    {
      icon: Trash2,
      title: "Food Wastage Crisis",
      description: "Tons of surplus food from restaurants and events end up in landfills while millions go hungry.",
      stat: "40% of food wasted",
      color: "from-red-500 to-orange-500",
    },
    {
      icon: BookX,
      title: "Book Disposal Issue",
      description: "Students discard valuable books after each semester, creating environmental waste and lost opportunities.",
      stat: "Millions discarded yearly",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Link2Off,
      title: "Coordination Gap",
      description: "Lack of efficient platforms to connect willing donors with charities and people in need.",
      stat: "87% coordination failure",
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <section id="problem" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-2 rounded-full mb-4">
              <AlertCircle className="h-5 w-5" />
              <span className="font-semibold">The Problem</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
              Challenges We Address
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Understanding the critical issues in food and resource distribution that AnnSampark aims to solve
            </p>
          </div>

          {/* Problem Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {problems.map((problem, index) => (
              <div
                key={index}
                className="glass rounded-2xl p-8 hover-lift animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`bg-gradient-to-br ${problem.color} p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6`}>
                  <problem.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">{problem.title}</h3>
                <p className="text-foreground/70 mb-4 leading-relaxed">
                  {problem.description}
                </p>
                <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-lg font-semibold">
                  {problem.stat}
                </div>
              </div>
            ))}
          </div>

          {/* Impact Timeline */}
          <div className="glass rounded-2xl p-8 md:p-12 animate-fade-in-up">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-12 text-foreground">
              The Impact of Waste
            </h3>
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-hero hidden md:block" />
              
              {/* Timeline Items */}
              <div className="space-y-12">
                {[
                  { title: "Environmental Impact", desc: "Food waste generates methane, a potent greenhouse gas" },
                  { title: "Social Impact", desc: "Resources wasted while communities face scarcity" },
                  { title: "Economic Impact", desc: "Billions lost in discarded food and unused books annually" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                  >
                    <div className="flex-1 text-right md:text-left">
                      <h4 className="text-xl font-bold mb-2 text-foreground">{item.title}</h4>
                      <p className="text-foreground/70">{item.desc}</p>
                    </div>
                    <div className="bg-gradient-hero p-3 rounded-full shrink-0 z-10">
                      <div className="w-6 h-6 bg-white rounded-full" />
                    </div>
                    <div className="flex-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;
