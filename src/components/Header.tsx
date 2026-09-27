import { useState, useEffect } from "react";
import { restaurantData, buildWhatsAppUrl } from "../data/restaurant";

interface HeaderProps {
  onOpenReservation: () => void;
}

export function Header({ onOpenReservation }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Início", href: "#inicio" },
    { label: "Cardápio", href: "#cardapio" },
    { label: "Sobre", href: "#sobre" },
    { label: "Experiência", href: "#experiencia" },
    { label: "Localização", href: "#localizacao" },
    { label: "Contato", href: "#contato" }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E2D5] shadow-xs py-3.5"
          : "bg-[#FAF8F5]/80 backdrop-blur-xs border-b border-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#inicio"
          onClick={(e) => handleNavClick(e, "#inicio")}
          className="group text-left"
        >
          <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-[#1A1714] block">
            {restaurantData.name}
          </span>
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav
          className="hidden md:flex items-center gap-7 lg:gap-9 text-[14px] font-medium tracking-wide text-[#595249]"
          aria-label="Navegação principal"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="hover:text-[#1A1714] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#1A1714] hover:after:w-full after:transition-all after:duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          <a
            href={buildWhatsAppUrl("general")}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center justify-center text-xs font-medium text-[#595249] hover:text-[#1A1714] transition-colors px-2 py-1.5 whitespace-nowrap"
            title="Fale conosco no WhatsApp"
          >
            WhatsApp
          </a>

          <button
            type="button"
            onClick={onOpenReservation}
            className="px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium tracking-wide text-[#FAF8F5] bg-[#1A1714] rounded-sm hover:bg-[#2A2622] transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A1714]"
          >
            Reservar mesa
          </button>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#1A1714] rounded-sm focus-visible:outline-2 focus-visible:outline-[#1A1714]"
            aria-expanded={mobileMenuOpen}
            aria-label="Alternar menu de navegação"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span
                className={`block h-0.5 w-full bg-[#1A1714] transition-transform duration-200 ${
                  mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-full bg-[#1A1714] transition-opacity duration-200 ${
                  mobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-full bg-[#1A1714] transition-transform duration-200 ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF8F5] border-b border-[#E8E2D5] px-6 py-6 transition-all">
          <nav className="flex flex-col gap-4 text-base font-medium text-[#1A1714]">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="py-1 text-[#595249] hover:text-[#1A1714] transition-colors border-b border-[#F0ECE1]"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReservation();
                }}
                className="w-full text-center py-2.5 text-sm font-medium text-[#FAF8F5] bg-[#1A1714] rounded-sm hover:bg-[#2A2622] transition-colors"
              >
                Reservar mesa
              </button>
              <a
                href={buildWhatsAppUrl("reservation")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-2.5 text-sm font-medium text-[#1A1714] border border-[#D8D2C6] rounded-sm hover:bg-[#F2ECE1] transition-colors"
              >
                Conversar pelo WhatsApp
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
