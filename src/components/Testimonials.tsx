import { Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLeadForm } from "@/contexts/LeadFormContext";

const testimonials = [
  {
    name: "Rajesh Sharma",
    role: "Architect, Delhi",
    text: "Aluminous delivered exceptional uPVC windows for our residential project. The quality and finish are unmatched. Their team was professional and met all deadlines.",
    rating: 5,
  },
  {
    name: "Priya Gupta",
    role: "Homeowner, Noida",
    text: "We replaced all our old windows with Aluminous uPVC windows. The noise reduction is incredible, and our AC bills have dropped by 30%. Highly recommended!",
    rating: 5,
  },
  {
    name: "Anil Kapoor",
    role: "Builder, Gurgaon",
    text: "Working with Aluminous for over 5 years now. Their consistency in quality, timely delivery, and competitive pricing makes them our go-to partner for every project.",
    rating: 5,
  },
];

const Testimonials = () => {
  const { openLeadForm } = useLeadForm();

  return (
    <section className="px-4 py-10 md:px-8 md:py-16 lg:px-16 bg-secondary">
      <div className="container mx-auto">
        <div className="text-center mb-8 md:mb-10">
          <span className="text-sm font-bold uppercase tracking-widest text-primary font-heading">Testimonials</span>
          <h2 className="section-title mt-2">
            What Our <span className="text-gradient">Clients Say</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-card rounded-2xl p-8 border relative hover:shadow-[var(--shadow-elevated)] transition-all"
            >
              <Quote className="absolute top-6 right-6 h-8 w-8 text-primary/10" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-foreground/80 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
              <div>
                <p className="font-bold font-heading text-foreground">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button onClick={openLeadForm} size="lg" className="gradient-primary text-primary-foreground font-heading font-bold text-lg px-8 h-14 shadow-lg hover:shadow-xl transition-shadow">
            Get a Quote
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
