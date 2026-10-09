import React, { useState } from "react";
import { useEvents } from "../context/EventsContext";
import { 
  Terminal, 
  Heart, 
  Send, 
  Sparkles, 
  Globe, 
  Layers,
  ArrowUp
} from "lucide-react";

// Clean inline SVGs for social icons
const GithubIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const TwitterIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const LinkedinIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const Footer = () => {
  const { setSelectedCategory, showToast } = useEvents();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    showToast("🎉 Thanks for subscribing to DevBoard weekly event alerts!", "success");
    setEmail("");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer-container">
      <div className="footer-inner">
        {/* Top Newsletter / Community Banner */}
        <div className="footer-newsletter-card">
          <div className="newsletter-text">
            <div className="newsletter-badge">
              <Sparkles size={14} className="text-purple-400" />
              <span>Weekly Developer Digest</span>
            </div>
            <h3 className="newsletter-title">Never Miss a Global Hackathon or Keynote</h3>
            <p className="newsletter-desc">
              Get hand-curated upcoming summits, prize bounties, and exclusive early access passes delivered to your inbox every Monday.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your developer email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="newsletter-input"
              required
            />
            <button type="submit" className="newsletter-btn">
              <span>Subscribe</span>
              <Send size={15} />
            </button>
          </form>
        </div>

        {/* Links Grid */}
        <div className="footer-links-grid">
          {/* Brand Col */}
          <div className="footer-brand-col">
            <div className="footer-brand-logo">
              <Terminal size={22} className="text-purple-400" />
              <span className="brand-name">Dev<span className="brand-gradient">Board</span> <span className="pulse-gradient-word">Pulse</span></span>
            </div>
            <p className="footer-brand-tagline">
              The premier interactive discovery platform for upcoming tech conferences, hackathons, and builder workshops.
            </p>
            <div className="footer-social-links">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
                <GithubIcon size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Twitter">
                <TwitterIcon size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                <LinkedinIcon size={18} />
              </a>
              <a href="https://gdg.community.dev" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GDG Community">
                <Globe size={18} />
              </a>
            </div>
          </div>

          {/* Categories Col */}
          <div className="footer-col">
            <h4 className="footer-col-title">Event Tracks</h4>
            <ul className="footer-col-links">
              <li>
                <button onClick={() => { setSelectedCategory("AI & ML"); scrollToTop(); }}>
                  Generative AI & ML
                </button>
              </li>
              <li>
                <button onClick={() => { setSelectedCategory("Hackathons"); scrollToTop(); }}>
                  Hackathons & Bounties
                </button>
              </li>
              <li>
                <button onClick={() => { setSelectedCategory("Web3 & Cloud"); scrollToTop(); }}>
                  Web3 & Cloud Infra
                </button>
              </li>
              <li>
                <button onClick={() => { setSelectedCategory("Design & UX"); scrollToTop(); }}>
                  Design Systems & UX
                </button>
              </li>
              <li>
                <button onClick={() => { setSelectedCategory("Open Source"); scrollToTop(); }}>
                  Open Source Sprints
                </button>
              </li>
            </ul>
          </div>

          {/* Resources Col */}
          <div className="footer-col">
            <h4 className="footer-col-title">Developer Ecosystem</h4>
            <ul className="footer-col-links">
              <li><a href="https://gdg.community.dev" target="_blank" rel="noopener noreferrer">Google Developer Groups</a></li>
              <li><a href="https://developers.google.com" target="_blank" rel="noopener noreferrer">Google for Developers</a></li>
              <li><a href="https://firebase.google.com" target="_blank" rel="noopener noreferrer">Firebase Cloud Console</a></li>
              <li><a href="https://react.dev" target="_blank" rel="noopener noreferrer">React 19 Documentation</a></li>
              <li><a href="https://vite.dev" target="_blank" rel="noopener noreferrer">Vite Build Tooling</a></li>
            </ul>
          </div>

          {/* Community & Legal Col */}
          <div className="footer-col">
            <h4 className="footer-col-title">DevBoard Community</h4>
            <ul className="footer-col-links">
              <li><a href="#top" onClick={scrollToTop}>Browse All Events</a></li>
              <li><a href="#top" onClick={scrollToTop}>Submit Event Proposal</a></li>
              <li><a href="#top">Speaker Guidelines</a></li>
              <li><a href="#top">Code of Conduct</a></li>
              <li><a href="#top">Privacy & Terms</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-copyright">
            © {new Date().getFullYear()} DevBoard. Designed with <Heart size={14} className="fill-rose-500 text-rose-500 inline mx-1" /> for builders worldwide.
          </div>

          <div className="footer-bottom-right">
            <span className="built-with-tag">
              <Layers size={13} /> React + Firebase + Canvas
            </span>
            <button className="scroll-top-btn" onClick={scrollToTop} aria-label="Scroll back to top">
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
