import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Mail, Phone, MapPin, Facebook, Linkedin, Twitter, Instagram } from "lucide-react";
import { useT } from "@/lib/i18n";
import kmrLogo from "@/assets/kmr-logo.png";

export function Footer() {
  const { t } = useT();
  const [year, setYear] = useState(2026);
  useEffect(() => setYear(new Date().getFullYear()), []);
  return (
    <footer className="bg-navy-deep text-white/80">
      <div className="container mx-auto px-4 lg:px-8 py-14 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <img
              src={kmrLogo}
              alt="Karthikeya Educational Society"
              className="h-12 w-12 rounded-full object-contain bg-white p-0.5 shadow-md"
            />
            <div>
              <div className="text-white font-extrabold">KES</div>
              <div className="text-gold text-[10px] font-semibold uppercase tracking-widest">Karthikeya Educational Society</div>
            </div>
          </div>
          <p className="text-sm">{t("footer.tagline")}</p>
          <div className="flex gap-3 mt-4">
            {[Facebook, Linkedin, Twitter, Instagram].map((I, i) => (
              <a key={i} href="#" className="h-9 w-9 rounded-full bg-white/10 hover:bg-gold hover:text-navy-deep grid place-items-center transition"><I className="h-4 w-4" /></a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">{t("footer.courses")}</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/courses/job-guaranteed" className="hover:text-gold">{t("courses.jobGuaranteed")}</Link></li>
            <li><Link to="/courses/govt-sponsored" className="hover:text-gold">{t("courses.govt")}</Link></li>
            <li><Link to="/courses/certification" className="hover:text-gold">{t("courses.cert")}</Link></li>
            <li><Link to="/courses/academic" className="hover:text-gold">{t("courses.academic")}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">{t("footer.company")}</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-gold">{t("nav.about")}</Link></li>
            <li><Link to="/careers/kmr" className="hover:text-gold">{t("careers.kmr")}</Link></li>
            <li><Link to="/careers/apprenticeship-abroad" className="hover:text-gold">{t("careers.abroad")}</Link></li>
            <li><Link to="/contact" className="hover:text-gold">{t("nav.contact")}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">{t("footer.contact")}</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2"><MapPin className="h-4 w-4 text-gold shrink-0 mt-0.5" /><span>Address: 1-6-60,Above Bank of Maharashtra,Nallabavi road, suryapet</span></li>
            <li className="flex gap-2"><Phone className="h-4 w-4 text-gold" /><span>+91 9966598898</span></li>
            <li className="flex gap-2"><Mail className="h-4 w-4 text-gold" /><span>Karthikeyaeducationalsociety@gmail.com</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/60">© {year} Karthikeya Educational Society. {t("footer.rights")}</div>
    </footer>
  );
}
