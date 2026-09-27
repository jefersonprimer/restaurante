import { restaurantData, buildWhatsAppUrl } from "../data/restaurant";

interface HeroProps {
  onOpenReservation: () => void;
}

export function Hero({ onOpenReservation }: HeroProps) {
  const handleScrollToMenu = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const menuEl = document.querySelector("#cardapio");
    if (menuEl) {
      const headerOffset = 80;
      const elementPosition = menuEl.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="inicio"
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 lg:pt-40 lg:pb-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Main Grid: Editorial 2-column or centered architectural framing */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Refined Typography & Intentional CTAs */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">
            {/* Unboxed category metadata kicker */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#857B6F] mb-4 font-medium">
              <span>Gastronomia Contemporânea</span>
              <span aria-hidden="true">·</span>
              <span>Fortaleza</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.12] text-[#1A1714] font-normal tracking-tight mb-5 text-balance">
              Boa comida, bons momentos e atmosfera acolhedora.
            </h1>

            <p className="text-base sm:text-lg text-[#595249] leading-relaxed max-w-xl mb-8 font-light">
              Cozinha contemporânea com identidade autoral, privilegiando os
              pescados frescos de nossa costa, cortes nobres e uma curadoria de
              mais de 160 vinhos especiais.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-10">
              <button
                type="button"
                onClick={onOpenReservation}
                className="px-6 py-3.5 text-sm font-medium tracking-wide text-[#FAF8F5] bg-[#1A1714] rounded-sm hover:bg-[#2A2622] transition-colors text-center cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A1714]"
              >
                Reservar mesa
              </button>

              <a
                href="#cardapio"
                onClick={handleScrollToMenu}
                className="px-6 py-3.5 text-sm font-medium tracking-wide text-[#1A1714] border border-[#D8D2C6] rounded-sm hover:bg-[#F2ECE1] transition-colors text-center"
              >
                Ver cardápio
              </a>
            </div>

            {/* Quiet metadata line without pills */}
            <div className="pt-6 border-t border-[#E8E2D5] flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#7A7165]">
              <span>Almoço de Ter a Dom</span>
              <span aria-hidden="true">·</span>
              <span>Jantar de Ter a Sáb</span>
              <span aria-hidden="true">·</span>
              <span>Estacionamento com Valet</span>
            </div>
          </div>

          {/* Right Column: High-Fidelity Architectural Dining Atmosphere */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-sm overflow-hidden bg-[#E8E2D5] shadow-sm">
              <img
                src="/src/assets/images/hero_restaurant_dining_1790496411884.jpg"
                alt="Salão contemporâneo do Primer Restaurante com iluminação intimista e mesas preparadas"
                referrerPolicy="no-referrer"
                loading="eager"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback container styling if image fails
                  const target = e.currentTarget;
                  target.style.display = "none";
                  if (target.parentElement) {
                    target.parentElement.classList.add(
                      "flex",
                      "items-center",
                      "justify-center",
                      "bg-[#EFE9DF]",
                      "p-8",
                      "text-[#595249]",
                      "text-center",
                    );
                  }
                }}
              />
              {/* Subtle gentle bottom gradient for soft light blend */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />

              {/* Minimalist image caption overlay */}
              <div className="absolute bottom-4 left-4 right-4 text-left pointer-events-none">
                <p className="text-xs text-white/90 font-medium tracking-wide drop-shadow-sm">
                  Salão Principal · Rua Carlos Vasconcelos, 1090 — Meireles
                </p>
              </div>
            </div>

            {/* Quick floating contact note with WhatsApp reservation */}
            <div className="hidden sm:block absolute -bottom-5 -left-5 bg-[#FAF8F5] border border-[#E8E2D5] p-4 rounded-sm shadow-xs max-w-xs text-left">
              <p className="text-xs text-[#7A7165] mb-1">
                Deseja um atendimento rápido?
              </p>
              <a
                href={buildWhatsAppUrl("reservation")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[#1A1714] hover:underline flex items-center gap-1.5"
              >
                <span>Falar com concierge via WhatsApp</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
