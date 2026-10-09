import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useEvents } from "../context/EventsContext";
import { 
  CATEGORIES, 
  NMIT_VENUES, 
  ANIMATION_THEMES 
} from "../data/initialEvents";
import { 
  Shield, 
  Users, 
  Calendar, 
  PlusCircle, 
  Edit3, 
  Trash2, 
  Download, 
  Search, 
  CheckCircle2, 
  MapPin, 
  Eye, 
  X,
  Palette,
  UserCheck
} from "lucide-react";

export const AdminPortal = () => {
  const { currentUser, setAdminPortalOpen, adminPortalOpen } = useAuth();
  const { 
    events, 
    registrations, 
    addEvent, 
    deleteEvent, 
    setEditingEvent, 
    setSelectedEvent, 
    animationSettings, 
    updateAnimationSettings, 
    showToast 
  } = useEvents();

  const [activeTab, setActiveTab] = useState("registrations");
  const [regSearch, setRegSearch] = useState("");
  const [selectedEventFilter, setSelectedEventFilter] = useState("all");

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("AI & ML");
  const [format, setFormat] = useState("In-Person");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("10:00 AM - 04:30 PM IST");
  const [location, setLocation] = useState(NMIT_VENUES[0]);
  const [price, setPrice] = useState("Free");
  const [description, setDescription] = useState("");
  const [tagsInput, setTagsInput] = useState("NMIT, AI, Developers");
  const [imageUrl, setImageUrl] = useState("https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80");

  if (!adminPortalOpen) return null;

  const filteredRegistrations = registrations.filter((reg) => {
    if (selectedEventFilter !== "all" && reg.eventId !== selectedEventFilter) {
      return false;
    }
    if (regSearch.trim() !== "") {
      const q = regSearch.toLowerCase().trim();
      return (
        reg.userName?.toLowerCase().includes(q) ||
        reg.userEmail?.toLowerCase().includes(q) ||
        reg.usn?.toLowerCase().includes(q) ||
        reg.branch?.toLowerCase().includes(q) ||
        reg.eventTitle?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleExportCSV = () => {
    if (!registrations.length) return;
    const headers = ["Registration ID", "Student Name", "Email", "USN", "Branch", "College", "Phone", "Event Title", "Registered At", "Status"];
    const rows = registrations.map((r) => [
      r.id,
      `"${r.userName}"`,
      r.userEmail,
      r.usn,
      r.branch,
      `"${r.college}"`,
      r.phone,
      `"${r.eventTitle}"`,
      `"${r.registeredAt}"`,
      r.status
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `NMIT_Event_Registrations_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Downloaded NMIT Registrations CSV!", "success");
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const newEvt = {
      title,
      category,
      categoryColor: category === "AI & ML" ? "#0284c7" : category === "Hackathons" ? "#f97316" : "#10b981",
      format,
      date: date || new Date().toISOString().split("T")[0],
      time,
      location,
      venueDetails: location,
      city: "Bengaluru",
      isVirtual: format === "Virtual" || format === "Hybrid",
      price: price || "Free",
      priceAmount: price.toLowerCase().includes("free") ? 0 : parseInt(price.replace(/[^0-9]/g, "")) || 199,
      organizer: "Department of CSE & GDG NMIT",
      image: imageUrl,
      description,
      tags: tags.length ? tags : ["NMIT", "Tech"],
      speakers: [
        {
          name: currentUser?.displayName || "NMIT Faculty Mentor",
          role: "Event Chairperson @ NMIT",
          avatar: currentUser?.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
        }
      ],
      agenda: [
        { time: "10:00 AM", title: "Inaugural Address at NMIT Auditorium", speaker: "HOD CSE" },
        { time: "01:30 PM", title: "Technical Hands-on Lab & Demonstration", speaker: "Industry Experts" }
      ]
    };

    addEvent(newEvt);
    setTitle("");
    setDescription("");
    setActiveTab("events");
  };

  return (
    <div className="admin-portal-overlay">
      <div className="admin-portal-container">
        {/* Admin Top Header */}
        <div className="admin-portal-header">
          <div className="admin-header-title-wrap">
            <div className="admin-badge-icon">
              <Shield size={24} className="text-amber-400" />
            </div>
            <div>
              <div className="admin-title-row">
                <h2 className="admin-portal-heading">NMIT Tech Administration Console</h2>
                <span className="admin-role-badge">Faculty & Coordinator Access</span>
              </div>
              <p className="admin-portal-desc">
                Logged in as <strong>{currentUser?.displayName}</strong> ({currentUser?.email}) • Nitte Meenakshi Institute of Technology
              </p>
            </div>
          </div>

          <button 
            className="admin-close-btn"
            onClick={() => setAdminPortalOpen(false)}
            aria-label="Close admin portal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Admin Quick Metrics Strip */}
        <div className="admin-stats-strip">
          <div className="admin-stat-box">
            <Calendar size={18} className="text-orange-400" />
            <div>
              <span className="admin-stat-number">{events.length}</span>
              <span className="admin-stat-label">Active Events</span>
            </div>
          </div>

          <div className="admin-stat-box">
            <UserCheck size={18} className="text-emerald-400" />
            <div>
              <span className="admin-stat-number">{registrations.length}</span>
              <span className="admin-stat-label">Student RSVPs Logged</span>
            </div>
          </div>

          <div className="admin-stat-box">
            <Users size={18} className="text-sky-400" />
            <div>
              <span className="admin-stat-number">
                {events.reduce((acc, curr) => acc + (curr.attendeesCount || 0), 0).toLocaleString()}
              </span>
              <span className="admin-stat-label">Total Participants</span>
            </div>
          </div>

          <div className="admin-stat-box">
            <Palette size={18} className="text-purple-400" />
            <div>
              <span className="admin-stat-number">{ANIMATION_THEMES.find(t => t.id === animationSettings?.themeId)?.name.split(" ")[0]}</span>
              <span className="admin-stat-label">Active Aura Theme</span>
            </div>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="admin-nav-tabs" role="tablist">
          <button
            className={`admin-nav-tab ${activeTab === "registrations" ? "active" : ""}`}
            onClick={() => setActiveTab("registrations")}
          >
            <Users size={16} />
            <span>Student Registrations ({registrations.length})</span>
          </button>

          <button
            className={`admin-nav-tab ${activeTab === "events" ? "active" : ""}`}
            onClick={() => setActiveTab("events")}
          >
            <Edit3 size={16} />
            <span>Manage & Edit Events ({events.length})</span>
          </button>

          <button
            className={`admin-nav-tab ${activeTab === "create" ? "active" : ""}`}
            onClick={() => setActiveTab("create")}
          >
            <PlusCircle size={16} />
            <span>Publish New NMIT Event</span>
          </button>

          <button
            className={`admin-nav-tab ${activeTab === "animation" ? "active" : ""}`}
            onClick={() => setActiveTab("animation")}
          >
            <Palette size={16} />
            <span>Background Animation & Color Schemes</span>
          </button>
        </div>

        {/* Tab 1: Student Registrations */}
        {activeTab === "registrations" && (
          <div className="admin-tab-pane">
            <div className="admin-table-controls">
              <div className="admin-search-wrap">
                <Search size={16} className="admin-search-icon" />
                <input
                  type="text"
                  placeholder="Search by student name, USN, email, branch..."
                  value={regSearch}
                  onChange={(e) => setRegSearch(e.target.value)}
                  className="admin-search-input"
                />
              </div>

              <select
                className="admin-event-filter-select"
                value={selectedEventFilter}
                onChange={(e) => setSelectedEventFilter(e.target.value)}
              >
                <option value="all">All NMIT Events</option>
                {events.map((ev) => (
                  <option key={ev.id} value={ev.id}>
                    {ev.title.substring(0, 35)}...
                  </option>
                ))}
              </select>

              <button className="admin-export-btn" onClick={handleExportCSV}>
                <Download size={15} />
                <span>Export CSV</span>
              </button>
            </div>

            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>USN & Branch</th>
                    <th>College / Dept</th>
                    <th>Registered Event</th>
                    <th>Time (IST)</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRegistrations.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="admin-empty-table">
                        No student registrations found matching your query.
                      </td>
                    </tr>
                  ) : (
                    filteredRegistrations.map((reg) => (
                      <tr key={reg.id}>
                        <td>
                          <div className="reg-student-cell">
                            <span className="reg-student-name">{reg.userName}</span>
                            <span className="reg-student-email">{reg.userEmail}</span>
                          </div>
                        </td>
                        <td>
                          <span className="reg-usn-badge">{reg.usn || "1NT22CS000"}</span>
                          <span className="reg-branch">{reg.branch || "CSE"}</span>
                        </td>
                        <td>
                          <span className="reg-college">{reg.college}</span>
                        </td>
                        <td>
                          <span className="reg-event-title" title={reg.eventTitle}>
                            {reg.eventTitle}
                          </span>
                        </td>
                        <td>
                          <span className="reg-time">{reg.registeredAt}</span>
                        </td>
                        <td>
                          <span className="reg-status-pill">
                            <CheckCircle2 size={12} /> {reg.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Manage & Edit Events */}
        {activeTab === "events" && (
          <div className="admin-tab-pane">
            <div className="admin-events-list">
              {events.map((ev) => (
                <div key={ev.id} className="admin-event-row-card">
                  <img src={ev.image} alt={ev.title} className="admin-event-row-img" />
                  
                  <div className="admin-event-row-info">
                    <div className="admin-event-row-meta">
                      <span 
                        className="category-badge"
                        style={{ backgroundColor: `${ev.categoryColor}25`, color: ev.categoryColor }}
                      >
                        {ev.category}
                      </span>
                      <span className="admin-event-format">{ev.format}</span>
                      <span className="admin-event-price">{ev.price}</span>
                    </div>

                    <h4 className="admin-event-row-title">{ev.title}</h4>
                    <p className="admin-event-row-loc">
                      <MapPin size={13} className="text-orange-400" />
                      <span>{ev.location}</span>
                    </p>
                    <div className="admin-event-row-stats">
                      <span><Calendar size={12} /> {ev.date} ({ev.time})</span>
                      <span><Users size={12} /> {ev.attendeesCount} attendees</span>
                    </div>
                  </div>

                  <div className="admin-event-row-actions">
                    <button
                      className="admin-action-btn edit-btn"
                      onClick={() => setEditingEvent(ev)}
                      title="Modify event details"
                    >
                      <Edit3 size={15} />
                      <span>Edit</span>
                    </button>

                    <button
                      className="admin-action-btn view-btn"
                      onClick={() => {
                        setSelectedEvent(ev);
                        setAdminPortalOpen(false);
                      }}
                      title="Preview public view"
                    >
                      <Eye size={15} />
                      <span>View</span>
                    </button>

                    <button
                      className="admin-action-btn delete-btn"
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete "${ev.title}"?`)) {
                          deleteEvent(ev.id);
                        }
                      }}
                      title="Delete event"
                    >
                      <Trash2 size={15} />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Publish New NMIT Event */}
        {activeTab === "create" && (
          <div className="admin-tab-pane">
            <form onSubmit={handleCreateSubmit} className="admin-create-form">
              <div className="form-grid-2">
                <div className="form-field full-width">
                  <label>Event Title *</label>
                  <input
                    type="text"
                    placeholder="e.g. NMIT Smart India Hackathon & AI Project Expo 2026"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="form-field">
                  <label>Category Track *</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    {CATEGORIES.filter(c => c !== "All").map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="form-field">
                  <label>Event Format *</label>
                  <select value={format} onChange={(e) => setFormat(e.target.value)}>
                    <option value="In-Person">In-Person (NMIT Campus)</option>
                    <option value="Hybrid">Hybrid (NMIT + Online Stream)</option>
                    <option value="Virtual">Virtual / Online</option>
                  </select>
                </div>

                <div className="form-field">
                  <label>Date *</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>

                <div className="form-field">
                  <label>Time & Duration</label>
                  <input
                    type="text"
                    placeholder="e.g. 09:30 AM - 05:00 PM IST"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>

                <div className="form-field full-width">
                  <label>NMIT Venue / Location *</label>
                  <select value={location} onChange={(e) => setLocation(e.target.value)}>
                    {NMIT_VENUES.map(v => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                </div>

                <div className="form-field">
                  <label>Ticket / Pricing (INR)</label>
                  <input
                    type="text"
                    placeholder="Free or ₹199"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>

                <div className="form-field">
                  <label>Cover Image URL</label>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                  />
                </div>

                <div className="form-field full-width">
                  <label>Tags (comma separated)</label>
                  <input
                    type="text"
                    placeholder="NMIT, AI, React, Hackathon, Bengaluru"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                  />
                </div>

                <div className="form-field full-width">
                  <label>Description & Highlights *</label>
                  <textarea
                    rows={4}
                    placeholder="Provide details about registration eligibility, prizes, agenda, and food/swag arrangements..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="admin-submit-btn">
                <PlusCircle size={18} />
                <span>Publish Event to NMIT DevBoard</span>
              </button>
            </form>
          </div>
        )}

        {/* Tab 4: Background Lighting & Pulse Wave Controller */}
        {activeTab === "animation" && (
          <div className="admin-tab-pane">
            <div className="animation-controller-card">
              <div className="anim-control-header">
                <Palette size={22} className="text-orange-400" />
                <div>
                  <h4 className="anim-title">Live Pulse Wave & Ambient Lighting Engine</h4>
                  <p className="anim-desc">
                    Customize the real-time background pulse waveforms, interactive cursor spotlight radius, and campus frequency harmonics.
                  </p>
                </div>
              </div>

              {/* Theme Preset Grid */}
              <div className="theme-presets-grid">
                {ANIMATION_THEMES.map((theme) => {
                  const isSelected = animationSettings?.themeId === theme.id;
                  return (
                    <div
                      key={theme.id}
                      className={`theme-preset-card ${isSelected ? "selected" : ""}`}
                      onClick={() => updateAnimationSettings({ themeId: theme.id })}
                    >
                      <div className="theme-color-dots">
                        <span className="color-dot" style={{ backgroundColor: theme.primaryGlow }} />
                        <span className="color-dot" style={{ backgroundColor: theme.secondaryGlow }} />
                        <span className="color-dot" style={{ backgroundColor: theme.accentGlow }} />
                      </div>
                      <h5 className="theme-preset-name">{theme.name}</h5>
                      {isSelected && (
                        <span className="theme-active-tag">
                          <CheckCircle2 size={13} /> Active
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Real-time Sliders */}
              <div className="sliders-section">
                <div className="slider-control-group">
                  <div className="slider-header">
                    <label>Interactive Cursor Spotlight Radius</label>
                    <span className="slider-value">{animationSettings?.spotlightRadius || 420}px</span>
                  </div>
                  <input
                    type="range"
                    min="200"
                    max="650"
                    step="10"
                    value={animationSettings?.spotlightRadius || 420}
                    onChange={(e) => updateAnimationSettings({ spotlightRadius: parseInt(e.target.value) })}
                    className="admin-slider"
                  />
                </div>

                <div className="slider-control-group">
                  <div className="slider-header">
                    <label>Pulse Wave Frequency & Speed</label>
                    <span className="slider-value">{animationSettings?.waveSpeed || 1.0}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="2.5"
                    step="0.1"
                    value={animationSettings?.waveSpeed || 1.0}
                    onChange={(e) => updateAnimationSettings({ waveSpeed: parseFloat(e.target.value) })}
                    className="admin-slider"
                  />
                </div>

                <div className="slider-control-group">
                  <div className="slider-header">
                    <label>Pulse Wave Amplitude / Height</label>
                    <span className="slider-value">{animationSettings?.waveAmplitude || 20}px</span>
                  </div>
                  <input
                    type="range"
                    min="6"
                    max="45"
                    step="2"
                    value={animationSettings?.waveAmplitude || 20}
                    onChange={(e) => updateAnimationSettings({ waveAmplitude: parseInt(e.target.value) })}
                    className="admin-slider"
                  />
                </div>

                <div className="toggles-grid-admin">
                  <label className="toggle-label">
                    <input
                      type="checkbox"
                      checked={animationSettings?.showPulseWaves !== false}
                      onChange={(e) => updateAnimationSettings({ showPulseWaves: e.target.checked })}
                    />
                    <span>Render Live Campus Frequency Waves</span>
                  </label>

                  <label className="toggle-label">
                    <input
                      type="checkbox"
                      checked={animationSettings?.showProximityGrid !== false}
                      onChange={(e) => updateAnimationSettings({ showProximityGrid: e.target.checked })}
                    />
                    <span>Enable Interactive Laser Proximity Grid</span>
                  </label>

                  <label className="toggle-label">
                    <input
                      type="checkbox"
                      checked={animationSettings?.showSpotlight !== false}
                      onChange={(e) => updateAnimationSettings({ showSpotlight: e.target.checked })}
                    />
                    <span>Enable Reactive Cursor Glow Spotlight</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
