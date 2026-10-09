import React, { useState } from "react";
import { useEvents } from "../context/EventsContext";
import { useAuth } from "../context/AuthContext";
import { CATEGORIES } from "../data/initialEvents";
import { 
  X, 
  Plus, 
  Sparkles 
} from "lucide-react";

export const CreateEventModal = () => {
  const { createEventModalOpen, setCreateEventModalOpen, addEvent } = useEvents();
  const { currentUser } = useAuth();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("AI & ML");
  const [format, setFormat] = useState("Virtual");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("10:00 AM - 04:00 PM EST");
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("Online");
  const [price, setPrice] = useState("Free");
  const [description, setDescription] = useState("");
  const [tagsInput, setTagsInput] = useState("React, AI, Cloud");
  const [imageUrl, setImageUrl] = useState("https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80");

  if (!createEventModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const newEvent = {
      title,
      category,
      categoryColor: category === "AI & ML" ? "#8b5cf6" : category === "Hackathons" ? "#06b6d4" : "#ec4899",
      format,
      date: date || new Date().toISOString().split("T")[0],
      time,
      location: location || (format === "Virtual" ? "Global Livestream" : "Tech Convention Center"),
      city: city || (format === "Virtual" ? "Online" : "San Francisco"),
      isVirtual: format === "Virtual" || format === "Hybrid",
      price: price || "Free",
      priceAmount: price.toLowerCase().includes("free") ? 0 : 49,
      organizer: currentUser ? currentUser.displayName : "Community Organizer",
      image: imageUrl,
      description,
      tags: tags.length ? tags : ["Tech", "Developers"],
      speakers: [
        {
          name: currentUser ? currentUser.displayName : "Featured Speaker",
          role: currentUser ? currentUser.role : "Lead Engineer",
          avatar: currentUser ? currentUser.avatar : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80"
        }
      ],
      agenda: [
        { time: "10:00 AM", title: "Opening Keynote & Introductions", speaker: currentUser?.displayName || "Host" },
        { time: "01:30 PM", title: "Technical Deep-Dive & Live Q&A", speaker: "Guest Mentors" }
      ]
    };

    addEvent(newEvent);
    setCreateEventModalOpen(false);
  };

  return (
    <div className="modal-backdrop" onClick={() => setCreateEventModalOpen(false)}>
      <div 
        className="modal-container create-event-modal" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button 
          className="modal-close-btn" 
          onClick={() => setCreateEventModalOpen(false)}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="create-event-header">
          <div className="create-icon-wrap">
            <Sparkles size={22} className="text-cyan-400" />
          </div>
          <h3 className="create-title">Publish a Tech Event</h3>
          <p className="create-subtitle">
            Share your upcoming conference, hackathon, workshop, or meetup with thousands of active developers.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="create-event-form">
          <div className="form-grid-2">
            <div className="form-field full-width">
              <label htmlFor="evt-title">Event Title *</label>
              <input
                id="evt-title"
                type="text"
                placeholder="e.g. NextGen Web & AI Hackathon 2026"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="evt-category">Category *</label>
              <select
                id="evt-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {CATEGORIES.filter((c) => c !== "All").map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="evt-format">Format *</label>
              <select
                id="evt-format"
                value={format}
                onChange={(e) => setFormat(e.target.value)}
              >
                <option value="Virtual">Virtual / Online</option>
                <option value="In-Person">In-Person</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="evt-date">Date *</label>
              <input
                id="evt-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="evt-time">Time & Timezone</label>
              <input
                id="evt-time"
                type="text"
                placeholder="e.g. 10:00 AM - 05:00 PM PST"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>

            <div className="form-field">
              <label htmlFor="evt-city">City / Region</label>
              <input
                id="evt-city"
                type="text"
                placeholder="e.g. San Francisco or Online"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className="form-field">
              <label htmlFor="evt-price">Ticket / Price</label>
              <input
                id="evt-price"
                type="text"
                placeholder="e.g. Free or $49"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="form-field full-width">
              <label htmlFor="evt-location">Venue Address / Stream Link</label>
              <input
                id="evt-location"
                type="text"
                placeholder="e.g. Moscone Center, SF or Discord Stage"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="form-field full-width">
              <label htmlFor="evt-tags">Tags (comma separated)</label>
              <input
                id="evt-tags"
                type="text"
                placeholder="e.g. React, Next.js, Cloud, Python"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
              />
            </div>

            <div className="form-field full-width">
              <label htmlFor="evt-img">Cover Image URL</label>
              <input
                id="evt-img"
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>

            <div className="form-field full-width">
              <label htmlFor="evt-desc">Description & Highlights *</label>
              <textarea
                id="evt-desc"
                rows={4}
                placeholder="Describe what participants will build, key speakers, schedule, and takeaways..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="create-submit-btn">
            <Plus size={18} />
            <span>Publish Event to DevBoard</span>
          </button>
        </form>
      </div>
    </div>
  );
};
