import { Container } from "@/components/shared/container";
import { getSettings } from "@/services/content-service";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function ContactPage() {
  const settings = await getSettings();

  return (
    <Container className="py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <p className="text-muted-foreground mb-8">
        Have a question? We&apos;d love to hear from you. Reach out via WhatsApp for the fastest response.
      </p>
      <div className="space-y-6">
        {settings.whatsappNumber && (
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-green-100"><MessageCircle className="h-5 w-5 text-green-600" /></div>
            <div>
              <p className="font-medium">WhatsApp</p>
              <Button variant="link" className="p-0 h-auto text-green-600" asChild>
                <a href={`https://wa.me/${settings.whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                  +{settings.whatsappNumber}
                </a>
              </Button>
            </div>
          </div>
        )}
        {settings.email && (
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-muted"><Mail className="h-5 w-5" /></div>
            <div><p className="font-medium">Email</p><p className="text-muted-foreground">{settings.email}</p></div>
          </div>
        )}
        {settings.phone && (
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-muted"><Phone className="h-5 w-5" /></div>
            <div><p className="font-medium">Phone</p><p className="text-muted-foreground">{settings.phone}</p></div>
          </div>
        )}
        {settings.address && (
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-muted"><MapPin className="h-5 w-5" /></div>
            <div><p className="font-medium">Address</p><p className="text-muted-foreground">{settings.address}</p></div>
          </div>
        )}
      </div>
    </Container>
  );
}
