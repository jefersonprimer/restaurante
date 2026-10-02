/**
 * Galeria de imagens do ambiente, pratos e bastidores do Primer Restaurante
 */

import { images } from "./images";

export interface GalleryItem {
  id: string;
  title: string;
  category: "Ambiente" | "Cozinha" | "Gastronomia" | "Adega";
  caption: string;
  image: string;
  aspect: "landscape" | "portrait" | "standard";
}

export const galleryItems: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Salão Principal",
    category: "Ambiente",
    caption:
      "Iluminação intimista e conforto acústico para encontros especiais.",
    image: images.heroRestaurantDining,
    aspect: "landscape",
  },
  {
    id: "gal-2",
    title: "Cozinha & Autoria",
    category: "Cozinha",
    caption:
      "Técnicas clássicas e respeito meticuloso ao ponto de cada ingrediente.",
    image: images.aboutRestaurantChef,
    aspect: "standard",
  },
  {
    id: "gal-3",
    title: "Polvo Grelhado com Mousseline",
    category: "Gastronomia",
    caption:
      "Tentáculo braseado com mandioquinha, páprica defumada e ervas da estação.",
    image: images.dishOctopusPolvo,
    aspect: "standard",
  },
  {
    id: "gal-4",
    title: "Tornedor ao Poivre & Risoto",
    category: "Gastronomia",
    caption:
      "Filé mignon em corte alto com demi-glace artesanal e arroz trufado.",
    image: images.dishFiletMignon,
    aspect: "standard",
  },
  {
    id: "gal-5",
    title: "Adega Climatizada",
    category: "Adega",
    caption:
      "Mais de 160 rótulos mundiais selecionados para harmonizações exclusivas.",
    image: images.ambianceWineCellar,
    aspect: "standard",
  },
];
