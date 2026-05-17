import { useState } from "react";
import { ArrowRight, Shield, Award, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";
import { useLeadForm } from "@/contexts/LeadFormContext";
import { useToast } from "@/hooks/use-toast";
import { submitLead } from "@/lib/lead-api";

const HeroSection = () => {
  const { openLeadForm } = useLeadForm();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [heroFormData, setHeroFormData] = useState({
    name: "",
    contactNumber: "",
    email: "",
    material: "",
  });

  const handleHeroSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitLead({
        name: heroFormData.name,
        contactNumber: heroFormData.contactNumber,
        email: heroFormData.email,
        material: heroFormData.material,
        remarks: "Submitted from hero section form",
      });

      toast({
        title: "Enquiry Submitted!",
        description: "Thank you! Our team will contact you shortly.",
      });
      setHeroFormData({
        name: "",
        contactNumber: "",
        email: "",
        material: "",
      });
    } catch (error) {
      console.error("Error submitting hero lead:", error);
      toast({
        title: "Submission Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBg} alt="Premium windows by Aluminious" className="w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0" style={{ background: "var(--hero-overlay)" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-24 pb-12 md:pt-28 md:pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-accent/20 backdrop-blur-sm border border-accent/30 rounded-full px-4 py-1.5 mb-6">
              <Clock className="h-4 w-4 text-accent" />
              <span className="text-sm font-semibold text-accent font-heading">Trusted Since 1995</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 font-heading text-primary-foreground">
              Premium uPVC &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 drop-shadow-[0_0_20px_rgba(251,191,36,0.5)]">Aluminium</span>{" "}
              Windows & Doors
            </h1>

            <p className="text-lg md:text-xl mb-8 leading-relaxed text-primary-foreground/80 max-w-xl">
              India's leading fabricator of high-performance uPVC and aluminium windows & doors. 
              Engineered for durability, energy efficiency, and timeless elegance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Button onClick={openLeadForm} size="lg" className="bg-gradient-to-r from-amber-400 via-accent to-yellow-500 hover:from-amber-500 hover:via-accent hover:to-yellow-600 text-accent-foreground font-heading font-bold text-lg px-8 h-14 shadow-lg hover:shadow-xl transition-all">
                Request a Callback
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-6">
              {[
                { icon: Shield, label: "10-Year Warranty" },
                { icon: Award, label: "ISO Certified" },
                { icon: Clock, label: "30+ Years Legacy" },
              ].map((badge) => (
                <div key={badge.label} className="flex items-center gap-2 text-primary-foreground/70">
                  <badge.icon className="h-5 w-5 text-accent" />
                  <span className="text-sm font-medium font-heading">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="glass-card p-8 max-w-md ml-auto">
              <h3 className="text-xl font-bold font-heading text-foreground mb-1">Get a Free Quote</h3>
              <p className="text-sm text-muted-foreground mb-6">Fill in your details and we'll call you back</p>
              <form className="space-y-4" onSubmit={handleHeroSubmit}>
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  value={heroFormData.name}
                  onChange={(e) => setHeroFormData({ ...heroFormData, name: e.target.value })}
                  className="w-full h-12 px-4 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  required
                  value={heroFormData.contactNumber}
                  onChange={(e) => setHeroFormData({ ...heroFormData, contactNumber: e.target.value })}
                  className="w-full h-12 px-4 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={heroFormData.email}
                  onChange={(e) => setHeroFormData({ ...heroFormData, email: e.target.value })}
                  className="w-full h-12 px-4 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                />
                <select
                  value={heroFormData.material}
                  onChange={(e) => setHeroFormData({ ...heroFormData, material: e.target.value })}
                  className="w-full h-12 px-4 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                >
                  <option value="">Select Product</option>
                  <option value="uPVC Windows">uPVC Windows</option>
                  <option value="uPVC Doors">uPVC Doors</option>
                  <option value="Aluminium Windows">Aluminium Windows</option>
                  <option value="Aluminium Doors">Aluminium Doors</option>
                  <option value="Custom Fabrication">Custom Fabrication</option>
                </select>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 gradient-primary text-primary-foreground font-heading font-bold text-base"
                >
                  {isSubmitting ? "Submitting..." : "Submit Enquiry"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
