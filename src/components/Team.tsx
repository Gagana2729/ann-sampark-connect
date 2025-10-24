import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Mail } from "lucide-react";

const Team = () => {
  const teamMembers = [
    { name: "ANU D K", id: "4JD22CS010", role: "Project Lead" },
    { name: "ARATI R H", id: "4JD22CS015", role: "Technical Architect" },
    { name: "CHETHANA P N", id: "4JD22CS026", role: "UI/UX Designer" },
    { name: "GAGANA G N", id: "4JD22CS035", role: "Backend Developer" },
  ];

  return (
    <section id="team" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 gradient-text">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Passionate students from Jain Institute of Technology, Davanagere working to make a difference
            </p>
            <div className="w-24 h-1 bg-gradient-hero mx-auto mt-6 rounded-full" />
          </div>

          {/* Team Members Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="glass hover-lift overflow-hidden animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  {/* Avatar */}
                  <div className="bg-gradient-hero p-8 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-3xl text-white font-bold">
                      {member.name.split(" ").map(n => n[0]).join("")}
                    </span>
                  </div>
                  
                  {/* Name & ID */}
                  <h3 className="text-lg font-bold mb-1 text-foreground">{member.name}</h3>
                  <p className="text-sm text-primary font-mono mb-2">{member.id}</p>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Institution Info */}
          <div className="glass rounded-2xl p-8 md:p-12 text-center animate-fade-in-up">
            <GraduationCap className="h-16 w-16 text-primary mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-3 text-foreground">
              Jain Institute of Technology
            </h3>
            <p className="text-lg text-muted-foreground mb-2">
              Department of Computer Science & Engineering
            </p>
            <p className="text-muted-foreground">
              Davanagere, Karnataka
            </p>
            <div className="mt-6 flex items-center justify-center gap-2 text-primary">
              <Mail className="h-5 w-5" />
              <a href="mailto:annsampark@jitdavanagere.edu.in" className="font-medium hover:underline">
                annsampark@jitdavanagere.edu.in
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
