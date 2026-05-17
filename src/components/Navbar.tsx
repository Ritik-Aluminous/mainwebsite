import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoDarkIcon from "@/assets/logo-dark-icon.svg";
import { useLeadForm } from "@/contexts/LeadFormContext";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products" },
  { label: "Why Us", href: "#why-us" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { openLeadForm } = useLeadForm();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur-md border-b">
      <div className="container mx-auto flex items-center justify-between h-20 md:h-24 px-4">
        <a href="#home" className="shrink-0 flex items-center gap-0">
          <img src={logoDarkIcon} alt="ALUMINOUS" className="h-16 md:h-20 w-auto" />
          <span className="font-heading font-bold text-xl md:text-2xl tracking-wide text-foreground -ml-3">ALUMINOUS</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors font-heading tracking-wide uppercase"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a href="tel:+918527271152" className="flex items-center gap-2 text-sm font-semibold text-primary">
            <Phone className="h-4 w-4" />
            +91 85272 71152
          </a>
          <Button onClick={openLeadForm} className="gradient-primary text-primary-foreground font-heading font-semibold tracking-wide">
            Get a Quote
          </Button>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-foreground p-2"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-background border-t">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="py-2 text-sm font-medium text-foreground/80 hover:text-primary font-heading uppercase tracking-wide"
              >
                {link.label}
              </a>
            ))}
            <Button onClick={() => { openLeadForm(); setIsOpen(false); }} className="gradient-primary text-primary-foreground font-heading font-semibold w-full mt-2">
              Get a Quote
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
