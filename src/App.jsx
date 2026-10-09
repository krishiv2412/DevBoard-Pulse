import React, { useState, useEffect } from "react";
import { AuthProvider } from "./context/AuthContext";
import { EventsProvider } from "./context/EventsContext";
import { BackgroundCanvas } from "./components/BackgroundCanvas";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { FilterBar } from "./components/FilterBar";
import { EventList } from "./components/EventList";
import { EventDetailModal } from "./components/EventDetailModal";
import { EditEventModal } from "./components/EditEventModal";
import { AdminPortal } from "./components/AdminPortal";
import { FavouritesDrawer } from "./components/FavouritesDrawer";
import { RegisteredEventsDrawer } from "./components/RegisteredEventsDrawer";
import { AuthModal } from "./components/AuthModal";
import { CreateEventModal } from "./components/CreateEventModal";
import { RegistrationModal } from "./components/RegistrationModal";
import { FirebaseConfigModal } from "./components/FirebaseConfigModal";
import { ToastContainer } from "./components/Toast";
import { Footer } from "./components/Footer";

function AppContent() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("devboard_theme") || "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("devboard_theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className="app-container">
      {/* Dynamic Animated Interactive Canvas Background */}
      <BackgroundCanvas />

      {/* Navigation Bar */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Main Content Area */}
      <main className="main-content">
        <Hero />
        <FilterBar />
        <EventList />
      </main>

      {/* Drawers and Modals */}
      <EventDetailModal />
      <EditEventModal />
      <AdminPortal />
      <FavouritesDrawer />
      <RegisteredEventsDrawer />
      <AuthModal />
      <CreateEventModal />
      <RegistrationModal />
      <FirebaseConfigModal />
      <ToastContainer />

      {/* Modern Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <EventsProvider>
        <AppContent />
      </EventsProvider>
    </AuthProvider>
  );
}
