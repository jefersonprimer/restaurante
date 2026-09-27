import { useState } from "react";
import { restaurantData, buildWhatsAppUrl } from "../data/restaurant";

export function ReservationSection() {
  // Tomorrow as default date in YYYY-MM-DD
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDateStr = tomorrow.toISOString().split("T")[0];

  const [date, setDate] = useState(defaultDateStr);
  const [mealShift, setMealShift] = useState<"almoco" | "jantar">("jantar");
  const [time, setTime] = useState("20:00");
  const [guests, setGuests] = useState("2");
  const [seatingArea, setSeatingArea] = useState("Salão Principal");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [submittedBooking, setSubmittedBooking] = useState<{
    code: string;
    date: string;
    time: string;
    guests: string;
  } | null>(null);

  const lunchTimes = ["12:00", "12:30", "13:00", "13:30", "14:00"];
  const dinnerTimes = ["19:00", "19:30", "20:00", "20:30", "21:00", "21:30"];

  const handleMealShiftChange = (shift: "almoco" | "jantar") => {
    setMealShift(shift);
    setTime(shift === "almoco" ? lunchTimes[0] : dinnerTimes[2]);
  };

  const formattedDate = date
    ? new Date(date + "T00:00:00").toLocaleDateString("pt-BR", {
        weekday: "short",
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      })
    : "";

  const handleDirectWhatsAppBooking = () => {
    const url = buildWhatsAppUrl("reservation", {
      name: name.trim() || undefined,
      date: formattedDate || date,
      time,
      guests: `${guests} pessoas`,
      seatingArea,
      notes: notes.trim() || undefined
    });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleSiteBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    // Generate mock reservation code e.g. LO-7482
    const code = `LO-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedBooking({
      code,
      date: formattedDate || date,
      time,
      guests
    });
  };

  return (
    <section id="contato" className="py-20 lg:py-28 bg-[#F5F2EB] border-t border-[#E8E2D5]">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-[#857B6F] font-medium block mb-2">
            Reservas & Atendimento
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1714] font-normal tracking-tight mb-4">
            Reserve sua Mesa
          </h2>
          <p className="text-sm text-[#595249] leading-relaxed font-light">
            Planeje sua experiência gastronômica com antecedência. Confirme diretamente pelo WhatsApp com nossa equipe de concierge.
          </p>
        </div>

        {submittedBooking ? (
          /* Confirmation State */
          <div className="bg-[#FAF8F5] border border-[#E8E2D5] p-8 sm:p-12 text-center rounded-sm max-w-xl mx-auto">
            <div className="w-12 h-12 mx-auto mb-4 border border-[#1A1714] rounded-full flex items-center justify-center text-sm font-serif">
              ✓
            </div>
            <h3 className="font-serif text-2xl font-medium text-[#1A1714] mb-2">
              Solicitação Recebida com Sucesso
            </h3>
            <p className="text-xs text-[#7A7165] mb-6">
              Código de referência: <strong className="text-[#1A1714] font-semibold">{submittedBooking.code}</strong>
            </p>

            <div className="bg-[#F5F2EB] p-4 rounded-xs text-xs text-[#595249] space-y-1.5 mb-6 text-left">
              <div className="flex justify-between">
                <span className="text-[#7A7165]">Data:</span>
                <span className="font-medium text-[#1A1714]">{submittedBooking.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A7165]">Horário:</span>
                <span className="font-medium text-[#1A1714]">{submittedBooking.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A7165]">Convidados:</span>
                <span className="font-medium text-[#1A1714]">{submittedBooking.guests} pessoas</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A7165]">Ambiente:</span>
                <span className="font-medium text-[#1A1714]">{seatingArea}</span>
              </div>
            </div>

            <p className="text-xs text-[#6B6358] mb-6 leading-relaxed">
              Nossa equipe entrará em contato via WhatsApp para confirmar os detalhes. Você também pode adiantar a confirmação agora mesmo:
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleDirectWhatsAppBooking}
                className="w-full py-3 text-xs font-medium tracking-wide text-[#FAF8F5] bg-[#1A1714] rounded-sm hover:bg-[#2A2622] transition-colors"
              >
                Confirmar agora no WhatsApp
              </button>
              <button
                type="button"
                onClick={() => setSubmittedBooking(null)}
                className="w-full py-3 text-xs font-medium text-[#595249] border border-[#D8D2C6] rounded-sm hover:bg-[#FAF8F5] transition-colors"
              >
                Fazer nova solicitação
              </button>
            </div>
          </div>
        ) : (
          /* Interactive Reservation Form */
          <div className="bg-[#FAF8F5] border border-[#E8E2D5] p-6 sm:p-10 rounded-sm">
            <form onSubmit={handleSiteBookingSubmit} className="space-y-6 text-left">
              {/* Row 1: Date & Meal Shift */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-medium text-[#595249] uppercase tracking-wider mb-2">
                    Data da Reserva *
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#D8D2C6] rounded-xs px-3.5 py-2.5 text-sm text-[#1A1714] focus:outline-none focus:border-[#1A1714] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#595249] uppercase tracking-wider mb-2">
                    Turno *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleMealShiftChange("almoco")}
                      className={`py-2.5 text-xs font-medium rounded-xs border transition-colors cursor-pointer ${
                        mealShift === "almoco"
                          ? "bg-[#1A1714] text-[#FAF8F5] border-[#1A1714]"
                          : "bg-transparent text-[#595249] border-[#D8D2C6] hover:text-[#1A1714]"
                      }`}
                    >
                      Almoço
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMealShiftChange("jantar")}
                      className={`py-2.5 text-xs font-medium rounded-xs border transition-colors cursor-pointer ${
                        mealShift === "jantar"
                          ? "bg-[#1A1714] text-[#FAF8F5] border-[#1A1714]"
                          : "bg-transparent text-[#595249] border-[#D8D2C6] hover:text-[#1A1714]"
                      }`}
                    >
                      Jantar
                    </button>
                  </div>
                </div>
              </div>

              {/* Row 2: Time Slots & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-medium text-[#595249] uppercase tracking-wider mb-2">
                    Horário Disponível *
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {(mealShift === "almoco" ? lunchTimes : dinnerTimes).map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setTime(slot)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-xs border transition-colors cursor-pointer ${
                          time === slot
                            ? "bg-[#1A1714] text-[#FAF8F5] border-[#1A1714]"
                            : "bg-transparent text-[#595249] border-[#D8D2C6] hover:text-[#1A1714]"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#595249] uppercase tracking-wider mb-2">
                    Número de Pessoas *
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#D8D2C6] rounded-xs px-3.5 py-2.5 text-sm text-[#1A1714] focus:outline-none focus:border-[#1A1714] transition-colors"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "pessoa" : "pessoas"}
                      </option>
                    ))}
                    <option value="12+">Mais de 12 pessoas (Evento Privado)</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Seating Preference */}
              <div>
                <label className="block text-xs font-medium text-[#595249] uppercase tracking-wider mb-2">
                  Preferência de Espaço
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {[
                    "Salão Principal",
                    "Mesa Romântica",
                    "Área Externa / Varanda",
                    "Próximo à Adega"
                  ].map((area) => (
                    <button
                      key={area}
                      type="button"
                      onClick={() => setSeatingArea(area)}
                      className={`py-2 px-2 text-xs font-medium rounded-xs border text-center transition-colors cursor-pointer ${
                        seatingArea === area
                          ? "bg-[#1A1714] text-[#FAF8F5] border-[#1A1714]"
                          : "bg-transparent text-[#595249] border-[#D8D2C6] hover:text-[#1A1714]"
                      }`}
                    >
                      {area}
                    </button>
                  ))}
                </div>
              </div>

              {/* Row 4: Customer Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div>
                  <label className="block text-xs font-medium text-[#595249] uppercase tracking-wider mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Roberto Silveira"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#D8D2C6] rounded-xs px-3.5 py-2.5 text-sm text-[#1A1714] focus:outline-none focus:border-[#1A1714] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#595249] uppercase tracking-wider mb-2">
                    Telefone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(85) 99999-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#D8D2C6] rounded-xs px-3.5 py-2.5 text-sm text-[#1A1714] focus:outline-none focus:border-[#1A1714] transition-colors"
                  />
                </div>
              </div>

              {/* Row 5: Notes */}
              <div>
                <label className="block text-xs font-medium text-[#595249] uppercase tracking-wider mb-2">
                  Observações ou Comemoração (Opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ex: Aniversário de casamento, restrição a frutos do mar..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#D8D2C6] rounded-xs px-3.5 py-2.5 text-sm text-[#1A1714] focus:outline-none focus:border-[#1A1714] transition-colors"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                <button
                  type="button"
                  onClick={handleDirectWhatsAppBooking}
                  className="w-full sm:w-auto px-8 py-3.5 text-xs font-medium tracking-wide text-[#FAF8F5] bg-[#1A1714] rounded-sm hover:bg-[#2A2622] transition-colors cursor-pointer text-center"
                >
                  Confirmar via WhatsApp
                </button>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 text-xs font-medium tracking-wide text-[#1A1714] border border-[#D8D2C6] rounded-sm hover:bg-[#F2ECE1] transition-colors cursor-pointer text-center"
                >
                  Solicitar pelo site
                </button>

                <div className="text-xs text-[#7A7165] text-left sm:ml-auto">
                  <span>Tolerância de 15 minutos</span>
                  <span className="mx-2">·</span>
                  <span>Sem cobrança antecipada</span>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Contact Strip */}
        <div className="mt-8 pt-6 border-t border-[#E8E2D5] flex flex-wrap items-center justify-between gap-4 text-xs text-[#6B6358] text-left">
          <div>
            <span>Dúvidas ou eventos corporativos? Fale conosco: </span>
            <a
              href={`tel:${restaurantData.contact.phoneFormatted}`}
              className="text-[#1A1714] font-medium hover:underline"
            >
              {restaurantData.contact.phone}
            </a>
            <span className="mx-2">·</span>
            <a
              href={buildWhatsAppUrl("event")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1A1714] font-medium hover:underline"
            >
              Eventos no WhatsApp
            </a>
          </div>

          <div>
            <span>Instagram: </span>
            <a
              href={restaurantData.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1A1714] font-medium hover:underline"
            >
              {restaurantData.contact.instagram}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
