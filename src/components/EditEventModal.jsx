import React, { useState, useEffect } from "react";
import { useEvents } from "../context/EventsContext";
import { CATEGORIES, FORMAT_OPTIONS, NMIT_VENUES } from "../data/initialEvents";
import { X, Save, Edit3, MapPin, Tag } from "lucide-react";

export const EditEventModal = () => {
  const { editingEvent, setEditingEvent, updateEvent } = useEvents();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("AI & ML");
  const [format, setFormat] = useState("In-Person");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("Free");
  const [description, setDescription] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (editingEvent) {
      setTitle(editingEvent.title || "");
      setCategory(editingEvent.category || "AI & ML");
      setFormat(editingEvent.format || "In-Person");
      setDate(editingEvent.date || "");
      setTime(editingEvent.time || "");
      setLocation(editingEvent.location || NMIT_VENUES[0]);
      setPrice(editingEvent.price || "Free");
      setDescription(editingEvent.description || "");
      setTagsInput(editingEvent.tags ? editingEvent.tags.join(", ") : "");
      setImageUrl(editingEvent.image || "");
    }
  }, [editingEvent]);

  if (!editingEvent) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const updated = {
      ...editingEvent,
      title,
      category,
      categoryColor: category === "AI & ML" ? "#0284c7" : category === "Hackathons" ? "#f97316" : "#10b981",
      format,
      date,
      time,
      location,
      venueDetails: location,
      price,
      priceAmount: price.toLowerCase().includes("free") ? 0 : parseInt(price.replace(/[^0-9]/g, "")) || 199,
      description,
      tags: tags.length ? tags : editingEvent.tags,
      image: imageUrl || editingEvent.image
    };

    updateEvent(updated);
    setEditingEvent(null);
  };

  return (
    <div className="modal-backdrop" onClick={() => setEditingEvent(null)}>
      <div 
        className="modal-container create-event-modal" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button 
          className="modal-close-btn" 
          onClick={() => setEditingEvent(null)}
          aria-label="Close edit modal"
        >
          <X size={20} />
        </button>

        <div className="create-event-header">
          <div className="create-icon-wrap bg-orange-glow">
            <Edit3 size={22} className="text-orange-400" />
          </div>
          <h3 className="create-title">Modify NMIT Event Specifications</h3>
          <p className="create-subtitle">
            Update event scheduling, NMIT venue allocation, pricing, and speaker outlines in real-time.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="create-event-form">
          <div className="form-grid-2">
            <div className="form-field full-width">
              <label>Event Title *</label>
              <input
                type="text"
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
                <option value="Hybrid">Hybrid (NMIT + Online)</option>
                <option value="Virtual">Virtual</option>
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
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>

            <div className="form-field full-width">
              <label>NMIT Venue Location *</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. APJ Abdul Kalam Auditorium, NMIT Campus"
                required
              />
            </div>

            <div className="form-field">
              <label>Price (INR)</label>
              <input
                type="text"
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
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
              />
            </div>

            <div className="form-field full-width">
              <label>Description & Takeaways *</label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="create-submit-btn">
            <Save size={18} />
            <span>Save & Apply Changes</span>
          </button>
        </form>
      </div>
    </div>
  );
};
