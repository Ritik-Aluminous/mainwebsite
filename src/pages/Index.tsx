import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsCounter from "@/components/StatsCounter";
import ProductsShowcase from "@/components/ProductsShowcase";
import WhyChooseUs from "@/components/WhyChooseUs";
import AboutSection from "@/components/AboutSection";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import { LeadFormProvider } from "@/contexts/LeadFormContext";

const Index = () => {
  return (
    <LeadFormProvider>
      <div className="min-h-screen">
        <Navbar />
        <HeroSection />
        <StatsCounter />
        <ProductsShowcase />
        <WhyChooseUs />
        <AboutSection />
        <Testimonials />
        <Footer />
      </div>
    </LeadFormProvider>
  );
};

export default Index;
