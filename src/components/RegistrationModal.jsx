import React, { useState, useEffect } from "react";
import { useEvents } from "../context/EventsContext";
import { useAuth } from "../context/AuthContext";
import { 
  X, 
  Calendar, 
  MapPin, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  GraduationCap, 
  Building, 
  Ticket, 
  Sparkles,
  ShieldCheck
} from "lucide-react";

export const RegistrationModal = () => {
  const { 
    registeringEvent, 
    setRegisteringEvent, 
    registerForEvent 
  } = useEvents();

  const { currentUser } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [usn, setUsn] = useState("");
  const [branch, setBranch] = useState("Computer Science & Engineering (CSE)");
  const [year, setYear] = useState("3rd Year (5th/6th Sem)");
  const [college, setCollege] = useState("Nitte Meenakshi Institute of Technology (NMIT)");
  const [submitting, setSubmitting] = useState(false);

  // Pre-fill user data if logged in
  useEffect(() => {
    if (currentUser) {
      setFullName(currentUser.displayName || "");
      setEmail(currentUser.email || "");
      setPhone(currentUser.phone || "");
      setUsn(currentUser.usn || "");
      setCollege(currentUser.college || "Nitte Meenakshi Institute of Technology (NMIT)");
    } else {
      setFullName("");
      setEmail("");
      setPhone("");
      setUsn("");
      setCollege("Nitte Meenakshi Institute of Technology (NMIT)");
    }
  }, [currentUser, registeringEvent]);

  if (!registeringEvent) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const registrationData = {
      fullName: fullName.trim(),
      email: (currentUser?.email || email || "").toLowerCase().trim(),
      phone: phone.trim(),
      usn: usn.toUpperCase().trim(),
      branch,
      year,
      college: college.trim(),
      userId: currentUser?.uid || "usr-" + Date.now()
    };

    await registerForEvent(registeringEvent.id, registrationData);
    setSubmitting(false);
    setRegisteringEvent(null);
  };

  return (
    <div className="modal-backdrop" onClick={() => setRegisteringEvent(null)}>
      <div 
        className="modal-container registration-form-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="reg-modal-title"
      >
        {/* Close Button */}
        <button 
          className="modal-close-btn" 
          onClick={() => setRegisteringEvent(null)}
          aria-label="Close registration form"
        >
          <X size={18} />
        </button>

        {/* Modal Top Header Banner */}
        <div className="reg-modal-header">
          <div className="reg-header-top-row">
            <div className="reg-badge-icon">
              <Ticket size={22} className="text-saffron" />
            </div>
            <div>
              <span className="reg-kicker">NMIT TECH PASS</span>
              <h2 id="reg-modal-title" className="reg-modal-title">Event Registration</h2>
            </div>
          </div>
          
          <p className="reg-event-name">
            {registeringEvent.title}
          </p>

          {/* Quick Summary Pill Bar */}
          <div className="reg-summary-pill-bar">
            <div className="reg-pill-item">
              <Calendar size={13} className="pill-icon saffron" />
              <span>{registeringEvent.date}</span>
            </div>
            <div className="reg-pill-item">
              <Clock size={13} className="pill-icon cyan" />
              <span>{registeringEvent.time}</span>
            </div>
            <div className="reg-pill-item loc-pill" title={registeringEvent.location}>
              <MapPin size={13} className="pill-icon emerald" />
              <span>{registeringEvent.location.split(",")[0]}</span>
            </div>
            <div className="reg-price-tag">
              {registeringEvent.price === "Free" ? "Free Entry" : registeringEvent.price}
            </div>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="reg-form-body">
          <div className="reg-form-fields-grid">
            {/* Full Name */}
            <div className="form-field">
              <label htmlFor="reg-name">Full Name <span className="req">*</span></label>
              <div className="input-with-icon">
                <User size={16} className="input-icon" />
                <input
                  id="reg-name"
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="form-field">
              <label htmlFor="reg-email">Email Address <span className="req">*</span></label>
              <div className="input-with-icon">
                <Mail size={16} className="input-icon" />
                <input
                  id="reg-email"
                  type="email"
                  placeholder="e.g. rahul@nmit.ac.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div className="form-field">
              <label htmlFor="reg-phone">Phone Number <span className="req">*</span></label>
              <div className="input-with-icon">
                <Phone size={16} className="input-icon" />
                <input
                  id="reg-phone"
                  type="tel"
                  placeholder="e.g. +91 98450 12345"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* USN */}
            <div className="form-field">
              <label htmlFor="reg-usn">University Seat Number (USN) <span className="req">*</span></label>
              <div className="input-with-icon">
                <GraduationCap size={16} className="input-icon" />
                <input
                  id="reg-usn"
                  type="text"
                  placeholder="e.g. 1NT22CS142"
                  value={usn}
                  onChange={(e) => setUsn(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Department / Branch */}
            <div className="form-field">
              <label htmlFor="reg-branch">Department / Branch <span className="req">*</span></label>
              <select
                id="reg-branch"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
              >
                <option value="Computer Science & Engineering (CSE)">Computer Science & Engineering (CSE)</option>
                <option value="Artificial Intelligence & Data Science (AI & DS)">Artificial Intelligence & Data Science (AI & DS)</option>
                <option value="Information Science & Engineering (ISE)">Information Science & Engineering (ISE)</option>
                <option value="Electronics & Communication (ECE)">Electronics & Communication (ECE)</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="MCA / MBA / Postgrad">MCA / MBA / Postgrad</option>
                <option value="Other Department / External College">Other Department / External College</option>
              </select>
            </div>

            {/* Year of Study */}
            <div className="form-field">
              <label htmlFor="reg-year">Year of Study <span className="req">*</span></label>
              <select
                id="reg-year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              >
                <option value="1st Year (1st/2nd Sem)">1st Year (1st/2nd Sem)</option>
                <option value="2nd Year (3rd/4th Sem)">2nd Year (3rd/4th Sem)</option>
                <option value="3rd Year (5th/6th Sem)">3rd Year (5th/6th Sem)</option>
                <option value="4th Year (7th/8th Sem)">4th Year (7th/8th Sem)</option>
                <option value="Postgraduate / Alumni">Postgraduate / Alumni</option>
              </select>
            </div>

            {/* Institution / College */}
            <div className="form-field full-width">
              <label htmlFor="reg-college">Institution / College Name <span className="req">*</span></label>
              <div className="input-with-icon">
                <Building size={16} className="input-icon" />
                <input
                  id="reg-college"
                  type="text"
                  placeholder="e.g. Nitte Meenakshi Institute of Technology (NMIT)"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Code of Conduct Note */}
          <div className="reg-terms-box">
            <ShieldCheck size={16} className="terms-icon text-emerald" />
            <p className="terms-text">
              Registration pass will be saved directly to the database. Present your USN or pass at the entrance.
            </p>
          </div>

          {/* Action Footer */}
          <div className="reg-modal-actions">
            <button
              type="button"
              className="reg-cancel-btn"
              onClick={() => setRegisteringEvent(null)}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="reg-submit-btn" 
              disabled={submitting}
            >
              <Sparkles size={17} />
              <span>{submitting ? "Saving to Firestore..." : "Confirm & Save Registration"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
