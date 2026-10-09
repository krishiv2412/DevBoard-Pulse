import React from "react";
import { useEvents } from "../context/EventsContext";
import { useAuth } from "../context/AuthContext";
import { 
  Heart, 
  Calendar, 
  MapPin, 
  Globe, 
  Users, 
  Sparkles, 
  ArrowUpRight, 
  Check, 
  Ticket,
  Video,
  Building
} from "lucide-react";

export const EventCard = ({ event, viewMode = "grid" }) => {
  const { 
    isFavourite, 
    toggleFavourite, 
    rsvps, 
    handleRsvpClick, 
    setSelectedEvent,
    setSearchQuery 
  } = useEvents();

  const { currentUser } = useAuth();

  const isFav = isFavourite(event.id);
  const isRegistered = !!rsvps[event.id];
  const isNmitVenue = event.location?.includes("NMIT") || event.location?.includes("Yelahanka");

  const eventDate = new Date(event.date);
  const monthStr = eventDate.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
  const dayStr = eventDate.toLocaleDateString("en-US", { day: "2-digit" });
  const weekdayStr = eventDate.toLocaleDateString("en-US", { weekday: "short" });

  const today = new Date();
  const diffTime = eventDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  let countdownText = "";
  if (diffDays > 0) {
    countdownText = `in ${diffDays} ${diffDays === 1 ? "day" : "days"}`;
  } else if (diffDays === 0) {
    countdownText = "Today!";
  } else {
    countdownText = "Upcoming";
  }

  const handleTagClick = (tag, e) => {
    e.stopPropagation();
    setSearchQuery(tag);
  };

  return (
    <article 
      className={`event-card ${viewMode === "list" ? "event-card-list" : ""} ${event.featured ? "featured-card" : ""}`}
      onClick={() => setSelectedEvent(event)}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${event.title}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setSelectedEvent(event);
        }
      }}
    >
      {/* Card Image Banner */}
      <div className="card-image-wrap">
        <img 
          src={event.image} 
          alt={event.title} 
          className="card-image"
          loading="lazy" 
        />
        <div className="card-image-gradient-overlay" />

        {/* Top Floating Badges */}
        <div className="card-top-badges">
          <span 
            className="category-badge"
            style={{ 
              backgroundColor: `${event.categoryColor}25`,
              borderColor: `${event.categoryColor}80`,
              color: event.categoryColor || "var(--accent-orange)"
            }}
          >
            {event.category}
          </span>

          <span className={`format-badge ${event.format.toLowerCase()}`}>
            {event.format === "Virtual" ? <Globe size={12} /> : event.format === "Hybrid" ? <Sparkles size={12} /> : <MapPin size={12} />}
            <span>{event.format}</span>
          </span>

          {isNmitVenue && (
            <span className="nmit-venue-badge">
              <Building size={11} />
              <span>NMIT Campus</span>
            </span>
          )}
        </div>

        {/* Floating Heart / Favourite Button */}
        <button
          className={`card-fav-btn ${isFav ? "is-fav" : ""}`}
          onClick={(e) => toggleFavourite(event.id, e)}
          aria-label={isFav ? `Remove ${event.title} from favourites` : `Add ${event.title} to favourites`}
          title={isFav ? "Remove from favourites" : "Save to favourites"}
        >
          <Heart size={18} className={isFav ? "fill-current" : ""} />
        </button>

        {/* Price Tag Badge (INR) */}
        <div className={`card-price-badge ${event.price === "Free" ? "price-free" : "price-paid"}`}>
          {event.price === "Free" ? "Free Entry" : event.price}
        </div>
      </div>

      {/* Card Body Details */}
      <div className="card-body">
        {/* Date Row & Countdown */}
        <div className="card-meta-header">
          <div className="card-date-badge">
            <span className="date-badge-month">{monthStr}</span>
            <span className="date-badge-day">{dayStr}</span>
          </div>

          <div className="card-timing-info">
            <div className="timing-row">
              <Calendar size={13} />
              <span>{weekdayStr}, {event.date}</span>
              <span className="countdown-pill">{countdownText}</span>
            </div>
            <div className="timing-row location-row">
              {event.isVirtual ? <Video size={13} /> : <MapPin size={13} />}
              <span className="location-text" title={event.location}>
                {event.location.split(",")[0]}
              </span>
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className="card-title" title={event.title}>
          {event.title}
        </h3>

        {/* Description Snippet */}
        <p className="card-description">
          {event.description}
        </p>

        {/* Tags */}
        <div className="card-tags-list">
          {event.tags?.slice(0, 3).map((tag) => (
            <button
              key={tag}
              className="card-tag-pill"
              onClick={(e) => handleTagClick(tag, e)}
              title={`Filter by tag: ${tag}`}
            >
              #{tag}
            </button>
          ))}
          {event.tags?.length > 3 && (
            <span className="card-tag-more">+{event.tags.length - 3}</span>
          )}
        </div>

        {/* Footer: Organizer, Attendees & RSVP Quick Action */}
        <div className="card-footer">
          <div className="organizer-info">
            <img 
              src={event.organizerAvatar} 
              alt={event.organizer} 
              className="organizer-avatar"
            />
            <div className="organizer-text">
              <span className="organizer-name">{event.organizer}</span>
              <span className="attendees-count">
                <Users size={12} /> {event.attendeesCount?.toLocaleString()} registered
              </span>
            </div>
          </div>

          <div className="card-action-buttons">
            <button
              className={`card-rsvp-btn ${isRegistered ? "rsvp-done" : ""}`}
              onClick={(e) => handleRsvpClick(event, currentUser?.email, e)}
              title={isRegistered ? "You're registered! Click to cancel" : "RSVP and Register for this event"}
              aria-label={isRegistered ? "Cancel registration" : "RSVP now"}
            >
              {isRegistered ? (
                <>
                  <Check size={14} />
                  <span>RSVP'd</span>
                </>
              ) : (
                <>
                  <Ticket size={14} />
                  <span>RSVP</span>
                </>
              )}
            </button>

            <button 
              className="card-details-btn"
              onClick={() => setSelectedEvent(event)}
              aria-label="View event details"
              title="View full event details"
            >
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
