import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useEvents } from "../context/EventsContext";
import { 
  Terminal, 
  Heart, 
  Search, 
  Sun, 
  Moon, 
  User, 
  LogOut, 
  ChevronDown,
  Shield,
  Ticket
} from "lucide-react";

export const Navbar = ({ theme, toggleTheme }) => {
  const { 
    currentUser, 
    isAdmin, 
    setAuthModalOpen, 
    setAuthMode, 
    setAdminPortalOpen, 
    logout 
  } = useAuth();

  const { 
    favourites, 
    setFavouritesDrawerOpen, 
    rsvps,
    setRegisteredDrawerOpen,
    searchQuery,
    setSearchQuery,
    showFavouritesOnly
  } = useEvents();

  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const registeredCount = Object.keys(rsvps).length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard shortcut listener ('/' to focus search)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "/" && document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "TEXTAREA") {
        e.preventDefault();
        const searchInput = document.getElementById("main-search-input");
        if (searchInput) searchInput.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="navbar-container">
      <div className="navbar-inner">
        {/* Brand / Logo */}
        <a href="#top" className="navbar-brand" aria-label="DevBoard Pulse Home">
          <div className="brand-icon-wrapper">
            <Terminal className="brand-icon" size={22} />
            <span className="live-status-pulse" />
          </div>
          <div className="brand-text">
            <div className="brand-name-wrap">
              <span className="brand-name">Dev<span className="brand-gradient">Board</span> <span className="pulse-gradient-word">Pulse</span></span>
              <span className="nmit-tag">NMIT</span>
            </div>
            <span className="brand-subtext">Bengaluru Hub</span>
          </div>
        </a>

        {/* Global Quick Search Bar */}
        <div className="navbar-search-wrapper">
          <Search className="search-icon" size={16} />
          <input
            id="main-search-input"
            type="text"
            className="navbar-search-input"
            placeholder="Search NMIT events, topics, labs, tags... (Press '/' to focus)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search events"
          />
          {searchQuery && (
            <button
              className="clear-search-btn"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        {/* Action Controls */}
        <div className="navbar-actions">
          {/* Admin / Logged-in Conditionals */}
          {currentUser ? (
            isAdmin ? (
              /* If Admin Logged In: Show Admin Console */
              <button
                className="nav-btn admin-console-nav-btn"
                onClick={() => setAdminPortalOpen(true)}
                title="Open NMIT Admin Management Console"
              >
                <Shield size={16} className="text-amber-400" />
                <span>Admin Console</span>
              </button>
            ) : (
              /* If Student Logged In: Show My Passes button (NO ADMIN BUTTON) */
              <button
                className={`nav-btn passes-nav-btn ${registeredCount > 0 ? "has-passes" : ""}`}
                onClick={() => setRegisteredDrawerOpen(true)}
                aria-label={`View ${registeredCount} registered event passes`}
                title="My Registered Event Passes"
              >
                <Ticket size={16} className="text-orange-400" />
                <span className="passes-btn-label">My Passes</span>
                {registeredCount > 0 && (
                  <span className="passes-count-pill">{registeredCount}</span>
                )}
              </button>
            )
          ) : (
            /* If Signed Out: Show Admin login shortcut */
            <button
              className="nav-btn admin-login-shortcut-btn"
              onClick={() => {
                setAuthMode("admin-login");
                setAuthModalOpen(true);
              }}
              title="Admin & Faculty Portal Login"
            >
              <Shield size={15} />
              <span>Admin</span>
            </button>
          )}

          {/* Favourites Drawer Button */}
          <button
            className={`nav-btn fav-nav-btn ${favourites.length > 0 ? "has-favs" : ""} ${showFavouritesOnly ? "active" : ""}`}
            onClick={() => setFavouritesDrawerOpen(true)}
            aria-label={`View ${favourites.length} favourite events`}
            title="My Saved Schedule"
          >
            <Heart size={17} className={favourites.length > 0 ? "fill-rose-500 text-rose-500" : ""} />
            <span className="fav-btn-label">Saved</span>
            {favourites.length > 0 && (
              <span className="fav-count-pill">{favourites.length}</span>
            )}
          </button>

          {/* Theme Toggle Button */}
          <button
            className="nav-btn icon-only-btn theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title={`Toggle ${theme === "dark" ? "Light" : "Dark"} Mode`}
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* User Profile / Auth Section */}
          <div className="user-profile-wrapper" ref={dropdownRef}>
            {currentUser ? (
              <>
                <button
                  className="user-avatar-btn"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  aria-expanded={userDropdownOpen}
                  aria-label="User menu"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.displayName}
                    className="user-avatar-img"
                  />
                  <span className="user-name-label">{currentUser.displayName.split(" ")[0]}</span>
                  {currentUser.roleType === "admin" && (
                    <span className="nav-admin-dot" title="Admin User" />
                  )}
                  <ChevronDown size={14} className={`chevron-icon ${userDropdownOpen ? "open" : ""}`} />
                </button>

                {userDropdownOpen && (
                  <div className="user-dropdown-menu">
                    <div className="dropdown-user-header">
                      <div className="flex items-center justify-between">
                        <p className="dropdown-user-name">{currentUser.displayName}</p>
                        {currentUser.roleType === "admin" && (
                          <span className="admin-pill">ADMIN</span>
                        )}
                      </div>
                      <p className="dropdown-user-email">{currentUser.email}</p>
                      <span className="dropdown-user-role">{currentUser.role || "Student"}</span>
                      {currentUser.usn && (
                        <p className="dropdown-user-usn">USN: {currentUser.usn}</p>
                      )}
                    </div>

                    {isAdmin && (
                      <button
                        className="dropdown-item admin-portal-item"
                        onClick={() => {
                          setAdminPortalOpen(true);
                          setUserDropdownOpen(false);
                        }}
                      >
                        <Shield size={16} className="text-amber-400" />
                        <span>Open Admin Console</span>
                      </button>
                    )}

                    <div className="dropdown-divider" />

                    <button
                      className="dropdown-item logout-item"
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                    >
                      <LogOut size={15} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </>
            ) : (
              <button
                className="nav-btn auth-login-btn"
                onClick={() => {
                  setAuthMode("user-login");
                  setAuthModalOpen(true);
                }}
              >
                <User size={16} />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
