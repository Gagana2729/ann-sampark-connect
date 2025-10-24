import { Leaf, Heart, BookOpen, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground/5 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-hero p-2 rounded-lg">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">AnnSampark</span>
            </div>
            <p className="text-foreground/70 mb-4 leading-relaxed">
              Smart redistribution of surplus food and books via online platform. 
              Building a sustainable community where no resource goes to waste.
            </p>
            <div className="flex items-center gap-2 text-primary">
              <Mail className="h-4 w-4" />
              <a href="mailto:annsampark@jitdavanagere.edu.in" className="hover:underline text-sm">
                annsampark@jitdavanagere.edu.in
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4 text-foreground">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: "About Us", href: "#about" },
                { name: "How It Works", href: "#methodology" },
                { name: "BookBlock", href: "#bookblock" },
                { name: "Our Team", href: "#team" },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-foreground/70 hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h4 className="font-bold mb-4 text-foreground">Get Involved</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-foreground/70 hover:text-primary transition-colors text-sm flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  Donate Food
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-primary transition-colors text-sm flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Donate Books
                </a>
              </li>
              <li>
                <a href="#contact" className="text-foreground/70 hover:text-primary transition-colors text-sm">
                  Register as NGO
                </a>
              </li>
              <li>
                <a href="#contact" className="text-foreground/70 hover:text-primary transition-colors text-sm">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-foreground/70 text-center md:text-left">
              © {currentYear} AnnSampark. A project by students of Computer Science & Engineering,<br className="hidden md:block" /> 
              Jain Institute of Technology, Davanagere.
            </p>
            <div className="flex gap-4">
              {["LinkedIn", "Instagram", "Twitter"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-300"
                  aria-label={social}
                >
                  <span className="text-xs font-bold">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
