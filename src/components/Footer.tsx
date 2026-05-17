import { Phone, Mail, MapPin } from "lucide-react";
import logoWhite from "@/assets/logo-white.svg";

const Footer = () => {
  return (
    <footer id="contact" className="gradient-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-12 items-start">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-0 mb-4">
              <img src={logoWhite} alt="Aluminous" className="h-20 w-auto" />
              <span className="font-heading font-bold text-2xl tracking-wide -ml-3">ALUMINOUS</span>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-6">
              India's trusted fabricator of premium uPVC & aluminium windows and doors since 1995.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              {["Home", "Products", "Why Us", "About", "Contact"].map((l) => (
                <li key={l}>
                  <a href={`#${l.toLowerCase().replace(" ", "-")}`} className="hover:text-accent transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Contact Us</h4>
            <div className="space-y-3 text-sm text-primary-foreground/70">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-0.5 text-accent shrink-0" />
                <span>Shed No.11, Kishori Complex-1, Near Parshuram Chowk, Greater Faridabad, Haryana-121002</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-accent shrink-0" />
                <a href="tel:+918527271152" className="hover:text-accent transition-colors">+91 85272 71152</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-accent shrink-0" />
                <a href="mailto:info@aluminous.in" className="hover:text-accent transition-colors">info@aluminous.in</a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-10 pt-6 text-center text-sm text-primary-foreground/50">
          © Aluminous. All Rights Reserved. | Since 1995
        </div>
      </div>
    </footer>
  );
};

export default Footer;
