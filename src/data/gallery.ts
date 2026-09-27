/**
 * Galeria de imagens do ambiente, pratos e bastidores do Primer Restaurante
 */

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
    image: "/src/assets/images/hero_restaurant_dining_1790496411884.jpg",
    aspect: "landscape",
  },
  {
    id: "gal-2",
    title: "Cozinha & Autoria",
    category: "Cozinha",
    caption:
      "Técnicas clássicas e respeito meticuloso ao ponto de cada ingrediente.",
    image: "/src/assets/images/about_restaurant_chef_1790496425699.jpg",
    aspect: "standard",
  },
  {
    id: "gal-3",
    title: "Polvo Grelhado com Mousseline",
    category: "Gastronomia",
    caption:
      "Tentáculo braseado com mandioquinha, páprica defumada e ervas da estação.",
    image: "/src/assets/images/dish_octopus_polvo_1790496439849.jpg",
    aspect: "standard",
  },
  {
    id: "gal-4",
    title: "Tornedor ao Poivre & Risoto",
    category: "Gastronomia",
    caption:
      "Filé mignon em corte alto com demi-glace artesanal e arroz trufado.",
    image: "/src/assets/images/dish_filet_mignon_1790496453350.jpg",
    aspect: "standard",
  },
  {
    id: "gal-5",
    title: "Adega Climatizada",
    category: "Adega",
    caption:
      "Mais de 160 rótulos mundiais selecionados para harmonizações exclusivas.",
    image: "/src/assets/images/ambiance_wine_cellar_1790496464564.jpg",
    aspect: "standard",
  },
];
