import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Utensils, BookOpen, Users, Leaf } from "lucide-react";

const ImpactDashboard = () => {
  const [counts, setCounts] = useState({
    meals: 0,
    books: 0,
    ngos: 0,
    co2: 0,
  });

  const targets = {
    meals: 45620,
    books: 12450,
    ngos: 87,
    co2: 3420,
  };

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setCounts({
        meals: Math.floor(targets.meals * progress),
        books: Math.floor(targets.books * progress),
        ngos: Math.floor(targets.ngos * progress),
        co2: Math.floor(targets.co2 * progress),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounts(targets); // Ensure we hit exact target
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const stats = [
    {
      icon: Utensils,
      label: "Meals Donated",
      value: counts.meals.toLocaleString(),
      suffix: "+",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: BookOpen,
      label: "Books Shared",
      value: counts.books.toLocaleString(),
      suffix: "+",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Users,
      label: "NGOs Registered",
      value: counts.ngos,
      suffix: "+",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Leaf,
      label: "CO₂ Saved (kg)",
      value: counts.co2.toLocaleString(),
      suffix: "+",
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 gradient-text">
              Our Impact
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real-time statistics showing the positive change we're creating together
            </p>
            <div className="w-24 h-1 bg-gradient-hero mx-auto mt-6 rounded-full" />
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="glass hover-lift animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className={`bg-gradient-to-br ${stat.color} p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center`}>
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                    {stat.value}
                    <span className="text-primary">{stat.suffix}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Impact Visualization */}
          <div className="glass rounded-2xl p-8 md:p-12 animate-fade-in-up">
            <h3 className="text-2xl font-bold text-center mb-8 text-foreground">
              Monthly Growth Trend
            </h3>
            <div className="space-y-6">
              {[
                { month: "January", food: 85, books: 70 },
                { month: "February", food: 92, books: 78 },
                { month: "March", food: 88, books: 85 },
              ].map((data, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm font-medium text-foreground">
                    <span>{data.month}</span>
                    <span className="text-muted-foreground">Growth %</span>
                  </div>
                  <div className="space-y-2">
                    <div className="relative">
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-foreground/70 w-12">Food</span>
                        <div className="flex-1 h-8 bg-muted/30 rounded-lg overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-lg transition-all duration-1000 flex items-center justify-end pr-3"
                            style={{ width: `${data.food}%` }}
                          >
                            <span className="text-xs font-bold text-white">{data.food}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-foreground/70 w-12">Books</span>
                        <div className="flex-1 h-8 bg-muted/30 rounded-lg overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg transition-all duration-1000 flex items-center justify-end pr-3"
                            style={{ width: `${data.books}%` }}
                          >
                            <span className="text-xs font-bold text-white">{data.books}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactDashboard;
