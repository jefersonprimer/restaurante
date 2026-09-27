import { useState } from "react";
import { galleryItems, GalleryItem } from "../data/gallery";

export function ExperienceGallery() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  return (
    <section id="experiencia" className="py-20 lg:py-28 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-14">
          <span className="text-xs uppercase tracking-widest text-[#857B6F] font-medium block mb-2">
            Ambiente & Atmosfera
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1714] font-normal tracking-tight mb-4">
            A Experiência no Primer
          </h2>
          <p className="text-sm text-[#595249] leading-relaxed font-light">
            Arquitetura contemporânea pensada para proporcionar conforto, luz
            natural durante o dia e iluminação intimista ao anoitecer.
          </p>
        </div>

        {/* Curated 5-photo asymmetrical architectural grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Main Large Shot: Salão Principal */}
          <div
            className="md:col-span-8 group relative aspect-[16/10] overflow-hidden rounded-sm bg-[#E8E2D5] cursor-pointer"
            onClick={() => setSelectedItem(galleryItems[0])}
          >
            <img
              src={galleryItems[0].image}
              alt={galleryItems[0].title}
              referrerPolicy="no-referrer"
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
            <div className="absolute bottom-5 left-5 right-5 text-left text-[#FAF8F5]">
              <span className="text-[11px] uppercase tracking-wider text-[#FAF8F5]/80 font-medium block">
                {galleryItems[0].category}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-medium">
                {galleryItems[0].title}
              </h3>
              <p className="text-xs text-[#FAF8F5]/90 mt-1 max-w-lg font-light">
                {galleryItems[0].caption}
              </p>
            </div>
          </div>

          {/* Side Shot: Cozinha & Autoria */}
          <div
            className="md:col-span-4 group relative aspect-[4/3] md:aspect-auto overflow-hidden rounded-sm bg-[#E8E2D5] cursor-pointer"
            onClick={() => setSelectedItem(galleryItems[1])}
          >
            <img
              src={galleryItems[1].image}
              alt={galleryItems[1].title}
              referrerPolicy="no-referrer"
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
            <div className="absolute bottom-4 left-4 right-4 text-left text-[#FAF8F5]">
              <span className="text-[11px] uppercase tracking-wider text-[#FAF8F5]/80 font-medium block">
                {galleryItems[1].category}
              </span>
              <h3 className="font-serif text-lg font-medium">
                {galleryItems[1].title}
              </h3>
            </div>
          </div>

          {/* Row 2: 3 Equal Columns (Gastronomia & Adega) */}
          {galleryItems.slice(2).map((item) => (
            <div
              key={item.id}
              className="md:col-span-4 group relative aspect-[4/3] overflow-hidden rounded-sm bg-[#E8E2D5] cursor-pointer"
              onClick={() => setSelectedItem(item)}
            >
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-75 group-hover:opacity-90 transition-opacity" />
              <div className="absolute bottom-4 left-4 right-4 text-left text-[#FAF8F5]">
                <span className="text-[11px] uppercase tracking-wider text-[#FAF8F5]/80 font-medium block">
                  {item.category}
                </span>
                <h3 className="font-serif text-lg font-medium">{item.title}</h3>
                <p className="text-xs text-[#FAF8F5]/85 mt-0.5 line-clamp-1 font-light">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedItem && (
          <div
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedItem(null)}
          >
            <div
              className="relative max-w-4xl w-full bg-[#1A1714] text-[#FAF8F5] rounded-sm overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/10] max-h-[75vh] bg-black">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/10 text-left">
                <div>
                  <span className="text-xs uppercase tracking-wider text-white/60 font-medium block mb-1">
                    {selectedItem.category}
                  </span>
                  <h3 className="font-serif text-2xl font-medium text-white">
                    {selectedItem.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 mt-1 font-light">
                    {selectedItem.caption}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="px-4 py-2 text-xs font-medium text-white border border-white/30 rounded-xs hover:bg-white/10 transition-colors shrink-0"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
