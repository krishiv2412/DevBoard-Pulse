import React from "react";
import { useEvents } from "../context/EventsContext";
import { CATEGORIES } from "../data/initialEvents";
import { 
  Sparkles, 
  ArrowRight, 
  Calendar, 
  Users, 
  Trophy, 
  MapPin,
  Layers,
  Flame
} from "lucide-react";

export const Hero = () => {
  const { 
    events, 
    selectedCategory, 
    setSelectedCategory,
    setShowFavouritesOnly,
    showFavouritesOnly
  } = useEvents();

  const getCategoryCount = (category) => {
    if (category === "All") return events.length;
    return events.filter((e) => e.category === category).length;
  };

  const totalAttendees = events.reduce((sum, e) => sum + (e.attendeesCount || 0), 0);

  const scrollToEvents = () => {
    const el = document.getElementById("events-section") || document.getElementById("filter-bar");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollBy({ top: 450, behavior: "smooth" });
    }
  };

  return (
    <section className="hero-section modern-paradigm-hero" id="top">
      {/* Ambient background light orbs */}
      <div className="hero-ambient-glow" aria-hidden="true">
        <div className="glow-sphere glow-cyan" />
        <div className="glow-sphere glow-saffron" />
      </div>

      <div className="hero-content paradigm-hero-container">
        {/* Glowing Rim Glass Capsule Frame */}
        <div className="paradigm-capsule-frame">
          <div className="capsule-rim-light" aria-hidden="true" />
          
          {/* Subtle Top Tag */}
          <div className="paradigm-pill-tag">
            <span className="pill-dot" />
            <span>NMIT Bengaluru Flagship Conclaves</span>
            <Sparkles size={13} className="text-amber-400" />
          </div>

          {/* Grand Headline */}
          <h1 className="paradigm-title">
            Empowering NMIT's Next <br />
            <span className="paradigm-gradient-text">Tech Innovators</span>
          </h1>

          {/* Subtitle */}
          <p className="paradigm-subtitle">
            Discover premier hackathons, tech conclaves, and hands-on developer workshops. 
            Claim your verifiable digital passes in seconds.
          </p>

          {/* Sleek Action Pill Button */}
          <div className="paradigm-cta-wrap">
            <button 
              className="paradigm-cta-btn"
              onClick={scrollToEvents}
              aria-label="Explore Flagship Events"
            >
              <span>Explore Events</span>
              <ArrowRight size={16} className="cta-arrow" />
            </button>
          </div>

          {/* Minimalist Stats Strip */}
          <div className="paradigm-stats-strip">
            <div className="paradigm-stat-item">
              <span className="p-stat-val">{events.length}</span>
              <span className="p-stat-lbl">Active Events</span>
            </div>
            <div className="p-stat-sep" />
            <div className="paradigm-stat-item">
              <span className="p-stat-val">{totalAttendees.toLocaleString()}+</span>
              <span className="p-stat-lbl">Attendees</span>
            </div>
            <div className="p-stat-sep" />
            <div className="paradigm-stat-item">
              <span className="p-stat-val">₹2.5L+</span>
              <span className="p-stat-lbl">Prize Pools</span>
            </div>
            <div className="p-stat-sep" />
            <div className="paradigm-stat-item">
              <span className="p-stat-val">Yelahanka</span>
              <span className="p-stat-lbl">Campus Node</span>
            </div>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="paradigm-categories-bar" role="tablist" aria-label="Event Categories">
          <div className="categories-scroll-wrapper">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat && !showFavouritesOnly;
              const count = getCategoryCount(cat);

              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={isSelected}
                  className={`paradigm-cat-pill ${isSelected ? "active" : ""}`}
                  onClick={() => {
                    setShowFavouritesOnly(false);
                    setSelectedCategory(cat);
                  }}
                >
                  <span className="cat-pill-name">{cat}</span>
                  <span className="cat-pill-count">{count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
