/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { FeaturedMenu } from "./components/FeaturedMenu";
import { FullMenu } from "./components/FullMenu";
import { ExperienceGallery } from "./components/ExperienceGallery";
import { ReservationSection } from "./components/ReservationSection";
import { LocationHours } from "./components/LocationHours";
import { Footer } from "./components/Footer";
import { ReservationModal } from "./components/ReservationModal";

export default function App() {
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);

  const handleOpenReservation = () => {
    setIsReservationModalOpen(true);
  };

  const handleCloseReservation = () => {
    setIsReservationModalOpen(false);
  };

  const handleScrollToFullMenu = () => {
    const el = document.querySelector("#cardapio");
    if (el) {
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1714] font-sans flex flex-col selection:bg-[#2A2622] selection:text-[#FAF8F5]">
      {/* Primary Header */}
      <Header onOpenReservation={handleOpenReservation} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero */}
        <Hero onOpenReservation={handleOpenReservation} />

        {/* 2. Restaurant Story & Philosophy */}
        <About />

        {/* 3. Featured Signature Dishes */}
        <FeaturedMenu
          onExploreFullMenu={handleScrollToFullMenu}
          onOpenReservation={handleOpenReservation}
        />

        {/* 4. Complete Menu */}
        <FullMenu onOpenReservation={handleOpenReservation} />

        {/* 5. Atmosphere & Gallery */}
        <ExperienceGallery />

        {/* 6. Reservation Form & WhatsApp Integration */}
        <ReservationSection />

        {/* 7. Location, Schedule & Contact */}
        <LocationHours />
      </main>

      {/* Minimal Footer */}
      <Footer onOpenReservation={handleOpenReservation} />

      {/* Global Quick Reservation Modal */}
      <ReservationModal
        isOpen={isReservationModalOpen}
        onClose={handleCloseReservation}
      />
    </div>
  );
}
