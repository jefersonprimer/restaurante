import { useState } from "react";
import { restaurantData, buildWhatsAppUrl } from "../data/restaurant";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReservationModal({ isOpen, onClose }: ReservationModalProps) {
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
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState("");

  if (!isOpen) return null;

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

  const handleWhatsAppBooking = () => {
    const url = buildWhatsAppUrl("reservation", {
      name: name.trim() || undefined,
      date: formattedDate || date,
      time,
      guests: `${guests} pessoas`,
      seatingArea,
      notes: notes.trim() || undefined
    });
    window.open(url, "_blank", "noopener,noreferrer");
    onClose();
  };

  const handleDirectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const ref = `LO-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingRef(ref);
    setIsSuccess(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative max-w-lg w-full bg-[#FAF8F5] border border-[#E8E2D5] rounded-sm p-6 sm:p-8 text-left my-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-sm font-semibold text-[#857B6F] hover:text-[#1A1714] p-1 cursor-pointer"
          aria-label="Fechar modal"
        >
          ✕
        </button>

        {isSuccess ? (
          <div className="py-6 text-center">
            <div className="w-12 h-12 mx-auto mb-4 border border-[#1A1714] rounded-full flex items-center justify-center text-sm font-serif">
              ✓
            </div>
            <h3 className="font-serif text-2xl font-medium text-[#1A1714] mb-2">
              Solicitação Enviada
            </h3>
            <p className="text-xs text-[#7A7165] mb-4">
              Código de referência: <strong>{bookingRef}</strong>
            </p>
            <p className="text-xs text-[#595249] leading-relaxed mb-6">
              Registramos seu pedido para o dia <strong>{formattedDate || date}</strong> às <strong>{time}</strong> para <strong>{guests} pessoas</strong>. Para confirmação instantânea, você também pode enviar a mensagem via WhatsApp:
            </p>
            <div className="space-y-3">
              <button
                type="button"
                onClick={handleWhatsAppBooking}
                className="w-full py-3 text-xs font-medium tracking-wide text-[#FAF8F5] bg-[#1A1714] rounded-sm hover:bg-[#2A2622] transition-colors"
              >
                Abrir WhatsApp e Confirmar
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 text-xs font-medium text-[#595249] hover:text-[#1A1714]"
              >
                Concluir
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-[11px] uppercase tracking-widest text-[#857B6F] font-medium block mb-1">
                {restaurantData.name}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#1A1714]">
                Reservar Mesa
              </h3>
              <p className="text-xs text-[#6B6358] mt-1">
                Preencha os dados abaixo e confirme diretamente pelo WhatsApp ou site.
              </p>
            </div>

            <form onSubmit={handleDirectSubmit} className="space-y-4">
              {/* Turno */}
              <div>
                <label className="block text-[11px] font-medium uppercase tracking-wider text-[#6B6358] mb-1.5">
                  Turno
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleMealShiftChange("almoco")}
                    className={`py-2 text-xs font-medium rounded-xs border transition-colors cursor-pointer ${
                      mealShift === "almoco"
                        ? "bg-[#1A1714] text-[#FAF8F5] border-[#1A1714]"
                        : "bg-transparent text-[#595249] border-[#D8D2C6]"
                    }`}
                  >
                    Almoço
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMealShiftChange("jantar")}
                    className={`py-2 text-xs font-medium rounded-xs border transition-colors cursor-pointer ${
                      mealShift === "jantar"
                        ? "bg-[#1A1714] text-[#FAF8F5] border-[#1A1714]"
                        : "bg-transparent text-[#595249] border-[#D8D2C6]"
                    }`}
                  >
                    Jantar
                  </button>
                </div>
              </div>

              {/* Data & Horário */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-[#6B6358] mb-1.5">
                    Data
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#D8D2C6] rounded-xs px-3 py-2 text-xs text-[#1A1714] focus:outline-none focus:border-[#1A1714]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-[#6B6358] mb-1.5">
                    Horário
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#D8D2C6] rounded-xs px-3 py-2 text-xs text-[#1A1714] focus:outline-none focus:border-[#1A1714]"
                  >
                    {(mealShift === "almoco" ? lunchTimes : dinnerTimes).map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Pessoas & Espaço */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-[#6B6358] mb-1.5">
                    Pessoas
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#D8D2C6] rounded-xs px-3 py-2 text-xs text-[#1A1714] focus:outline-none focus:border-[#1A1714]"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "pessoa" : "pessoas"}
                      </option>
                    ))}
                    <option value="12+">Mais de 12 pessoas</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-[#6B6358] mb-1.5">
                    Ambiente
                  </label>
                  <select
                    value={seatingArea}
                    onChange={(e) => setSeatingArea(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#D8D2C6] rounded-xs px-3 py-2 text-xs text-[#1A1714] focus:outline-none focus:border-[#1A1714]"
                  >
                    <option value="Salão Principal">Salão Principal</option>
                    <option value="Mesa Romântica">Mesa Romântica</option>
                    <option value="Área Externa / Varanda">Área Externa / Varanda</option>
                    <option value="Próximo à Adega">Próximo à Adega</option>
                  </select>
                </div>
              </div>

              {/* Nome & Telefone */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-[#6B6358] mb-1.5">
                    Seu Nome *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nome completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#D8D2C6] rounded-xs px-3 py-2 text-xs text-[#1A1714] focus:outline-none focus:border-[#1A1714]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-[#6B6358] mb-1.5">
                    Telefone/WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(85) 99999-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#D8D2C6] rounded-xs px-3 py-2 text-xs text-[#1A1714] focus:outline-none focus:border-[#1A1714]"
                  />
                </div>
              </div>

              {/* Observações */}
              <div>
                <label className="block text-[11px] font-medium uppercase tracking-wider text-[#6B6358] mb-1.5">
                  Ocasião ou Observações
                </label>
                <input
                  type="text"
                  placeholder="Ex: Aniversário, restrições alimentares..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#D8D2C6] rounded-xs px-3 py-2 text-xs text-[#1A1714] focus:outline-none focus:border-[#1A1714]"
                />
              </div>

              {/* Actions */}
              <div className="pt-3 space-y-2">
                <button
                  type="button"
                  onClick={handleWhatsAppBooking}
                  className="w-full py-3 text-xs font-medium tracking-wide text-[#FAF8F5] bg-[#1A1714] rounded-sm hover:bg-[#2A2622] transition-colors cursor-pointer text-center"
                >
                  Enviar via WhatsApp
                </button>
                <button
                  type="submit"
                  className="w-full py-2.5 text-xs font-medium text-[#1A1714] border border-[#D8D2C6] rounded-sm hover:bg-[#F2ECE1] transition-colors cursor-pointer text-center"
                >
                  Solicitar confirmação por e-mail
                </button>
              </div>

              <p className="text-[11px] text-[#857B6F] text-center pt-2">
                Tolerância de 15 minutos · Cancelamento com até 4h de antecedência
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
