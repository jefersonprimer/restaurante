import { useState, useMemo } from "react";
import {
  menuCategories,
  menuItems,
  MenuCategoryKey,
  formatBRL
} from "../data/menu";
import { buildWhatsAppUrl } from "../data/restaurant";

interface FullMenuProps {
  onOpenReservation: () => void;
}

export function FullMenu({ onOpenReservation }: FullMenuProps) {
  const [activeCategory, setActiveCategory] = useState<MenuCategoryKey>("entradas");
  const [searchQuery, setSearchQuery] = useState("");
  const [dietaryFilter, setDietaryFilter] = useState<string>("all");

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory = searchQuery
        ? true
        : item.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDietary =
        dietaryFilter === "all" ||
        (item.dietary && item.dietary.includes(dietaryFilter));

      return matchesCategory && matchesSearch && matchesDietary;
    });
  }, [activeCategory, searchQuery, dietaryFilter]);

  const activeCategoryObj = menuCategories.find((c) => c.id === activeCategory);

  return (
    <section id="cardapio" className="py-20 lg:py-28 bg-[#FAF8F5] border-t border-[#E8E2D5]">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#857B6F] font-medium block mb-2">
            Experiência Gastronômica
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1714] font-normal tracking-tight mb-4">
            Cardápio Principal
          </h2>
          <p className="text-sm text-[#595249] leading-relaxed font-light">
            Cozinha autoral elaborada com produtos frescos, técnicas precisas e apresentação contemporânea.
          </p>
        </div>

        {/* Category Navigation - Minimal & Elegant Horizontal Bar */}
        <div className="border-b border-[#E8E2D5] mb-8 overflow-x-auto no-scrollbar">
          <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-6 min-w-max pb-px">
            {menuCategories.map((cat) => {
              const isActive = activeCategory === cat.id && !searchQuery;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setSearchQuery("");
                  }}
                  className={`py-3 px-3 text-xs sm:text-sm font-medium transition-colors relative cursor-pointer whitespace-nowrap ${
                    isActive
                      ? "text-[#1A1714] font-semibold"
                      : "text-[#6B6358] hover:text-[#1A1714]"
                  }`}
                >
                  {cat.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1A1714]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Search & Dietary Filters (Clean, no-pill UI) */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-10 pb-4 border-b border-[#F0ECE1]">
          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar no cardápio..."
              className="w-full text-xs bg-transparent border border-[#D8D2C6] rounded-xs px-3 py-2 text-[#1A1714] placeholder-[#857B6F] focus:outline-none focus:border-[#1A1714] transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#857B6F] hover:text-[#1A1714]"
              >
                Limpar
              </button>
            )}
          </div>

          {/* Clean Segmented Dietary Filter */}
          <div className="flex items-center gap-2 text-xs text-[#6B6358] self-start sm:self-auto">
            <span className="text-[11px] uppercase tracking-wider text-[#857B6F] mr-1">
              Filtro:
            </span>
            <button
              type="button"
              onClick={() => setDietaryFilter("all")}
              className={`px-2.5 py-1 text-xs transition-colors rounded-xs cursor-pointer ${
                dietaryFilter === "all"
                  ? "bg-[#1A1714] text-[#FAF8F5]"
                  : "bg-transparent text-[#6B6358] hover:text-[#1A1714]"
              }`}
            >
              Todos
            </button>
            <button
              type="button"
              onClick={() => setDietaryFilter("Vegetariano")}
              className={`px-2.5 py-1 text-xs transition-colors rounded-xs cursor-pointer ${
                dietaryFilter === "Vegetariano"
                  ? "bg-[#1A1714] text-[#FAF8F5]"
                  : "bg-transparent text-[#6B6358] hover:text-[#1A1714]"
              }`}
            >
              Vegetariano
            </button>
            <button
              type="button"
              onClick={() => setDietaryFilter("Sem Glúten")}
              className={`px-2.5 py-1 text-xs transition-colors rounded-xs cursor-pointer ${
                dietaryFilter === "Sem Glúten"
                  ? "bg-[#1A1714] text-[#FAF8F5]"
                  : "bg-transparent text-[#6B6358] hover:text-[#1A1714]"
              }`}
            >
              Sem Glúten
            </button>
          </div>
        </div>

        {/* Current Active Category Description */}
        {!searchQuery && activeCategoryObj && (
          <div className="mb-8 text-left">
            <p className="text-xs uppercase tracking-widest text-[#857B6F] font-medium">
              {activeCategoryObj.description}
            </p>
          </div>
        )}

        {/* Menu Items List - Classic Fine Dining Menu Layout */}
        {filteredItems.length === 0 ? (
          <div className="py-16 text-center text-[#6B6358]">
            <p className="text-sm">Nenhum prato encontrado para os critérios selecionados.</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setDietaryFilter("all");
              }}
              className="mt-3 text-xs font-semibold text-[#1A1714] underline underline-offset-4 cursor-pointer"
            >
              Limpar filtros
            </button>
          </div>
        ) : (
          <div className="space-y-8 text-left">
            {filteredItems.map((item) => (
              <article
                key={item.id}
                className="group pb-7 border-b border-[#F0ECE1] last:border-b-0 transition-opacity"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 mb-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-serif text-lg sm:text-xl font-medium text-[#1A1714] group-hover:text-[#3B342B] transition-colors">
                      {item.name}
                    </h3>
                  </div>

                  {/* Price with tabular nums */}
                  <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
                    <span className="font-sans text-sm sm:text-base font-semibold tabular-nums text-[#1A1714]">
                      {formatBRL(item.price)}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                  <p className="text-xs sm:text-sm text-[#595249] leading-relaxed max-w-2xl font-light">
                    {item.description}
                  </p>

                  <div className="flex items-center gap-3 shrink-0 text-xs">
                    {/* Unboxed dietary indicator */}
                    {item.dietary && item.dietary.length > 0 && (
                      <span className="text-[11px] text-[#857B6F] font-medium">
                        {item.dietary.join(" · ")}
                      </span>
                    )}

                    <a
                      href={buildWhatsAppUrl("menu_inquiry", { dishName: item.name })}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-[#7A7165] hover:text-[#1A1714] hover:underline transition-colors"
                      title="Tirar dúvida sobre este item pelo WhatsApp"
                    >
                      Dúvida no WhatsApp
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Note on Allergies & Special Dietary Requests */}
        <div className="mt-14 p-6 bg-[#F5F2EB] border border-[#E8E2D5] rounded-xs text-left">
          <h4 className="font-serif text-base font-medium text-[#1A1714] mb-1">
            Restrições alimentares e harmonização
          </h4>
          <p className="text-xs text-[#595249] leading-relaxed mb-4 font-light">
            Informamos que nossa cozinha manipula frutos do mar, nozes e derivados de leite. Caso possua qualquer alergia ou intolerância alimentar, informe nossa equipe no momento da reserva ou ao garçom.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={onOpenReservation}
              className="text-xs font-medium text-[#1A1714] underline underline-offset-4 cursor-pointer"
            >
              Fazer uma reserva
            </button>
            <span className="text-[#B5ADA0]">·</span>
            <a
              href={buildWhatsAppUrl("menu_inquiry")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-[#595249] hover:text-[#1A1714] transition-colors"
            >
              Solicitar carta de vinhos completa via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
