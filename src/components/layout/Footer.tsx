import { Link } from "react-router-dom";
import { HardHat, Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";
import useContactStore from "@/store/ContactStore";

export function Footer() {
  const data = useContactStore((s) => s.data);

  console.log(data);
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 lg:px-10 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="h-10 w-10 rounded-md gradient-accent flex items-center justify-center">
              <HardHat className="h-5 w-5 text-primary" strokeWidth={2.5} />
            </div>
            <div className="font-display font-bold text-xl">
              Gyasi<span className="text-accent">Construction</span>
            </div>
          </div>
          <p className="text-primary-foreground/70 max-w-md leading-relaxed">
            Engineering excellence since 1998. We build skylines, infrastructure, and lasting
            partnerships through precision craftsmanship.
          </p>
          <div className="flex gap-3 mt-6">
            {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="h-10 w-10 rounded-md border border-white/10 flex items-center justify-center hover:bg-accent hover:text-primary hover:border-accent transition-all"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4 text-accent">
            Company
          </h4>
          <ul className="space-y-3 text-sm text-primary-foreground/80">
            <li>
              <Link to="/about" className="hover:text-accent transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-accent transition">
                Services
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-accent transition">
                Contact
              </Link>
            </li>
            {/* <li>
              <Link to="/admin" className="hover:text-accent transition">
                Admin
              </Link>
            </li> */}
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4 text-accent">
            Contact
          </h4>
          <ul className="space-y-3 text-sm text-primary-foreground/80">
            <li className="flex gap-3">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-accent" /> {data?.contactAddress}
            </li>
            <li className="flex gap-3">
              <Phone className="h-4 w-4 mt-0.5 shrink-0 text-accent" /> {data?.contactPhone}
            </li>
            <li className="flex gap-3">
              <Mail className="h-4 w-4 mt-0.5 shrink-0 text-accent" /> {data?.contactEmail}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container mx-auto px-6 lg:px-10 py-6 flex flex-col md:flex-row justify-between gap-3 text-xs text-primary-foreground/60">
          <p>© {new Date().getFullYear()} Steelcore Construction. All rights reserved.</p>
          <p>Built with precision · Licensed & Insured</p>
        </div>
      </div>
    </footer>
  );
}
