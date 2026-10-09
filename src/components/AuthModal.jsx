import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useEvents } from "../context/EventsContext";
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  Sparkles, 
  ArrowRight, 
  Shield, 
  GraduationCap, 
  Building,
  Phone,
  BookOpen,
  Key,
  CheckCircle2,
  Zap
} from "lucide-react";

export const AuthModal = () => {
  const { 
    authModalOpen, 
    setAuthModalOpen, 
    setAdminPortalOpen,
    authMode, 
    setAuthMode, 
    loginUser, 
    loginAdmin, 
    signupWithEmail, 
    loading 
  } = useAuth();

  const { showToast } = useEvents();

  // Login form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Signup form state
  const [displayName, setDisplayName] = useState("");
  const [usn, setUsn] = useState("");
  const [branch, setBranch] = useState("Computer Science & Engineering (CSE)");
  const [college, setCollege] = useState("Nitte Meenakshi Institute of Technology (NMIT)");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  // Reset form whenever modal opens or mode changes (MUST be before any early return)
  useEffect(() => {
    if (authModalOpen) {
      setError("");
      if (authMode === "admin-login") {
        setEmail("admin@nmit.ac.in");
        setPassword("admin123");
      } else {
        setEmail("");
        setPassword("");
        setDisplayName("");
        setUsn("");
        setPhone("");
      }
    }
  }, [authModalOpen, authMode]);

  if (!authModalOpen) return null;

  const handleTabSwitch = (mode) => {
    setAuthMode(mode);
    setError("");
    if (mode === "admin-login") {
      setEmail("admin@nmit.ac.in");
      setPassword("admin123");
    } else {
      setEmail("");
      setPassword("");
      setDisplayName("");
      setUsn("");
      setPhone("");
    }
  };

  const handleAutoFillAdmin = () => {
    setEmail("admin@nmit.ac.in");
    setPassword("admin123");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    if (authMode === "admin-login") {
      const res = await loginAdmin(email, password);
      if (res.success) {
        showToast(`Welcome to NMIT Admin Console, ${res.user.displayName}!`, "success");
        setAuthModalOpen(false);
        setAdminPortalOpen(true);
      } else {
        setError(res.error || "Invalid administrator credentials.");
      }
    } else if (authMode === "user-login") {
      const res = await loginUser(email, password);
      if (res.success) {
        showToast(`Welcome back, ${res.user.displayName}!`, "success");
        setAuthModalOpen(false);
      } else {
        setError(res.error || "Failed to sign in. Please verify your credentials.");
      }
    } else {
      if (!displayName) {
        setError("Please enter your full name.");
        return;
      }
      const res = await signupWithEmail({
        email,
        password,
        displayName,
        college,
        usn: usn.toUpperCase().trim(),
        branch,
        phone
      });
      if (res.success) {
        showToast(`Account created successfully! Welcome, ${displayName}!`, "success");
        setAuthModalOpen(false);
      } else {
        setError(res.error || "Failed to create account");
      }
    }
  };

  return (
    <div className="modal-backdrop" onClick={() => setAuthModalOpen(false)}>
      <div 
        className="modal-container auth-modal" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button 
          className="modal-close-btn" 
          onClick={() => setAuthModalOpen(false)}
          aria-label="Close authentication modal"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="auth-header">
          <div className={`auth-icon-badge ${authMode === "admin-login" ? "admin-badge-glow" : ""}`}>
            {authMode === "admin-login" ? (
              <Shield size={24} className="text-amber-400" />
            ) : (
              <Sparkles size={24} className="text-orange-400" />
            )}
          </div>
          <h3 className="auth-title">
            {authMode === "admin-login"
              ? "NMIT Administrator Portal"
              : authMode === "user-login"
              ? "Student Sign In"
              : "Create Student Account"}
          </h3>
          <p className="auth-subtitle">
            {authMode === "admin-login"
              ? "Authorized portal for event coordinators to view registrations, add events & manage themes."
              : authMode === "user-login"
              ? "Sign in to RSVP to events, access workshop passes, and save favorites."
              : "Join DevBoard NMIT to register for campus hackathons and workshops."}
          </p>

          {/* Mode Switcher Tabs */}
          <div className="auth-mode-tabs auth-mode-tabs-3">
            <button
              type="button"
              className={`auth-mode-tab ${authMode === "user-login" ? "active" : ""}`}
              onClick={() => handleTabSwitch("user-login")}
            >
              Sign In
            </button>
            <button
              type="button"
              className={`auth-mode-tab ${authMode === "signup" ? "active" : ""}`}
              onClick={() => handleTabSwitch("signup")}
            >
              Sign Up
            </button>
            <button
              type="button"
              className={`auth-mode-tab ${authMode === "admin-login" ? "active admin-active" : ""}`}
              onClick={() => handleTabSwitch("admin-login")}
            >
              Admin Portal
            </button>
          </div>
        </div>

        {/* Admin Credentials Showcase Box */}
        {authMode === "admin-login" && (
          <div className="admin-credentials-showcase">
            <div className="showcase-header">
              <Key size={14} className="text-amber-400" />
              <span>Evaluator & Admin Login Credentials</span>
            </div>
            <div className="showcase-details">
              <div className="cred-row">
                <span className="cred-label">Admin Email:</span>
                <code className="cred-code">admin@nmit.ac.in</code>
              </div>
              <div className="cred-row">
                <span className="cred-label">Password:</span>
                <code className="cred-code">admin123</code>
              </div>
            </div>
            <button 
              type="button" 
              className="auto-fill-admin-btn"
              onClick={handleAutoFillAdmin}
            >
              <Zap size={13} />
              <span>Auto-Fill Admin Credentials</span>
            </button>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="auth-form" autoComplete="off">
          {error && <div className="auth-error-banner">{error}</div>}

          {authMode === "signup" && (
            <>
              <div className="form-field">
                <label htmlFor="signup-name">Full Name *</label>
                <div className="input-with-icon">
                  <User size={16} className="input-icon" />
                  <input
                    id="signup-name"
                    type="text"
                    placeholder="e.g. Rahul Sharma"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    autoComplete="off"
                    required
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-field">
                  <label htmlFor="signup-usn">USN / Roll No *</label>
                  <div className="input-with-icon">
                    <GraduationCap size={16} className="input-icon" />
                    <input
                      id="signup-usn"
                      type="text"
                      placeholder="e.g. 1NT22CS142"
                      value={usn}
                      onChange={(e) => setUsn(e.target.value)}
                      autoComplete="off"
                      required
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="signup-phone">Phone / WhatsApp</label>
                  <div className="input-with-icon">
                    <Phone size={16} className="input-icon" />
                    <input
                      id="signup-phone"
                      type="tel"
                      placeholder="e.g. +91 98450 12345"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      autoComplete="off"
                    />
                  </div>
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="signup-branch">Department / Branch</label>
                <div className="input-with-icon">
                  <BookOpen size={16} className="input-icon" />
                  <select
                    id="signup-branch"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                  >
                    <option value="Computer Science & Engineering (CSE)">Computer Science & Engineering (CSE)</option>
                    <option value="Artificial Intelligence & Data Science (AI & DS)">Artificial Intelligence & Data Science (AI & DS)</option>
                    <option value="Information Science & Engineering (ISE)">Information Science & Engineering (ISE)</option>
                    <option value="Electronics & Communication (ECE)">Electronics & Communication (ECE)</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="Other Department">Other Department</option>
                  </select>
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="signup-college">College / Institute</label>
                <div className="input-with-icon">
                  <Building size={16} className="input-icon" />
                  <input
                    id="signup-college"
                    type="text"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    autoComplete="off"
                    required
                  />
                </div>
              </div>
            </>
          )}

          <div className="form-field">
            <label htmlFor="auth-email">
              {authMode === "admin-login" ? "NMIT Admin Email" : "Email Address"} *
            </label>
            <div className="input-with-icon">
              <Mail size={16} className="input-icon" />
              <input
                id="auth-email"
                type="email"
                placeholder={authMode === "admin-login" ? "admin@nmit.ac.in" : "you@nmit.ac.in"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
                required
              />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="auth-password">Password *</label>
            <div className="input-with-icon">
              <Lock size={16} className="input-icon" />
              <input
                id="auth-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className={`auth-submit-btn ${authMode === "admin-login" ? "admin-submit-btn-style" : ""}`} 
            disabled={loading}
          >
            <span>
              {loading 
                ? "Verifying..." 
                : authMode === "admin-login" 
                ? "Login to Admin Console" 
                : authMode === "user-login" 
                ? "Sign In to DevBoard" 
                : "Create Student Account"}
            </span>
            <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};
