/**
 * Dados centrais do Primer Restaurante
 * Estruturado para fácil substituição por CMS / API futura.
 */

export interface OpeningHourBlock {
  days: string;
  meal: string;
  hours: string;
}

export interface RestaurantHighlight {
  title: string;
  description: string;
}

export interface RestaurantData {
  name: string;
  shortName: string;
  tagline: string;
  headline: string;
  shortDescription: string;
  fullDescription: string[];
  address: {
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
    full: string;
    short: string;
    mapsUrl: string;
    embedQuery: string;
  };
  contact: {
    phone: string;
    phoneFormatted: string;
    whatsappNumber: string; // Digits only with country code
    whatsappDisplay: string;
    email: string;
    instagram: string;
    instagramUrl: string;
  };
  hours: OpeningHourBlock[];
  highlights: RestaurantHighlight[];
  reservationPolicy: {
    toleranceMinutes: number;
    advanceBookingDays: number;
    cancellationNoticeHours: number;
    eventsMinGuests: number;
  };
}

export const restaurantData: RestaurantData = {
  name: "Primer Restaurante",
  shortName: "Lô",
  tagline: "Gastronomia Contemporânea & Experiências",
  headline: "Alta gastronomia em um ambiente intimista e acolhedor.",
  shortDescription:
    "Cozinha autoral com ingredientes selecionados, técnicas refinadas e uma carta de vinhos primorosa para momentos memoráveis.",
  fullDescription: [
    "Inaugurado com o propósito de harmonizar a riqueza dos insumos brasileiros com a sofisticação da alta culinária internacional, o Primer Restaurante é um refúgio gastronômico em Fortaleza.",
    "Cada prato é concebido com respeito ao tempo dos ingredientes, privilegiando pescados frescos de nossa costa, carnes de cortes nobres e massas de produção artesanal.",
    "Com projeto arquitetônico que mescla luz natural, texturas orgânicas e iluminação intimista ao cair da noite, oferecemos o cenário ideal tanto para almoços executivos quanto para jantares românticos e celebrações especiais.",
  ],
  address: {
    street: "Rua Carlos Vasconcelos, 1090",
    neighborhood: "Meireles",
    city: "Fortaleza",
    state: "CE",
    zipCode: "60115-170",
    full: "Rua Carlos Vasconcelos, 1090 — Meireles, Fortaleza - CE",
    short: "Meireles, Fortaleza - CE",
    mapsUrl:
      "https://maps.google.com/?q=Rua+Carlos+Vasconcelos+1090+Fortaleza+CE",
    embedQuery: "Rua Carlos Vasconcelos, 1090, Meireles, Fortaleza, CE, Brazil",
  },
  contact: {
    phone: "(85) 3265-2288",
    phoneFormatted: "+55 85 3265-2288",
    whatsappNumber: "5585991823456",
    whatsappDisplay: "(85) 99182-3456",
    email: "reservas@lorestaurante.com.br",
    instagram: "@lorestaurante",
    instagramUrl: "https://www.instagram.com/lorestaurante",
  },
  hours: [
    {
      days: "Terça a Sexta",
      meal: "Almoço",
      hours: "12h00 às 15h00",
    },
    {
      days: "Sábado e Domingo",
      meal: "Almoço",
      hours: "12h30 às 16h00",
    },
    {
      days: "Terça a Sábado",
      meal: "Jantar",
      hours: "19h00 às 23h30",
    },
    {
      days: "Domingo à noite e Segunda-feira",
      meal: "Descanso semanal",
      hours: "Fechado",
    },
  ],
  highlights: [
    {
      title: "Cozinha Autoral",
      description:
        "Pratos que reinterpretam clássicos contemporâneos com o frescor de frutos do mar cearenses e técnicas de alta cozinha.",
    },
    {
      title: "Carta de Vinhos Curada",
      description:
        "Mais de 160 rótulos das principais regiões vinícolas mundiais, armazenados em adega climatizada sob supervisão de sommelier.",
    },
    {
      title: "Atendimento Intimista",
      description:
        "Hospitalidade atenta, acústica confortável e ambientes pensados para encontros fluidos e comemorações autênticas.",
    },
  ],
  reservationPolicy: {
    toleranceMinutes: 15,
    advanceBookingDays: 30,
    cancellationNoticeHours: 4,
    eventsMinGuests: 12,
  },
};

/**
 * Utilitário para montar links contextuais de WhatsApp com mensagens pré-formatadas.
 */
export function buildWhatsAppUrl(
  type: "reservation" | "menu_inquiry" | "general" | "event",
  params?: {
    name?: string;
    date?: string;
    time?: string;
    guests?: string;
    seatingArea?: string;
    notes?: string;
    dishName?: string;
  },
): string {
  const phone = restaurantData.contact.whatsappNumber;
  let text = "";

  switch (type) {
    case "reservation": {
      const parts = [
        "Olá! Gostaria de consultar disponibilidade de reserva no Primer Restaurante.",
      ];
      if (params?.name) parts.push(`• Nome: ${params.name}`);
      if (params?.date) parts.push(`• Data: ${params.date}`);
      if (params?.time) parts.push(`• Horário: ${params.time}`);
      if (params?.guests) parts.push(`• Pessoas: ${params.guests}`);
      if (params?.seatingArea) parts.push(`• Ambiente: ${params.seatingArea}`);
      if (params?.notes) parts.push(`• Observações: ${params.notes}`);
      text = parts.join("\n");
      break;
    }
    case "menu_inquiry": {
      if (params?.dishName) {
        text = `Olá! Gostaria de mais informações sobre o prato "${params.dishName}" do cardápio do Primer Restaurante.`;
      } else {
        text =
          "Olá! Gostaria de tirar uma dúvida sobre o cardápio e carta de vinhos do Primer Restaurante.";
      }
      break;
    }
    case "event": {
      text =
        "Olá! Gostaria de informações sobre reservas para eventos particulares ou corporativos no Primer Restaurante.";
      break;
    }
    case "general":
    default: {
      text = "Olá! Gostaria de falar com o atendimento do Primer Restaurante.";
      break;
    }
  }

  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}
