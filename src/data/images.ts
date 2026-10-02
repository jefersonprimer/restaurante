/**
 * Central image registry.
 *
 * Assets are imported as ES modules so Vite fingerprints, optimizes and emits
 * them into the production bundle. Referencing them as literal "/src/..." strings
 * only works in `vite dev` and results in 404s on the deployed build.
 *
 * The emitted URLs are stable and unhashed (`/assets/images/<name>.jpg`) so that
 * the JSON-LD block in `index.html` — which cannot import from the module graph —
 * can point crawlers at the hero photo. Keep those two paths in sync.
 */
import heroRestaurantDining from "../assets/images/hero_restaurant_dining_1790496411884.jpg";
import aboutRestaurantChef from "../assets/images/about_restaurant_chef_1790496425699.jpg";
import dishOctopusPolvo from "../assets/images/dish_octopus_polvo_1790496439849.jpg";
import dishFiletMignon from "../assets/images/dish_filet_mignon_1790496453350.jpg";
import ambianceWineCellar from "../assets/images/ambiance_wine_cellar_1790496464564.jpg";

export const images = {
  heroRestaurantDining,
  aboutRestaurantChef,
  dishOctopusPolvo,
  dishFiletMignon,
  ambianceWineCellar,
} as const;
