import { restaurantData } from "../data/restaurant";

export function About() {
  return (
    <section
      id="sobre"
      className="py-20 lg:py-28 bg-[#F5F2EB] border-y border-[#E8E2D5]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image of the culinary craft / chef */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-[#E8E2D5] shadow-xs">
              <img
                src="/src/assets/images/about_restaurant_chef_1790496425699.jpg"
                alt="Chef do Primer Restaurante finalizando prato autoral com ingredientes frescos"
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
            <p className="text-xs text-[#857B6F] mt-3 italic text-left">
              Cozinha autoral: técnica refinada, ingredientes de produtores
              locais e finalização minuciosa.
            </p>
          </div>

          {/* Right Column: Story & Philosophy */}
          <div className="lg:col-span-7 order-1 lg:order-2 text-left">
            <span className="text-xs uppercase tracking-widest text-[#857B6F] font-medium block mb-3">
              Sobre o Lô
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1714] font-normal tracking-tight mb-6 text-balance">
              Uma celebração à boa mesa, aos ingredientes autênticos e ao
              convívio.
            </h2>

            <div className="space-y-4 text-base text-[#595249] leading-relaxed font-light mb-8">
              {restaurantData.fullDescription.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* 3 Pillars: Clean editorial list without icons or pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#E8E2D5]">
              {restaurantData.highlights.map((item, index) => (
                <div key={index} className="space-y-1.5">
                  <h3 className="font-serif text-lg text-[#1A1714] font-medium">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#6B6358] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
