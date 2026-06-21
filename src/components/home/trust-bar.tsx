import { Container } from "@/components/shared/container";
import { ShieldCheck, Truck, MessageCircle, Award } from "lucide-react";

const items = [
  { icon: ShieldCheck, label: "Authentic Oud" },
  { icon: Award, label: "Premium Quality" },
  { icon: Truck, label: "Pan-India Delivery" },
  { icon: MessageCircle, label: "WhatsApp Orders" },
];

export function TrustBar() {
  return (
    <section className="border-y border-border bg-secondary/50">
      <Container className="py-4 sm:py-5">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {items.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center justify-center sm:justify-start gap-2.5 text-primary">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Icon className="size-4" strokeWidth={2} />
              </span>
              <span className="text-[0.65rem] sm:text-xs uppercase tracking-[0.14em] font-semibold">
                {label}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
