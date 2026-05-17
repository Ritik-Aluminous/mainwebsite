import { useEffect, useState, useRef } from "react";
import { Calendar, Building2, MapPin, Users } from "lucide-react";

const stats = [
  { icon: Calendar, value: 30, suffix: "+", label: "Years of Excellence", prefix: "" },
  { icon: Building2, value: 5000, suffix: "+", label: "Projects Completed", prefix: "" },
  { icon: MapPin, value: 100, suffix: "+", label: "Cities Served", prefix: "" },
  { icon: Users, value: 10000, suffix: "+", label: "Happy Customers", prefix: "" },
];

function AnimatedCounter({ target, duration = 2 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = Date.now();
          const tick = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / (duration * 1000), 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          tick();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

const StatsCounter = () => {
  return (
    <section className="gradient-primary py-10 md:py-14">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <stat.icon className="h-8 w-8 mx-auto mb-3 text-accent" />
              <div className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-heading text-primary-foreground mb-1">
                {stat.prefix}<AnimatedCounter target={stat.value} />{stat.suffix}
              </div>
              <p className="text-sm md:text-base text-primary-foreground/70 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
