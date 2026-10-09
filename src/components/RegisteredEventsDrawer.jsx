import React, { useEffect } from "react";
import { useEvents } from "../context/EventsContext";
import { useAuth } from "../context/AuthContext";
import { 
  X, 
  Ticket, 
  Trash2, 
  Calendar, 
  Clock, 
  MapPin, 
  ArrowUpRight, 
  Sparkles, 
  CheckCircle2, 
  GraduationCap,
  Building,
  Share2
} from "lucide-react";

export const RegisteredEventsDrawer = () => {
  const { 
    registeredDrawerOpen, 
    setRegisteredDrawerOpen, 
    events, 
    rsvps, 
    registrations, 
    cancelRegistration, 
    setSelectedEvent,
    showToast 
  } = useEvents();

  const { currentUser } = useAuth();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setRegisteredDrawerOpen(false);
      }
    };
    if (registeredDrawerOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [registeredDrawerOpen, setRegisteredDrawerOpen]);

  if (!registeredDrawerOpen) return null;

  // Filter registered events
  const userRegisteredEvents = events.filter((ev) => !!rsvps[ev.id]);

  const userEmail = currentUser?.email?.toLowerCase().trim();
  const userUid = currentUser?.uid;

  const handleSharePass = (event) => {
    const regDetail = registrations.find(
      (r) =>
        r.eventId === event.id &&
        ((userEmail && r.userEmail?.toLowerCase().trim() === userEmail) ||
         (userUid && r.userId === userUid))
    );
    const passInfo = `🎟️ NMIT Tech Pass for "${event.title}"\nDate: ${event.date} (${event.time})\nVenue: ${event.location}\nUSN: ${regDetail?.usn || currentUser?.usn || 'N/A'}\nStatus: Confirmed Pass`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(passInfo);
      showToast("Event Pass details copied to clipboard!", "success");
    }
  };

  return (
    <div className="drawer-backdrop" onClick={() => setRegisteredDrawerOpen(false)}>
      <aside 
        className="drawer-panel registered-drawer-panel" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="My Registered Events and Passes"
      >
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="drawer-title-row">
            <div className="drawer-icon-wrap registered-icon-wrap">
              <Ticket size={20} className="text-orange-400" />
            </div>
            <div>
              <h3 className="drawer-title">My Registered Passes</h3>
              <p className="drawer-subtitle">
                {userRegisteredEvents.length} active {userRegisteredEvents.length === 1 ? "pass" : "passes"} confirmed
              </p>
            </div>
          </div>

          <button 
            className="drawer-close-btn"
            onClick={() => setRegisteredDrawerOpen(false)}
            aria-label="Close drawer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="drawer-body">
          {userRegisteredEvents.length === 0 ? (
            <div className="drawer-empty-state">
              <div className="drawer-empty-icon registered-empty-icon">
                <Ticket size={40} className="text-muted" />
              </div>
              <h4>No Registered Passes Yet</h4>
              <p>
                Browse through NMIT hackathons, workshops, and tech summits, then click <strong>RSVP / Register</strong> on any event to secure your entry pass.
              </p>
              <button 
                className="drawer-browse-btn"
                onClick={() => setRegisteredDrawerOpen(false)}
              >
                <Sparkles size={16} />
                <span>Explore Events & Hackathons</span>
              </button>
            </div>
          ) : (
            <div className="registered-passes-list">
              {userRegisteredEvents.map((event) => {
                const reg = registrations.find(
                  (r) =>
                    r.eventId === event.id &&
                    ((userEmail && r.userEmail?.toLowerCase().trim() === userEmail) ||
                     (userUid && r.userId === userUid))
                );
                return (
                  <div key={event.id} className="ticket-pass-card">
                    {/* Ticket Header */}
                    <div className="ticket-pass-header">
                      <div className="ticket-badge-row">
                        <span className="ticket-category-tag" style={{ color: event.categoryColor || "var(--accent-orange)" }}>
                          {event.category}
                        </span>
                        <span className="ticket-status-confirmed">
                          <CheckCircle2 size={12} /> Confirmed
                        </span>
                      </div>
                      <h4 
                        className="ticket-event-title"
                        onClick={() => {
                          setSelectedEvent(event);
                          setRegisteredDrawerOpen(false);
                        }}
                      >
                        {event.title}
                      </h4>
                    </div>

                    {/* Ticket Details Strip */}
                    <div className="ticket-pass-meta">
                      <div className="ticket-meta-item">
                        <Calendar size={13} className="text-orange-400" />
                        <span>{event.date}</span>
                      </div>
                      <div className="ticket-meta-item">
                        <Clock size={13} className="text-sky-400" />
                        <span>{event.time}</span>
                      </div>
                      <div className="ticket-meta-item full">
                        <MapPin size={13} className="text-emerald-400" />
                        <span title={event.location}>{event.location}</span>
                      </div>
                    </div>

                    {/* Registration Pass Holder Info */}
                    <div className="ticket-holder-box">
                      <div className="holder-col">
                        <span className="holder-label">Participant</span>
                        <span className="holder-val">{reg?.userName || currentUser?.displayName || "Student"}</span>
                      </div>
                      <div className="holder-col text-right">
                        <span className="holder-label">USN / ID</span>
                        <span className="holder-val code">{reg?.usn || currentUser?.usn || "NMIT-PASS"}</span>
                      </div>
                    </div>

                    {/* Ticket Cutout Line */}
                    <div className="ticket-perforation">
                      <span className="perf-circle left" />
                      <span className="perf-line" />
                      <span className="perf-circle right" />
                    </div>

                    {/* Ticket Footer Actions */}
                    <div className="ticket-pass-footer">
                      <button
                        className="ticket-share-btn"
                        onClick={() => handleSharePass(event)}
                        title="Copy pass details"
                      >
                        <Share2 size={14} />
                        <span>Share Pass</span>
                      </button>

                      <button
                        className="ticket-view-btn"
                        onClick={() => {
                          setSelectedEvent(event);
                          setRegisteredDrawerOpen(false);
                        }}
                        title="View event specifications"
                      >
                        <ArrowUpRight size={14} />
                        <span>Details</span>
                      </button>

                      <button
                        className="ticket-cancel-btn"
                        onClick={(e) => cancelRegistration(event.id, currentUser?.email, e)}
                        title="Cancel registration"
                      >
                        <Trash2 size={14} />
                        <span>Cancel</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {userRegisteredEvents.length > 0 && (
          <div className="drawer-footer">
            <button 
              className="drawer-footer-btn"
              onClick={() => setRegisteredDrawerOpen(false)}
            >
              Close Passes
            </button>
          </div>
        )}
      </aside>
    </div>
  );
};
