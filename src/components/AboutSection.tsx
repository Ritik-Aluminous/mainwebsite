import { Award, Users, Building2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLeadForm } from "@/contexts/LeadFormContext";

const highlights = [
  { icon: Award, label: "Since 1995", desc: "Over 30+ years of trusted expertise in fenestration." },
  { icon: Users, label: "10,000+ Clients", desc: "Homes and businesses across India trust Aluminous." },
  { icon: Building2, label: "Premium Fabrication", desc: "State-of-the-art manufacturing for flawless finish." },
  { icon: Shield, label: "Quality Assured", desc: "Rigorous quality checks at every stage of production." },
];

const AboutSection = () => {
  const { openLeadForm } = useLeadForm();

  return (
    <section id="about" className="px-4 py-10 md:px-8 md:py-16 lg:px-16 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-8 md:mb-10">
          <span className="text-sm font-bold uppercase tracking-widest text-primary font-heading">About Us</span>
          <h2 className="section-title mt-2">
            Crafting Excellence{" "}
            <span className="text-gradient">Since 1995</span>
          </h2>
          <p className="section-subtitle mt-3 max-w-3xl mx-auto">
            Aluminous is a leading fabricator of premium Aluminium and uPVC windows and doors based in Faridabad, Haryana.
            With decades of experience, we deliver world-class fenestration solutions that combine durability, aesthetics, and energy efficiency.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
          {highlights.map((item) => (
            <div
              key={item.label}
              className="bg-card rounded-2xl border p-6 text-center hover:shadow-[var(--shadow-elevated)] transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4">
                <item.icon className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-bold font-heading text-foreground mb-2">{item.label}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mb-8">
          <Button onClick={openLeadForm} size="lg" className="gradient-primary text-primary-foreground font-heading font-bold text-lg px-8 h-14 shadow-lg hover:shadow-xl transition-shadow">
            Get a Quote
          </Button>
        </div>

        <div className="bg-secondary rounded-2xl p-6 md:p-10">
          <div className="grid md:grid-cols-3 gap-8 items-start">
            <div>
              <h3 className="text-2xl font-bold font-heading text-foreground mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To be India's most trusted and innovative fenestration company, setting new benchmarks in quality, sustainability, and customer satisfaction across every project we undertake.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold font-heading text-foreground mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                To provide India with world-class aluminium and uPVC fenestration solutions that enhance
                the beauty, comfort, and energy efficiency of every space we touch.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We are committed to innovation, precision fabrication, and delivering exceptional value
                to our customers — from design consultation to flawless installation.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold font-heading text-foreground mb-4">Why Aluminous?</h3>
              <ul className="space-y-3 text-muted-foreground text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">✓</span>
                  In-house fabrication with German technology
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">✓</span>
                  Comprehensive product range — Aluminium & uPVC
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">✓</span>
                  End-to-end service: Design, Fabrication & Installation
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">✓</span>
                  Trusted by 10,000+ residential & commercial clients
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">✓</span>
                  After-sales support and maintenance services
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
