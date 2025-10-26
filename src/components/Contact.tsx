import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Building2, Users, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "general",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. We'll get back to you soon.",
    });
    setFormData({ name: "", email: "", type: "general", message: "" });
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
              Get In Touch
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Have questions or want to join our mission? We'd love to hear from you
            </p>
            <div className="w-24 h-1 bg-gradient-hero mx-auto mt-6 rounded-full" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="animate-slide-in-left">
              <Card className="glass">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6 text-foreground">Send Us a Message</h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">Full Name</label>
                      <Input
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">Email Address</label>
                      <Input
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">I want to...</label>
                      <select
                        className="w-full px-4 py-2 rounded-md border border-input bg-background"
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      >
                        <option value="general">General Inquiry</option>
                        <option value="donor">Become a Donor</option>
                        <option value="ngo">Register as NGO/Charity</option>
                        <option value="partner">Partnership Opportunity</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">Message</label>
                      <Textarea
                        placeholder="Tell us more about your inquiry..."
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                      />
                    </div>
                    <Button variant="hero" size="lg" className="w-full" type="submit">
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info & Quick Links */}
            <div className="space-y-6 animate-slide-in-right">
              {/* Email Contact */}
              <Card className="glass hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-hero p-4 rounded-xl shrink-0">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-2 text-foreground">Email Us</h4>
                      <a
                        href="mailto:annsampark@jitdavanagere.edu.in"
                        className="text-primary hover:underline"
                      >
                        annsampark@jitdavanagere.edu.in
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* NGO Registration */}
              <Card className="glass hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-hero p-4 rounded-xl shrink-0">
                      <Building2 className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-2 text-foreground">For NGOs & Charities</h4>
                      <p className="text-sm text-foreground/70 mb-3">
                        Register your organization to receive donations
                      </p>
                      <Link to="/auth">
                        <Button variant="outline" size="sm">
                          Register Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Donor Registration */}
              <Card className="glass hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-hero p-4 rounded-xl shrink-0">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-2 text-foreground">For Donors</h4>
                      <p className="text-sm text-foreground/70 mb-3">
                        Start making a difference by donating surplus resources
                      </p>
                      <Link to="/auth">
                        <Button variant="outline" size="sm">
                          Sign Up to Donate
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card className="glass">
                <CardContent className="p-6">
                  <h4 className="font-bold mb-4 text-foreground">Connect With Us</h4>
                  <div className="flex gap-4">
                    {["linkedin", "instagram", "twitter"].map((social) => (
                      <a
                        key={social}
                        href="#"
                        className="bg-primary/10 hover:bg-primary hover:text-primary-foreground text-primary w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300"
                      >
                        <span className="capitalize text-xs font-bold">
                          {social[0].toUpperCase()}
                        </span>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
