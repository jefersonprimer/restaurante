import { restaurantData, buildWhatsAppUrl } from "../data/restaurant";

interface FooterProps {
  onOpenReservation: () => void;
}

export function Footer({ onOpenReservation }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
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
    <footer className="bg-[#1A1714] text-[#FAF8F5] pt-16 pb-12 border-t border-[#2A2622]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 pb-12 border-b border-white/10 text-left">
          {/* Brand & Description */}
          <div className="md:col-span-5">
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-3">
              {restaurantData.name}
            </h3>
            <p className="text-xs text-white/70 leading-relaxed max-w-sm mb-6 font-light">
              Gastronomia contemporânea com respeito ao ingrediente, acolhimento e momentos memoráveis em Fortaleza.
            </p>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={onOpenReservation}
                className="px-4 py-2 text-xs font-medium text-[#1A1714] bg-[#FAF8F5] rounded-xs hover:bg-[#F0ECE1] transition-colors cursor-pointer"
              >
                Reservar mesa
              </button>
              <a
                href={buildWhatsAppUrl("reservation")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-white/80 hover:text-white underline underline-offset-4"
              >
                WhatsApp Concierge
              </a>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs uppercase tracking-widest text-white/50 font-medium mb-4">
              Navegação
            </h4>
            <ul className="space-y-2.5 text-xs text-white/75">
              <li>
                <a
                  href="#inicio"
                  onClick={(e) => handleNavClick(e, "#inicio")}
                  className="hover:text-white transition-colors"
                >
                  Início
                </a>
              </li>
              <li>
                <a
                  href="#cardapio"
                  onClick={(e) => handleNavClick(e, "#cardapio")}
                  className="hover:text-white transition-colors"
                >
                  Cardápio
                </a>
              </li>
              <li>
                <a
                  href="#sobre"
                  onClick={(e) => handleNavClick(e, "#sobre")}
                  className="hover:text-white transition-colors"
                >
                  Sobre a Casa
                </a>
              </li>
              <li>
                <a
                  href="#experiencia"
                  onClick={(e) => handleNavClick(e, "#experiencia")}
                  className="hover:text-white transition-colors"
                >
                  Ambiente & Galeria
                </a>
              </li>
              <li>
                <a
                  href="#localizacao"
                  onClick={(e) => handleNavClick(e, "#localizacao")}
                  className="hover:text-white transition-colors"
                >
                  Localização & Horários
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Hours Summary */}
          <div className="md:col-span-4 text-xs text-white/75 space-y-4">
            <div>
              <h4 className="text-xs uppercase tracking-widest text-white/50 font-medium mb-2">
                Localização
              </h4>
              <p className="leading-relaxed">
                {restaurantData.address.street}, {restaurantData.address.neighborhood}
                <br />
                {restaurantData.address.city} - {restaurantData.address.state}
              </p>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-widest text-white/50 font-medium mb-2">
                Contato
              </h4>
              <p>
                Telefone:{" "}
                <a href={`tel:${restaurantData.contact.phoneFormatted}`} className="text-white hover:underline">
                  {restaurantData.contact.phone}
                </a>
              </p>
              <p className="mt-1">
                WhatsApp:{" "}
                <a
                  href={buildWhatsAppUrl("general")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:underline"
                >
                  {restaurantData.contact.whatsappDisplay}
                </a>
              </p>
              <p className="mt-1">
                Instagram:{" "}
                <a
                  href={restaurantData.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:underline"
                >
                  {restaurantData.contact.instagram}
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Minimal Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {currentYear} {restaurantData.name}. Todos os direitos reservados.</p>
          <p className="text-white/40">Fortaleza, Ceará — Brasil</p>
        </div>
      </div>
    </footer>
  );
}
