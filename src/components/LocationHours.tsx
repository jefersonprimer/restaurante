import { restaurantData, buildWhatsAppUrl } from "../data/restaurant";

export function LocationHours() {
  return (
    <section
      id="localizacao"
      className="py-20 lg:py-28 bg-[#FAF8F5] border-t border-[#E8E2D5]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Address & Hours Info */}
          <div className="lg:col-span-6 text-left">
            <span className="text-xs uppercase tracking-widest text-[#857B6F] font-medium block mb-2">
              Visite-nos
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1714] font-normal tracking-tight mb-6">
              Horários & Localização
            </h2>
            <p className="text-sm text-[#595249] leading-relaxed font-light mb-8 max-w-lg">
              Situado no coração do Meireles, o Primer Restaurante combina
              conveniência urbana, estacionamento com manobrista (valet) e fácil
              acesso.
            </p>

            {/* Address Block */}
            <div className="mb-8 pb-8 border-b border-[#E8E2D5]">
              <h3 className="font-serif text-lg font-medium text-[#1A1714] mb-2">
                Endereço
              </h3>
              <p className="text-sm text-[#595249] leading-relaxed">
                {restaurantData.address.full}
              </p>
              <p className="text-xs text-[#857B6F] mt-1">
                CEP {restaurantData.address.zipCode} · Ponto de referência:
                Próximo à Av. Santos Dumont
              </p>

              <div className="mt-4 flex flex-wrap gap-4 text-xs font-medium">
                <a
                  href={restaurantData.address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1A1714] underline underline-offset-4 hover:text-[#595249] transition-colors"
                >
                  Abrir no Google Maps →
                </a>
                <span className="text-[#D8D2C6]">·</span>
                <span className="text-[#6B6358]">
                  Serviço de Valet na entrada
                </span>
              </div>
            </div>

            {/* Hours Table */}
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-medium text-[#1A1714] mb-2">
                Horário de Funcionamento
              </h3>
              <div className="divide-y divide-[#F0ECE1] text-xs">
                {restaurantData.hours.map((item, index) => (
                  <div
                    key={index}
                    className="py-2.5 flex items-baseline justify-between gap-4"
                  >
                    <div>
                      <span className="font-medium text-[#1A1714]">
                        {item.days}
                      </span>
                      <span className="text-[#7A7165] block sm:inline sm:ml-2">
                        ({item.meal})
                      </span>
                    </div>
                    <span className="font-medium text-[#1A1714] tabular-nums shrink-0">
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Stylized Clean Map Presentation */}
          <div className="lg:col-span-6">
            <div className="bg-[#F5F2EB] border border-[#E8E2D5] rounded-sm p-6 sm:p-8 text-left">
              {/* Architectural Pin Card */}
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <h4 className="font-serif text-xl font-medium text-[#1A1714]">
                    {restaurantData.name}
                  </h4>
                  <p className="text-xs text-[#6B6358] mt-1">
                    {restaurantData.address.street},{" "}
                    {restaurantData.address.neighborhood}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] uppercase tracking-wider text-[#857B6F] block">
                    Região
                  </span>
                  <span className="text-xs font-semibold text-[#1A1714]">
                    Meireles
                  </span>
                </div>
              </div>

              {/* Minimalist Map Visual Representation */}
              <div className="relative aspect-[16/10] bg-[#EAE4D7] rounded-sm overflow-hidden border border-[#DCD5C6] flex items-center justify-center p-6 text-center">
                {/* Clean stylized map lines in SVG */}
                <svg
                  className="absolute inset-0 w-full h-full opacity-35"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                  viewBox="0 0 400 250"
                >
                  <path
                    d="M0,40 L400,60"
                    stroke="#7A7165"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M0,130 L400,120"
                    stroke="#7A7165"
                    strokeWidth="3"
                    fill="none"
                  />
                  <path
                    d="M0,210 L400,200"
                    stroke="#7A7165"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <path
                    d="M80,0 L110,250"
                    stroke="#7A7165"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M220,0 L200,250"
                    stroke="#7A7165"
                    strokeWidth="3"
                    fill="none"
                  />
                  <path
                    d="M330,0 L350,250"
                    stroke="#7A7165"
                    strokeWidth="2"
                    fill="none"
                  />
                  <circle
                    cx="210"
                    cy="125"
                    r="14"
                    fill="#1A1714"
                    opacity="0.15"
                  />
                </svg>

                {/* Central pin card */}
                <div className="relative z-10 bg-[#FAF8F5] border border-[#1A1714] p-4 rounded-xs shadow-sm max-w-xs">
                  <p className="font-serif text-sm font-semibold text-[#1A1714]">
                    {restaurantData.name}
                  </p>
                  <p className="text-[11px] text-[#595249] mt-0.5">
                    {restaurantData.address.street}
                  </p>
                  <a
                    href={restaurantData.address.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2.5 text-[11px] font-medium text-[#FAF8F5] bg-[#1A1714] px-3 py-1.5 rounded-xs hover:bg-[#2A2622] transition-colors"
                  >
                    Navegar pelo GPS
                  </a>
                </div>
              </div>

              {/* Direct Touch Options */}
              <div className="mt-6 pt-6 border-t border-[#E0D9CB] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[#857B6F] block mb-0.5">
                    Telefone Fixo
                  </span>
                  <a
                    href={`tel:${restaurantData.contact.phoneFormatted}`}
                    className="font-medium text-[#1A1714] hover:underline"
                  >
                    {restaurantData.contact.phone}
                  </a>
                </div>

                <div>
                  <span className="text-[#857B6F] block mb-0.5">
                    WhatsApp Oficial
                  </span>
                  <a
                    href={buildWhatsAppUrl("general")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[#1A1714] hover:underline"
                  >
                    {restaurantData.contact.whatsappDisplay}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
