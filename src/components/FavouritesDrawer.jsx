import React, { useEffect } from "react";
import { useEvents } from "../context/EventsContext";
import { 
  X, 
  Heart, 
  Trash2, 
  Calendar, 
  MapPin, 
  ArrowUpRight, 
  Sparkles, 
  Download,
  Share2
} from "lucide-react";

export const FavouritesDrawer = () => {
  const { 
    favouritesDrawerOpen, 
    setFavouritesDrawerOpen, 
    favouriteEvents, 
    toggleFavourite, 
    setSelectedEvent,
    showToast 
  } = useEvents();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setFavouritesDrawerOpen(false);
      }
    };
    if (favouritesDrawerOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [favouritesDrawerOpen, setFavouritesDrawerOpen]);

  if (!favouritesDrawerOpen) return null;

  // Export saved events list as text / markdown
  const handleExport = () => {
    if (!favouriteEvents.length) return;
    const summary = favouriteEvents
      .map((ev, i) => `${i + 1}. ${ev.title} (${ev.date}) - ${ev.location || "Online"} | ${ev.registrationUrl || ""}`)
      .join("\n");

    if (navigator.clipboard) {
      navigator.clipboard.writeText(summary);
      showToast("Favourites schedule copied to clipboard!", "success");
    }
  };

  return (
    <div className="drawer-backdrop" onClick={() => setFavouritesDrawerOpen(false)}>
      <aside 
        className="drawer-panel" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="My Favourites Collection"
      >
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="drawer-title-row">
            <div className="drawer-icon-wrap">
              <Heart size={20} className="fill-rose-500 text-rose-500" />
            </div>
            <div>
              <h3 className="drawer-title">My Saved Events</h3>
              <p className="drawer-subtitle">
                {favouriteEvents.length} {favouriteEvents.length === 1 ? "event" : "events"} bookmarked
              </p>
            </div>
          </div>

          <div className="drawer-header-actions">
            {favouriteEvents.length > 0 && (
              <button 
                className="drawer-action-btn"
                onClick={handleExport}
                title="Copy schedule list to clipboard"
                aria-label="Export schedule"
              >
                <Share2 size={16} />
              </button>
            )}
            <button 
              className="drawer-close-btn"
              onClick={() => setFavouritesDrawerOpen(false)}
              aria-label="Close drawer"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Drawer Body List */}
        <div className="drawer-body">
          {favouriteEvents.length === 0 ? (
            <div className="drawer-empty-state">
              <div className="drawer-empty-icon">
                <Heart size={40} className="text-muted" />
              </div>
              <h4>Your Collection is Empty</h4>
              <p>
                Browse through upcoming hackathons and workshops, then click the heart icon on any card to save your personalized agenda.
              </p>
              <button 
                className="drawer-browse-btn"
                onClick={() => setFavouritesDrawerOpen(false)}
              >
                <Sparkles size={16} />
                <span>Explore Events</span>
              </button>
            </div>
          ) : (
            <div className="drawer-items-list">
              {favouriteEvents.map((event) => (
                <div key={event.id} className="drawer-item-card">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="drawer-item-img"
                    onClick={() => {
                      setSelectedEvent(event);
                      setFavouritesDrawerOpen(false);
                    }}
                  />

                  <div className="drawer-item-info">
                    <span 
                      className="drawer-item-cat"
                      style={{ color: event.categoryColor || "var(--accent-purple)" }}
                    >
                      {event.category}
                    </span>
                    <h4 
                      className="drawer-item-title"
                      onClick={() => {
                        setSelectedEvent(event);
                        setFavouritesDrawerOpen(false);
                      }}
                      title={event.title}
                    >
                      {event.title}
                    </h4>

                    <div className="drawer-item-meta">
                      <span className="drawer-meta-item">
                        <Calendar size={12} /> {event.date}
                      </span>
                      <span className="drawer-meta-item">
                        <MapPin size={12} /> {event.city || event.location}
                      </span>
                    </div>
                  </div>

                  <div className="drawer-item-actions">
                    <button
                      className="drawer-remove-btn"
                      onClick={(e) => toggleFavourite(event.id, e)}
                      title="Remove from favourites"
                      aria-label={`Remove ${event.title} from favourites`}
                    >
                      <Trash2 size={16} />
                    </button>
                    <button
                      className="drawer-view-btn"
                      onClick={() => {
                        setSelectedEvent(event);
                        setFavouritesDrawerOpen(false);
                      }}
                      title="View full event specifications"
                      aria-label="View specifications"
                    >
                      <ArrowUpRight size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {favouriteEvents.length > 0 && (
          <div className="drawer-footer">
            <button 
              className="drawer-footer-btn"
              onClick={() => setFavouritesDrawerOpen(false)}
            >
              Continue Exploring
            </button>
          </div>
        )}
      </aside>
    </div>
  );
};
