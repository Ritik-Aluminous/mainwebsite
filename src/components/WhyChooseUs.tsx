import { Shield, Thermometer, Volume2, Paintbrush, Wrench, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLeadForm } from "@/contexts/LeadFormContext";
import whyUsBg from "@/assets/why-us-bg.png";

const features = [
  { icon: Shield, title: "Unmatched Durability", description: "Our uPVC profiles resist corrosion, termites, and harsh weather, lasting decades without deterioration." },
  { icon: Thermometer, title: "Energy Efficient", description: "Multi-chambered profiles with double glazing reduce heat transfer, cutting your energy bills significantly." },
  { icon: Volume2, title: "Sound Insulation", description: "Reduce outside noise by up to 40dB. Enjoy peaceful interiors even in busy urban environments." },
  { icon: Paintbrush, title: "Aesthetic Designs", description: "Choose from a wide range of colors, laminates, and finishes to match your architectural style." },
  { icon: Wrench, title: "Expert Fabrication", description: "30+ years of craftsmanship ensures precision manufacturing and flawless installation every time." },
  { icon: Leaf, title: "Eco-Friendly", description: "uPVC is 100% recyclable and lead-free. Choose sustainable solutions without compromising quality." },
];

const WhyChooseUs = () => {
  const { openLeadForm } = useLeadForm();

  return (
    <section id="why-us" className="px-4 py-10 md:px-8 md:py-16 lg:px-16 relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${whyUsBg})` }}>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/10" />
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-8 md:mb-10">
          <span className="text-sm font-bold uppercase tracking-widest text-primary-foreground font-heading">Why Aluminious?</span>
          <h2 className="section-title mt-2 text-primary-foreground">
            Built on <span className="text-primary-foreground">Trust & Quality</span>
          </h2>
          <p className="section-subtitle mt-3 text-primary-foreground/90">
            With three decades of expertise, we deliver products that stand the test of time.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 rounded-2xl border bg-card/90 backdrop-blur-sm hover:shadow-[var(--shadow-elevated)] transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <feature.icon className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-bold font-heading text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button onClick={openLeadForm} size="lg" className="gradient-primary text-primary-foreground font-heading font-bold text-lg px-8 h-14 shadow-lg hover:shadow-xl transition-shadow">
            Get a Quote
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
