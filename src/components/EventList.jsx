import React from "react";
import { useEvents } from "../context/EventsContext";
import { useAuth } from "../context/AuthContext";
import { EventCard } from "./EventCard";
import { 
  SearchX, 
  RotateCcw, 
  Heart, 
  Sparkles,
  Ticket,
  Trophy,
  Compass,
  ArrowUp,
  ShieldCheck,
  Zap,
  QrCode,
  Award
} from "lucide-react";

export const EventList = () => {
  const { 
    filteredEvents, 
    loading, 
    viewMode, 
    searchQuery, 
    showFavouritesOnly, 
    resetFilters,
    favourites,
    setRegisteredDrawerOpen,
    setSelectedCategory
  } = useEvents();

  const { currentUser, setAuthModalOpen } = useAuth();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleMyPassesClick = () => {
    if (!currentUser) {
      setAuthModalOpen(true);
    } else {
      setRegisteredDrawerOpen(true);
    }
  };

  // Skeleton Loading State
  if (loading) {
    return (
      <div className={`events-grid ${viewMode === "list" ? "events-grid-list-view" : ""}`}>
        {[1, 2, 3, 4, 5, 6].map((idx) => (
          <div key={idx} className="event-card-skeleton">
            <div className="skeleton-banner" />
            <div className="skeleton-content">
              <div className="skeleton-line skeleton-title" />
              <div className="skeleton-line skeleton-meta" />
              <div className="skeleton-line skeleton-desc" />
              <div className="skeleton-footer">
                <div className="skeleton-avatar" />
                <div className="skeleton-btn" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // No Results State
  if (filteredEvents.length === 0) {
    if (showFavouritesOnly && favourites.length === 0) {
      return (
        <div className="empty-state-card">
          <div className="empty-icon-wrap">
            <Heart size={36} className="text-rose-400" />
          </div>
          <h3 className="empty-title">No Saved Events Yet</h3>
          <p className="empty-text">
            You haven't bookmarked any events to your collection. Browse the explore feed and click the heart icon on any event to save it here.
          </p>
          <button 
            className="empty-action-btn primary"
            onClick={resetFilters}
          >
            <Sparkles size={16} />
            <span>Explore All Events</span>
          </button>
        </div>
      );
    }

    return (
      <div className="empty-state-card">
        <div className="empty-icon-wrap">
          <SearchX size={36} className="text-cyan-400" />
        </div>
        <h3 className="empty-title">No Matching Events Found</h3>
        <p className="empty-text">
          {searchQuery
            ? `We couldn't find any events matching "${searchQuery}". Try adjusting your keywords or clearing active filters.`
            : "No events match the selected category and format criteria."}
        </p>
        <div className="empty-actions-row">
          <button 
            className="empty-action-btn primary"
            onClick={resetFilters}
          >
            <RotateCcw size={16} />
            <span>Reset All Filters</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="events-list-section" aria-label="Events Feed" id="events-section">
      <div className={`events-grid ${viewMode === "list" ? "events-grid-list-view" : ""}`}>
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} viewMode={viewMode} />
        ))}
      </div>

      {/* Modern Participant Conclave Features Showcase */}
      <div className="conclave-features-section" id="conclave-features">
        <div className="features-section-header" style={{ display: "block", textAlign: "center", margin: "0 auto 36px auto", visibility: "visible", opacity: 1 }}>
          <div className="features-badge" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <Zap size={13} className="text-amber-400" />
            <span>CAMPUS EVENT ECOSYSTEM</span>
          </div>
          <h3 className="features-headline" style={{ color: "#ffffff", fontSize: "1.85rem", fontWeight: 800, margin: "8px 0", letterSpacing: "-0.02em", display: "block" }}>
            Everything You Need To Build & Compete
          </h3>
          <p className="features-subtext" style={{ color: "#94a3b8", fontSize: "0.92rem", lineHeight: 1.6, maxWidth: "640px", margin: "0 auto", display: "block" }}>
            DevBoard Pulse connects students directly with faculty-backed hackathons, club conclaves, and prize bounties across NMIT Bengaluru.
          </p>
        </div>

        <div className="features-cards-grid">
          {/* Feature 1 */}
          <div className="feature-card">
            <div className="feature-icon-wrap bg-cyan-glow">
              <QrCode size={22} className="text-sky-400" />
            </div>
            <h4 className="feature-card-title">Instant QR Digital Passes</h4>
            <p className="feature-card-desc">
              RSVP with one click to generate an encrypted digital pass with live campus entry QR codes, isolated per student account.
            </p>
            <button 
              className="feature-action-link"
              onClick={handleMyPassesClick}
            >
              <span>{currentUser ? "View My Passes →" : "Sign In to View Passes →"}</span>
            </button>
          </div>

          {/* Feature 2 */}
          <div className="feature-card">
            <div className="feature-icon-wrap bg-orange-glow">
              <Trophy size={22} className="text-orange-400" />
            </div>
            <h4 className="feature-card-title">₹2.5L+ Prize Bounties</h4>
            <p className="feature-card-desc">
              Compete in official college hackathons with cash prizes, sponsored incubation grants, and Google & FOSS swag kits.
            </p>
            <button 
              className="feature-action-link"
              onClick={() => { setSelectedCategory("Hackathons"); scrollToTop(); }}
            >
              <span>Browse Hackathons →</span>
            </button>
          </div>

          {/* Feature 3 */}
          <div className="feature-card">
            <div className="feature-icon-wrap bg-emerald-glow">
              <Award size={22} className="text-emerald-400" />
            </div>
            <h4 className="feature-card-title">Verifiable Certificates</h4>
            <p className="feature-card-desc">
              Earn recognized participation & winner certificates validated by NMIT academic departments and industry partners.
            </p>
            <button 
              className="feature-action-link"
              onClick={scrollToTop}
            >
              <span>Explore Conclaves →</span>
            </button>
          </div>
        </div>

        {/* Back to Top Floating Pill */}
        <div className="feed-scroll-top-wrap">
          <button 
            className="feed-scroll-top-btn"
            onClick={scrollToTop}
            title="Scroll back to top"
            aria-label="Back to top"
          >
            <span>Back to Top</span>
            <ArrowUp size={15} />
          </button>
        </div>
      </div>
    </section>
  );
};
