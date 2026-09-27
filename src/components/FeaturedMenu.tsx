import { menuItems, formatBRL } from "../data/menu";
import { buildWhatsAppUrl } from "../data/restaurant";

interface FeaturedMenuProps {
  onExploreFullMenu: () => void;
  onOpenReservation: () => void;
}

export function FeaturedMenu({
  onExploreFullMenu,
  onOpenReservation,
}: FeaturedMenuProps) {
  const featured = menuItems.filter((item) => item.featured).slice(0, 4);

  return (
    <section className="py-20 lg:py-28 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 gap-4 text-left">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#857B6F] font-medium block mb-2">
              Destaques da Casa
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1714] font-normal tracking-tight">
              Sugestões do Chef
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onExploreFullMenu}
              className="text-sm font-medium text-[#1A1714] hover:underline underline-offset-4 cursor-pointer inline-flex items-center gap-1.5"
            >
              <span>Ver cardápio completo</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        {/* 4-Item Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map((dish) => (
            <article
              key={dish.id}
              className="group flex flex-col justify-between text-left"
            >
              <div>
                {/* Image or styled container */}
                <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-[#EFE9DF] mb-4">
                  {dish.image ? (
                    <img
                      src={dish.image}
                      alt={dish.name}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 ease-out"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#EFE9DF]">
                      <span className="font-serif text-lg text-[#595249] italic mb-1">
                        Primer Restaurante
                      </span>
                      <span className="text-xs text-[#857B6F]">
                        Prato Autoral
                      </span>
                    </div>
                  )}

                  {/* Clean unboxed dietary indicator */}
                  {dish.dietary && dish.dietary.length > 0 && (
                    <div className="absolute top-2.5 left-2.5 bg-[#FAF8F5]/90 backdrop-blur-xs px-2 py-0.5 text-[11px] text-[#595249] font-medium rounded-xs">
                      {dish.dietary.join(" · ")}
                    </div>
                  )}
                </div>

                {/* Dish info */}
                <div className="flex items-baseline justify-between gap-2 mb-1.5">
                  <h3 className="font-serif text-xl font-medium text-[#1A1714] leading-snug">
                    {dish.name}
                  </h3>
                  <span className="text-sm font-semibold tabular-nums text-[#1A1714] shrink-0">
                    {formatBRL(dish.price)}
                  </span>
                </div>

                <p className="text-xs text-[#6B6358] leading-relaxed line-clamp-3 mb-4 font-light">
                  {dish.description}
                </p>
              </div>

              {/* Contextual WhatsApp action */}
              <div className="pt-3 border-t border-[#E8E2D5] flex items-center justify-between text-xs">
                <a
                  href={buildWhatsAppUrl("menu_inquiry", {
                    dishName: dish.name,
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#6B6358] hover:text-[#1A1714] transition-colors"
                >
                  Consultar no WhatsApp
                </a>
                <button
                  type="button"
                  onClick={onOpenReservation}
                  className="font-medium text-[#1A1714] hover:underline"
                >
                  Reservar
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-14 pt-8 border-t border-[#E8E2D5] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-xs text-[#7A7165]">
            Trabalhamos com pescados frescos da costa e produtos da estação.
            Consulte nosso sommelier para harmonização.
          </p>
          <button
            type="button"
            onClick={onExploreFullMenu}
            className="px-6 py-2.5 text-xs font-medium tracking-wide text-[#FAF8F5] bg-[#1A1714] rounded-sm hover:bg-[#2A2622] transition-colors cursor-pointer"
          >
            Explorar todo o cardápio
          </button>
        </div>
      </div>
    </section>
  );
}
