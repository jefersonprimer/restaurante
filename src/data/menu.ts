/**
 * Cardápio completo do Primer Restaurante
 * Estrutura com categorias reais, descrições gastronômicas precisas e preços em Reais (BRL).
 */

import { images } from "./images";

export type MenuCategoryKey =
  | "entradas"
  | "principais"
  | "massas_risotos"
  | "carnes"
  | "frutos_do_mar"
  | "sobremesas"
  | "bebidas";

export interface MenuCategory {
  id: MenuCategoryKey;
  label: string;
  description: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number; // in BRL
  category: MenuCategoryKey;
  featured?: boolean;
  dietary?: string[]; // e.g. ["Sem Glúten", "Vegetariano", "Assinatura"]
  image?: string;
}

export const menuCategories: MenuCategory[] = [
  {
    id: "entradas",
    label: "Entradas",
    description: "Para compartilhar ou iniciar a experiência à mesa",
  },
  {
    id: "frutos_do_mar",
    label: "Frutos do Mar",
    description:
      "Pescados frescos da costa com técnicas mediterrâneas e locais",
  },
  {
    id: "carnes",
    label: "Carnes Nobres",
    description: "Cortes selecionados grelhados com reduções clássicas",
  },
  {
    id: "massas_risotos",
    label: "Massas & Risotos",
    description:
      "Massas de confecção artesanal e arrozes italianos aromatizados",
  },
  {
    id: "sobremesas",
    label: "Sobremesas",
    description: "Finalizações autorais equilibrando docilidade e contrastes",
  },
  {
    id: "bebidas",
    label: "Vinhos & Bar",
    description: "Coquetelaria clássica, autorais e rótulos selecionados",
  },
];

export const menuItems: MenuItem[] = [
  // --- ENTRADAS ---
  {
    id: "ent-1",
    name: "Carpaccio de Filé com Grana Padano",
    description:
      "Finas lâminas de filé mignon cru, azeite trufado, alcaparras crocantes empanadas, lascas generosas de Grana Padano 18 meses e crocante de focaccia de fermentação natural.",
    price: 68,
    category: "entradas",
    featured: true,
    dietary: ["Assinatura"],
  },
  {
    id: "ent-2",
    name: "Camarões Rosa Crocantes ao Brie",
    description:
      "Camarões rosa empanados em crosta leve de panko com recheio de queijo brie derretido, servidos com chutney artesanal de maracujá e redução balsâmica.",
    price: 84,
    category: "entradas",
    featured: false,
  },
  {
    id: "ent-3",
    name: "Burrata Cremosa com Tomates Confitados",
    description:
      "Burrata artesanal fresca, tomatinhos sweet grape assados lentamente com alho e tomilho, pesto genovês de manjericão e torradas de ciabatta rústica.",
    price: 64,
    category: "entradas",
    dietary: ["Vegetariano"],
  },
  {
    id: "ent-4",
    name: "Tartar de Atum Fresco com Avocado",
    description:
      "Atum fresco em cubos, emulsão suave de gergelim tostado, gomos de cítricos, emulsão de avocado e crocante de nori desidratado.",
    price: 76,
    category: "entradas",
    dietary: ["Sem Glúten"],
  },

  // --- FRUTOS DO MAR ---
  {
    id: "mar-1",
    name: "Polvo Grelhado com Mousseline de Batata-Baroa",
    description:
      "Tentáculo de polvo espanhol braseado e finalizado na grelha, purê aveludado de mandioquinha (batata-baroa), azeite aromático de páprica defumada, mini cebolas tostadas e brotos frescos.",
    price: 138,
    category: "frutos_do_mar",
    featured: true,
    dietary: ["Assinatura", "Sem Glúten"],
    image: images.dishOctopusPolvo,
  },
  {
    id: "mar-2",
    name: "Robalo Fresco em Crosta de Castanha de Caju",
    description:
      "Lombo de robalo grelhado com crosta crocante de castanha de caju regional, sobre leito de legumes salteados na manteiga clarificada e emulsão de limão siciliano.",
    price: 126,
    category: "frutos_do_mar",
    featured: false,
    dietary: ["Sem Glúten"],
  },
  {
    id: "mar-3",
    name: "Moqueca Contemporânea de Frutos do Mar",
    description:
      "Camarões pistola, lulas tenras e peixe do dia cozidos em redução suave de leite de coco artesanal, pimentões tostados e dendê leve, acompanhado de arroz de castanhas e farofa de dendê.",
    price: 142,
    category: "frutos_do_mar",
    dietary: ["Sem Glúten"],
  },

  // --- CARNES NOBRES ---
  {
    id: "car-1",
    name: "Tornedor de Filé Mignon ao Poivre",
    description:
      "Corte nobre alto de filé mignon bovino, molho clássico demi-glace aromatizado com grãos de pimenta-verde, guarnecido de risoto cremoso de queijo parmesão trufado.",
    price: 118,
    category: "carnes",
    featured: true,
    dietary: ["Assinatura"],
    image: images.dishFiletMignon,
  },
  {
    id: "car-2",
    name: "Carré de Cordeiro em Crosta de Ervas",
    description:
      "Costelinhas de cordeiro grelhadas com crosta de ervas de Provence e mostarda dijon, purê rústico de batatas inglesas trufadas e redução de vinho tinto do Douro.",
    price: 146,
    category: "carnes",
    featured: false,
  },
  {
    id: "car-3",
    name: "Ancho Angus com Batatas Rústicas e Chimichurri",
    description:
      "Ojo de bife Angus grelhado no ponto da casa, finalizado com flor de sal de Guérande, batatas douradas ao alho e alecrim e molho chimichurri fresco.",
    price: 122,
    category: "carnes",
    dietary: ["Sem Glúten"],
  },

  // --- MASSAS & RISOTOS ---
  {
    id: "mas-1",
    name: "Ravioli de Burrata ao Pomodoro Pelati",
    description:
      "Massa fresca artesanal fina recheada com burrata fresca cremosa, envolvida em molho de tomates San Marzano levemente adocicados, azeite extravirgem e folhas de manjericão fresco.",
    price: 88,
    category: "massas_risotos",
    featured: true,
    dietary: ["Vegetariano"],
  },
  {
    id: "mas-2",
    name: "Risoto de Camarões Rosa e Alho-Poró",
    description:
      "Arroz arbóreo italiano no ponto al dente, caldo artesanal de frutos do mar, camarões salteados ao vinho branco seco, alho-poró confitado e toque de raspas de limão siciliano.",
    price: 108,
    category: "massas_risotos",
    dietary: ["Sem Glúten"],
  },
  {
    id: "mas-3",
    name: "Gnocchi de Batata-Doce com Ragù de Costela",
    description:
      "Gnocchi artesanal de batata-doce dourado na manteiga de sálvia, servido com ragù de costela bovina desfiada cozida lentamente por 12 horas em vinho tinto e ervas.",
    price: 94,
    category: "massas_risotos",
  },

  // --- SOBREMESAS ---
  {
    id: "sob-1",
    name: "Petit Gâteau de Doce de Leite com Sorvete de Tapioca",
    description:
      "Bolo quente com coração cremoso de doce de leite artesanal de Viçosa, contrastado com sorvete artesanal de tapioca e leve pitada de flor de sal.",
    price: 44,
    category: "sobremesas",
    featured: true,
    dietary: ["Assinatura"],
  },
  {
    id: "sob-2",
    name: "Mil-Folhas de Baunilha Bourbon",
    description:
      "Massa folhada artesanal extremamente crocante, recheada com camadas generosas de creme pâtissière aromatizado com favas naturais de baunilha de Madagascar e calda de frutas vermelhas.",
    price: 42,
    category: "sobremesas",
    dietary: ["Vegetariano"],
  },
  {
    id: "sob-3",
    name: "Texturas de Chocolate Belga 70%",
    description:
      "Mousse aerada de chocolate amargo Callebaut, crumble crocante de cacau 100%, calda morna de chocolate e gelato de fior di latte.",
    price: 46,
    category: "sobremesas",
    dietary: ["Vegetariano"],
  },

  // --- BEBIDAS ---
  {
    id: "beb-1",
    name: "Negroni Clássico Lô",
    description:
      "Gin Tanqueray London Dry, Campari bitter italiano, Carpano Antica Formula e lâmina de casca de laranja bahia flambada.",
    price: 45,
    category: "bebidas",
  },
  {
    id: "beb-2",
    name: "Gin Tônica Botânica",
    description:
      "Gin super premium infusionado com botânicos frescos, água tônica artesanal Prata, bagas de zimbro e ramo de alecrim fresco maçaricado.",
    price: 46,
    category: "bebidas",
  },
  {
    id: "beb-3",
    name: "Taça de Vinho Tinto Selecionado (150ml)",
    description:
      "Rótulo selecionado pelo nosso sommelier para o dia (consulte as opções da nossa adega entre cortes bordaleses, Malbec argentino ou Douro português).",
    price: 48,
    category: "bebidas",
  },
  {
    id: "beb-4",
    name: "Águas, Sucos Naturais & Cafés Especiais",
    description:
      "Água San Pellegrino com gás, Acqua Panna, sucos naturais de frutas da estação e café espresso de microlotes com notas achocolatadas.",
    price: 18,
    category: "bebidas",
  },
];

export function formatBRL(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}
