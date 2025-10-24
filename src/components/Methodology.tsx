import { UserPlus, Search, Truck, CheckCircle, BarChart2 } from "lucide-react";

const Methodology = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "Donor Registration",
      description: "Donors register and post available food or books through our platform",
      number: "01",
    },
    {
      icon: Search,
      title: "Smart Matching",
      description: "System intelligently matches with nearest charity, buyer, or person in need",
      number: "02",
    },
    {
      icon: Truck,
      title: "Delivery Pickup",
      description: "Delivery partner coordinates and collects the donation for transport",
      number: "03",
    },
    {
      icon: CheckCircle,
      title: "Recipient Confirmation",
      description: "Recipient receives donation and confirms successful delivery",
      number: "04",
    },
    {
      icon: BarChart2,
      title: "Impact Report",
      description: "Real-time tracking data and impact reports are generated automatically",
      number: "05",
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our streamlined methodology ensures efficient redistribution from donor to recipient
            </p>
            <div className="w-24 h-1 bg-gradient-hero mx-auto mt-6 rounded-full" />
          </div>

          {/* Flow Steps */}
          <div className="relative">
            {/* Connection Line - Desktop */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-hero transform -translate-y-1/2" 
                 style={{ top: "80px" }} />

            {/* Steps Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 relative z-10">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Step Number */}
                  <div className="text-6xl font-bold text-primary/20 mb-4">
                    {step.number}
                  </div>
                  
                  {/* Icon Circle */}
                  <div className="bg-gradient-hero p-6 rounded-full mb-6 hover-lift shadow-medium">
                    <step.icon className="h-10 w-10 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold mb-3 text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Features Highlight */}
          <div className="mt-20 grid md:grid-cols-3 gap-6 animate-fade-in-up">
            {[
              { emoji: "⚡", title: "Real-Time Updates", desc: "Live tracking at every step" },
              { emoji: "🤖", title: "AI-Powered Matching", desc: "Smart algorithms for optimal pairing" },
              { emoji: "📊", title: "Data Analytics", desc: "Comprehensive impact measurement" },
            ].map((feature, index) => (
              <div key={index} className="glass rounded-xl p-6 text-center hover-lift">
                <div className="text-4xl mb-3">{feature.emoji}</div>
                <h4 className="font-bold mb-2 text-foreground">{feature.title}</h4>
                <p className="text-sm text-foreground/70">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Methodology;
