import React, { useState, useEffect } from "react";
import { useEvents } from "../context/EventsContext";
import { useAuth } from "../context/AuthContext";
import { 
  X, 
  Heart, 
  Calendar, 
  Clock, 
  MapPin, 
  Globe, 
  Users, 
  Share2, 
  CalendarPlus, 
  Download,
  Check, 
  Ticket,
  Building
} from "lucide-react";

export const EventDetailModal = () => {
  const { 
    selectedEvent, 
    setSelectedEvent, 
    isFavourite, 
    toggleFavourite, 
    rsvps, 
    handleRsvpClick,
    showToast 
  } = useEvents();

  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedEvent(null);
      }
    };
    if (selectedEvent) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [selectedEvent, setSelectedEvent]);

  if (!selectedEvent) return null;

  const isFav = isFavourite(selectedEvent.id);
  const isRegistered = !!rsvps[selectedEvent.id];

  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent(selectedEvent.title);
    const details = encodeURIComponent(selectedEvent.description + "\n\nOrganized by: " + selectedEvent.organizer);
    const location = encodeURIComponent(selectedEvent.location || "NMIT Bengaluru");
    const dateFormatted = selectedEvent.date.replace(/-/g, "");
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dateFormatted}T090000Z/${dateFormatted}T180000Z`;
  };

  const handleShare = () => {
    const shareUrl = window.location.origin + "?event=" + selectedEvent.id;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      showToast("Event link copied to clipboard!", "success");
    } else {
      showToast("Sharing: " + selectedEvent.title, "info");
    }
  };

  const handleDownloadIcs = () => {
    const dateClean = selectedEvent.date.replace(/-/g, "");
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//NMIT DevBoard//Tech Events 2026//EN",
      "BEGIN:VEVENT",
      `SUMMARY:${selectedEvent.title}`,
      `DESCRIPTION:${selectedEvent.description.replace(/\n/g, "\\n")}`,
      `LOCATION:${selectedEvent.location}`,
      `DTSTART:${dateClean}T090000Z`,
      `DTEND:${dateClean}T180000Z`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", `${selectedEvent.id}-nmit-calendar.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Downloaded .ICS calendar file!", "success");
  };

  return (
    <div className="modal-backdrop" onClick={() => setSelectedEvent(null)}>
      <div 
        className="modal-container event-detail-modal" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-event-title"
      >
        <button 
          className="modal-close-btn" 
          onClick={() => setSelectedEvent(null)}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Modal Banner */}
        <div className="modal-banner-wrap">
          <img 
            src={selectedEvent.image} 
            alt={selectedEvent.title} 
            className="modal-banner-img" 
          />
          <div className="modal-banner-gradient" />

          <div className="modal-top-badges">
            <span 
              className="category-badge"
              style={{
                backgroundColor: `${selectedEvent.categoryColor}30`,
                borderColor: selectedEvent.categoryColor,
                color: selectedEvent.categoryColor || "#fff"
              }}
            >
              {selectedEvent.category}
            </span>
            <span className={`format-badge ${selectedEvent.format.toLowerCase()}`}>
              {selectedEvent.format === "Virtual" ? <Globe size={13} /> : <MapPin size={13} />}
              <span>{selectedEvent.format}</span>
            </span>
            <span className="price-tag-badge">
              {selectedEvent.price === "Free" ? "Free Admission" : selectedEvent.price}
            </span>
          </div>
        </div>

        {/* Modal Content Scroll Area */}
        <div className="modal-scroll-body">
          <div className="modal-header-section">
            <div className="modal-timing-strip">
              <div className="timing-item">
                <Calendar size={15} className="text-orange-400" />
                <span>{selectedEvent.date}</span>
              </div>
              <div className="timing-item">
                <Clock size={15} className="text-sky-400" />
                <span>{selectedEvent.time}</span>
              </div>
              <div className="timing-item">
                <MapPin size={15} className="text-emerald-400" />
                <span>{selectedEvent.location}</span>
              </div>
            </div>

            <h2 id="modal-event-title" className="modal-event-title">
              {selectedEvent.title}
            </h2>

            {/* Organizer Row */}
            <div className="modal-organizer-row">
              <div className="modal-org-left">
                <img 
                  src={selectedEvent.organizerAvatar} 
                  alt={selectedEvent.organizer} 
                  className="modal-org-avatar" 
                />
                <div>
                  <div className="modal-org-label">Organized by</div>
                  <div className="modal-org-name">{selectedEvent.organizer}</div>
                </div>
              </div>

              <div className="modal-attendees-pill">
                <Users size={15} className="text-sky-400" />
                <span><strong>{selectedEvent.attendeesCount?.toLocaleString()}</strong> Students Registered</span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="modal-tabs-nav" role="tablist">
            <button
              className={`modal-tab-btn ${activeTab === "overview" ? "active" : ""}`}
              onClick={() => setActiveTab("overview")}
              role="tab"
              aria-selected={activeTab === "overview"}
            >
              Overview & Details
            </button>
            <button
              className={`modal-tab-btn ${activeTab === "agenda" ? "active" : ""}`}
              onClick={() => setActiveTab("agenda")}
              role="tab"
              aria-selected={activeTab === "agenda"}
            >
              Agenda ({selectedEvent.agenda?.length || 0})
            </button>
            <button
              className={`modal-tab-btn ${activeTab === "speakers" ? "active" : ""}`}
              onClick={() => setActiveTab("speakers")}
              role="tab"
              aria-selected={activeTab === "speakers"}
            >
              Speakers & Mentors ({selectedEvent.speakers?.length || 0})
            </button>
          </div>

          {/* Tab Content Panes */}
          <div className="modal-tab-pane">
            {activeTab === "overview" && (
              <div className="tab-pane-overview">
                <h4 className="section-subheading">About the Event</h4>
                <p className="modal-full-desc">{selectedEvent.description}</p>

                <h4 className="section-subheading mt-4">Venue & Campus Location</h4>
                <div className="venue-highlight-box">
                  <Building size={18} className="text-orange-400 flex-shrink-0" />
                  <div>
                    <span className="venue-title">{selectedEvent.venueDetails || selectedEvent.location}</span>
                    <p className="venue-address">Nitte Meenakshi Institute of Technology, P.B.No.6429, Yelahanka, Bengaluru, Karnataka 560064</p>
                  </div>
                </div>

                <h4 className="section-subheading mt-4">Key Technologies & Tracks</h4>
                <div className="modal-tags-grid">
                  {selectedEvent.tags?.map((tag) => (
                    <span key={tag} className="modal-tag-chip">
                      #{tag}
                    </span>
                  ))}
                </div>

                <h4 className="section-subheading mt-4">Participant Perks & Benefits</h4>
                <ul className="modal-benefits-list">
                  <li>Direct interaction with Google Developer Experts & NMIT Senior Faculty</li>
                  <li>Hands-on code repositories, cloud credits & workshop certificates</li>
                  <li>Refreshments, lunch & official NMIT DevBoard event kit</li>
                  <li>Networking access for internships & campus placement referrals</li>
                </ul>
              </div>
            )}

            {activeTab === "agenda" && (
              <div className="tab-pane-agenda">
                <div className="agenda-timeline">
                  {selectedEvent.agenda && selectedEvent.agenda.length > 0 ? (
                    selectedEvent.agenda.map((item, idx) => (
                      <div key={idx} className="agenda-item">
                        <div className="agenda-time-col">
                          <span className="agenda-time-pill">{item.time}</span>
                        </div>
                        <div className="agenda-info-col">
                          <h5 className="agenda-title">{item.title}</h5>
                          {item.speaker && (
                            <span className="agenda-speaker">Speaker: {item.speaker}</span>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted">Full schedule will be released 24 hours prior to the event.</p>
                  )}
                </div>
              </div>
            )}

            {activeTab === "speakers" && (
              <div className="tab-pane-speakers">
                <div className="speakers-grid">
                  {selectedEvent.speakers && selectedEvent.speakers.length > 0 ? (
                    selectedEvent.speakers.map((sp, idx) => (
                      <div key={idx} className="speaker-card">
                        <img src={sp.avatar} alt={sp.name} className="speaker-avatar" />
                        <div className="speaker-info">
                          <h5 className="speaker-name">{sp.name}</h5>
                          <p className="speaker-role">{sp.role}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted">Speakers list will be finalized shortly.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Bottom Sticky Action Bar */}
        <div className="modal-footer-action-bar">
          <div className="action-bar-left">
            <button
              className={`modal-action-btn fav-btn ${isFav ? "is-fav" : ""}`}
              onClick={(e) => toggleFavourite(selectedEvent.id, e)}
              title={isFav ? "Remove from favourites" : "Save to favourites"}
            >
              <Heart size={18} className={isFav ? "fill-rose-500 text-rose-500" : ""} />
              <span>{isFav ? "Saved" : "Save"}</span>
            </button>

            <button 
              className="modal-action-btn icon-btn" 
              onClick={handleShare}
              title="Share event link"
            >
              <Share2 size={17} />
            </button>

            <a
              href={getGoogleCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-action-btn icon-btn"
              title="Add to Google Calendar"
            >
              <CalendarPlus size={17} />
            </a>

            <button
              className="modal-action-btn icon-btn"
              onClick={handleDownloadIcs}
              title="Download .ICS calendar invite"
            >
              <Download size={17} />
            </button>
          </div>

          <div className="action-bar-right">
            <button
              className={`modal-rsvp-primary-btn ${isRegistered ? "registered" : ""}`}
              onClick={(e) => handleRsvpClick(selectedEvent, currentUser?.email, e)}
            >
              {isRegistered ? (
                <>
                  <Check size={18} />
                  <span>Registration Confirmed (Click to Cancel)</span>
                </>
              ) : (
                <>
                  <Ticket size={18} />
                  <span>RSVP / Register Free ({currentUser?.displayName ? currentUser.displayName.split(" ")[0] : "Student"})</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
