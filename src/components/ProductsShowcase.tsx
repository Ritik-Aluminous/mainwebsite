import { ArrowRight } from "lucide-react";
import { useLeadForm } from "@/contexts/LeadFormContext";
import productAluCasement from "@/assets/product-alu-casement.png";
import productAluSliding from "@/assets/product-alu-sliding.png";
import productAluTiltTurn from "@/assets/product-alu-tilt-turn.png";
import productAluSlideFold from "@/assets/product-alu-slide-fold.png";
import productUpvcCasement from "@/assets/product-upvc-casement.jpg";
import productUpvcSliding from "@/assets/product-upvc-sliding.png";
import productUpvcTiltTurn from "@/assets/product-upvc-tilt-turn.png";
import productUpvcSlideFold from "@/assets/product-upvc-slide-fold.png";

const products = [
  { title: "Aluminium Casement Windows", description: "Premium aluminium casement windows with sleek profiles, superior strength, and maximum ventilation for modern spaces.", image: productAluCasement },
  { title: "Aluminium Sliding Windows", description: "Durable aluminium sliding windows with smooth operation, ideal for balconies and contemporary interiors.", image: productAluSliding },
  { title: "Aluminium Tilt & Turn Windows", description: "Versatile aluminium tilt & turn windows offering dual-function operation for ventilation and easy cleaning.", image: productAluTiltTurn },
  { title: "Aluminium Slide & Fold Windows", description: "Elegant aluminium slide & fold windows that open up entire walls, blending indoor and outdoor living seamlessly.", image: productAluSlideFold },
  { title: "uPVC Casement Windows", description: "Classic uPVC casement windows with excellent insulation, low maintenance, and unobstructed views.", image: productUpvcCasement },
  { title: "uPVC Sliding Windows", description: "Space-saving uPVC sliding windows with smooth glide mechanism, perfect for compact spaces.", image: productUpvcSliding },
  { title: "uPVC Tilt & Turn Windows", description: "Dual-function uPVC windows that tilt inward for ventilation or swing open for easy cleaning.", image: productUpvcTiltTurn },
  { title: "uPVC Slide & Fold Windows", description: "Stylish uPVC slide & fold windows that create wide openings, bringing the outdoors in.", image: productUpvcSlideFold },
];

const ProductsShowcase = () => {
  const { openLeadForm } = useLeadForm();

  return (
    <section id="products" className="px-4 py-10 md:px-8 md:py-16 lg:px-16 bg-secondary">
      <div className="container mx-auto">
        <div className="text-center mb-8 md:mb-10">
          <span className="text-base md:text-lg font-bold uppercase tracking-widest text-primary font-heading">Our Products</span>
          <h2 className="section-title mt-2">
            Windows & Doors for{" "}
            <span className="text-gradient">Every Space</span>
          </h2>
          <p className="section-subtitle mt-3">
            From residential to commercial, we fabricate high-quality uPVC and aluminium solutions tailored to your needs.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <div
              key={product.title}
              className="group bg-card rounded-2xl overflow-hidden border hover:shadow-[var(--shadow-elevated)] transition-all duration-300 cursor-pointer"
              onClick={openLeadForm}
            >
              <div className="aspect-square bg-secondary/50 p-8 flex items-center justify-center overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  width={800}
                  height={800}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold font-heading text-foreground mb-2">{product.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-3">{product.description}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary font-heading group-hover:gap-2 transition-all">
                  Learn More <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsShowcase;
