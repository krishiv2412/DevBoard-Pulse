import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { INITIAL_EVENTS } from "../data/initialEvents";
import { db, isFirebaseLive } from "../firebase";
import { collection, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore";
import confetti from "canvas-confetti";
import { useAuth } from "./AuthContext";

const EventsContext = createContext();

export const EventsProvider = ({ children }) => {
  const { currentUser } = useAuth();

  const [events, setEvents] = useState(() => {
    try {
      const saved = localStorage.getItem("devboard_events_v4");
      return saved ? JSON.parse(saved) : INITIAL_EVENTS;
    } catch {
      return INITIAL_EVENTS;
    }
  });

  // Global persistent registrations list
  const [registrations, setRegistrations] = useState(() => {
    try {
      const saved = localStorage.getItem("devboard_registrations_v3");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedFormat, setSelectedFormat] = useState("All Formats");
  const [sortBy, setSortBy] = useState("date-asc");
  const [viewMode, setViewMode] = useState("grid");
  
  // Favourites state
  const [favourites, setFavourites] = useState(() => {
    try {
      const saved = localStorage.getItem("devboard_favourites_v3");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Dynamically compute RSVPs strictly for the logged-in student / user
  const rsvps = useMemo(() => {
    if (!currentUser) return {};
    const userEmail = currentUser.email?.toLowerCase().trim();
    const userUid = currentUser.uid;

    const userRegistrations = registrations.filter(
      (r) =>
        (userEmail && r.userEmail?.toLowerCase().trim() === userEmail) ||
        (userUid && r.userId === userUid)
    );

    const map = {};
    userRegistrations.forEach((r) => {
      map[r.eventId] = true;
    });
    return map;
  }, [currentUser, registrations]);

  // Background Live Lighting & Pulse Wave Engine state
  const [animationSettings, setAnimationSettings] = useState(() => {
    const defaultSettings = {
      themeId: "saffron-pulse",
      waveSpeed: 1.0,
      waveAmplitude: 20,
      spotlightRadius: 420,
      showPulseWaves: true,
      showProximityGrid: true,
      showSpotlight: true
    };
    try {
      const saved = localStorage.getItem("devboard_animation_settings_v4");
      return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  // Modals & Drawers
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [registeringEvent, setRegisteringEvent] = useState(null); // Triggers registration form modal
  const [favouritesDrawerOpen, setFavouritesDrawerOpen] = useState(false);
  const [registeredDrawerOpen, setRegisteredDrawerOpen] = useState(false);
  const [createEventModalOpen, setCreateEventModalOpen] = useState(false);
  const [firebaseConfigModalOpen, setFirebaseConfigModalOpen] = useState(false);
  const [showFavouritesOnly, setShowFavouritesOnly] = useState(false);

  // Toast notifications
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = "info", duration = 3000) => {
    const id = Date.now() + Math.random().toString(36).substr(2, 4);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem("devboard_events_v4", JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem("devboard_registrations_v3", JSON.stringify(registrations));
  }, [registrations]);

  useEffect(() => {
    localStorage.setItem("devboard_favourites_v3", JSON.stringify(favourites));
  }, [favourites]);

  useEffect(() => {
    localStorage.setItem("devboard_animation_settings_v4", JSON.stringify(animationSettings));
  }, [animationSettings]);

  // Firestore sync if active
  useEffect(() => {
    if (!isFirebaseLive || !db) return;
    const fetchCloudData = async () => {
      setLoading(true);
      try {
        const eventsSnap = await getDocs(collection(db, "events"));
        if (!eventsSnap.empty) {
          const cloudEvents = [];
          eventsSnap.forEach((doc) => {
            cloudEvents.push({ id: doc.id, ...doc.data() });
          });
          setEvents(cloudEvents);
        }

        const regSnap = await getDocs(collection(db, "registrations"));
        if (!regSnap.empty) {
          const cloudRegs = [];
          regSnap.forEach((doc) => {
            cloudRegs.push({ id: doc.id, ...doc.data() });
          });
          setRegistrations(cloudRegs);
        }
      } catch (err) {
        console.warn("Using offline local database store:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCloudData();
  }, []);

  // Toggle Favourite (with strictly SINGLE toast invocation)
  const toggleFavourite = (eventId, e) => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }

    const event = events.find(ev => ev.id === eventId);
    const eventTitle = event ? event.title : "Event";
    const alreadyFav = favourites.includes(eventId);

    if (alreadyFav) {
      setFavourites((prev) => prev.filter((id) => id !== eventId));
      showToast(`Removed "${eventTitle.substring(0, 24)}..." from saved`, "default");
    } else {
      setFavourites((prev) => Array.from(new Set([...prev, eventId])));
      showToast(`Saved "${eventTitle.substring(0, 24)}..." to favourites!`, "success");
      try {
        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.75 },
          colors: ['#f97316', '#10b981', '#0284c7', '#eab308']
        });
      } catch {}
    }
  };

  const isFavourite = (eventId) => {
    return favourites.includes(eventId);
  };

  // Register for an event with comprehensive form details
  const registerForEvent = async (eventId, formData) => {
    const event = events.find(ev => ev.id === eventId);
    const eventTitle = event ? event.title : "Event";
    const userEmail = (formData.email || currentUser?.email || "").toLowerCase().trim();
    const userId = currentUser?.uid || formData.userId || "usr-" + Date.now();

    const newReg = {
      id: "reg-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6),
      eventId,
      eventTitle,
      userName: formData.fullName || currentUser?.displayName || "Student",
      userEmail,
      phone: formData.phone || currentUser?.phone || "",
      usn: (formData.usn || currentUser?.usn || "").toUpperCase().trim(),
      branch: formData.branch || currentUser?.branch || "Computer Science",
      year: formData.year || "3rd Year",
      college: formData.college || currentUser?.college || "Nitte Meenakshi Institute of Technology (NMIT)",
      userId,
      registeredAt: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " IST",
      status: "Confirmed"
    };

    // Update state (rsvps is dynamically re-computed from registrations & currentUser)
    setRegistrations((prev) => [newReg, ...prev]);

    // Increment attendee count
    setEvents((currentEvents) =>
      currentEvents.map((ev) => {
        if (ev.id === eventId) {
          return { ...ev, attendeesCount: (ev.attendeesCount || 0) + 1 };
        }
        return ev;
      })
    );

    // Single toast & single confetti outside state updater
    showToast(`🎉 Registration Confirmed for ${eventTitle.substring(0, 25)}!`, "success");
    try {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#f97316', '#10b981', '#0284c7', '#eab308', '#ffffff']
      });
    } catch {}

    // Save to Firebase Firestore if online
    if (isFirebaseLive && db) {
      try {
        await setDoc(doc(db, "registrations", newReg.id), newReg);
      } catch (err) {
        console.warn("Firestore registration save skipped:", err);
      }
    }
  };

  // Cancel RSVP / Registration (strictly per user)
  const cancelRegistration = async (eventId, userEmail, e) => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }

    const event = events.find(ev => ev.id === eventId);
    const eventTitle = event ? event.title : "Event";
    const targetEmail = (userEmail || currentUser?.email || "").toLowerCase().trim();
    const targetUid = currentUser?.uid;

    const regToDelete = registrations.find(
      (r) =>
        r.eventId === eventId &&
        ((targetEmail && r.userEmail?.toLowerCase().trim() === targetEmail) ||
         (targetUid && r.userId === targetUid))
    );

    setRegistrations((prev) =>
      prev.filter((r) => {
        if (r.eventId !== eventId) return true;
        if (targetEmail && r.userEmail?.toLowerCase().trim() === targetEmail) return false;
        if (targetUid && r.userId === targetUid) return false;
        return true;
      })
    );

    // Decrement attendee count
    setEvents((currentEvents) =>
      currentEvents.map((ev) => {
        if (ev.id === eventId) {
          return { ...ev, attendeesCount: Math.max(0, (ev.attendeesCount || 1) - 1) };
        }
        return ev;
      })
    );

    // Single Toast outside
    showToast(`Cancelled registration for ${eventTitle.substring(0, 24)}...`, "default");

    if (isFirebaseLive && db && regToDelete) {
      try {
        await deleteDoc(doc(db, "registrations", regToDelete.id));
      } catch (err) {
        console.warn("Firestore delete skipped:", err);
      }
    }
  };

  // Quick RSVP Click Handler
  const handleRsvpClick = (event, userEmail, e) => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }

    const isAlready = !!rsvps[event.id];
    if (isAlready) {
      cancelRegistration(event.id, userEmail, e);
    } else {
      // Open the comprehensive registration form modal!
      setRegisteringEvent(event);
    }
  };

  // Add Event
  const addEvent = async (newEvent) => {
    const eventWithId = {
      ...newEvent,
      id: "evt-nmit-" + Date.now(),
      attendeesCount: 1,
      organizerAvatar: newEvent.organizerAvatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(newEvent.organizer || 'NMIT')}&backgroundColor=f97316`,
      featured: false
    };

    setEvents((prev) => [eventWithId, ...prev]);
    showToast(`Published "${newEvent.title}" at NMIT!`, "success");

    if (isFirebaseLive && db) {
      try {
        await setDoc(doc(db, "events", eventWithId.id), eventWithId);
      } catch (err) {
        console.warn("Firestore push skipped:", err);
      }
    }
  };

  // Update Event
  const updateEvent = async (updatedEvent) => {
    setEvents((prev) =>
      prev.map((ev) => (ev.id === updatedEvent.id ? updatedEvent : ev))
    );
    showToast(`Updated "${updatedEvent.title}" successfully!`, "success");

    if (selectedEvent?.id === updatedEvent.id) {
      setSelectedEvent(updatedEvent);
    }

    if (isFirebaseLive && db) {
      try {
        await setDoc(doc(db, "events", updatedEvent.id), updatedEvent);
      } catch (err) {
        console.warn("Firestore update skipped:", err);
      }
    }
  };

  // Delete Event
  const deleteEvent = async (eventId) => {
    const ev = events.find((e) => e.id === eventId);
    setEvents((prev) => prev.filter((e) => e.id !== eventId));
    setFavourites((prev) => prev.filter((id) => id !== eventId));
    setRegistrations((prev) => prev.filter((r) => r.eventId !== eventId));
    if (selectedEvent?.id === eventId) setSelectedEvent(null);
    showToast(`Deleted "${ev?.title || 'Event'}"`, "default");

    if (isFirebaseLive && db) {
      try {
        await deleteDoc(doc(db, "events", eventId));
      } catch (err) {
        console.warn("Firestore delete skipped:", err);
      }
    }
  };

  // Update Animation Settings
  const updateAnimationSettings = (newSettings) => {
    setAnimationSettings((prev) => ({ ...prev, ...newSettings }));
    showToast("Background animation & color palette updated!", "success");
  };

  // Reset Filters
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedFormat("All Formats");
    setSortBy("date-asc");
    setShowFavouritesOnly(false);
  };

  // Filtered & sorted events
  const filteredEvents = useMemo(() => {
    return events.filter((item) => {
      if (showFavouritesOnly && !favourites.includes(item.id)) {
        return false;
      }

      if (selectedCategory !== "All" && item.category !== selectedCategory) {
        return false;
      }

      if (selectedFormat !== "All Formats" && item.format !== selectedFormat) {
        return false;
      }

      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = item.title?.toLowerCase().includes(q);
        const matchesDesc = item.description?.toLowerCase().includes(q);
        const matchesOrganizer = item.organizer?.toLowerCase().includes(q);
        const matchesCity = item.city?.toLowerCase().includes(q);
        const matchesLocation = item.location?.toLowerCase().includes(q);
        const matchesVenue = item.venueDetails?.toLowerCase().includes(q);
        const matchesTags = item.tags?.some((t) => t.toLowerCase().includes(q));
        const matchesCategory = item.category?.toLowerCase().includes(q);

        if (
          !matchesTitle &&
          !matchesDesc &&
          !matchesOrganizer &&
          !matchesCity &&
          !matchesLocation &&
          !matchesVenue &&
          !matchesTags &&
          !matchesCategory
        ) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "date-asc") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      if (sortBy === "date-desc") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      if (sortBy === "popular") {
        return (b.attendeesCount || 0) - (a.attendeesCount || 0);
      }
      if (sortBy === "name-asc") {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === "name-desc") {
        return b.title.localeCompare(a.title);
      }
      return 0;
    });
  }, [events, searchQuery, selectedCategory, selectedFormat, sortBy, showFavouritesOnly, favourites]);

  const favouriteEvents = useMemo(() => {
    return events.filter((item) => favourites.includes(item.id));
  }, [events, favourites]);

  return (
    <EventsContext.Provider
      value={{
        events,
        filteredEvents,
        favouriteEvents,
        registrations,
        animationSettings,
        updateAnimationSettings,
        loading,
        setLoading,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedFormat,
        setSelectedFormat,
        sortBy,
        setSortBy,
        viewMode,
        setViewMode,
        favourites,
        toggleFavourite,
        isFavourite,
        rsvps,
        handleRsvpClick,
        registerForEvent,
        cancelRegistration,
        registeringEvent,
        setRegisteringEvent,
        selectedEvent,
        setSelectedEvent,
        editingEvent,
        setEditingEvent,
        favouritesDrawerOpen,
        setFavouritesDrawerOpen,
        registeredDrawerOpen,
        setRegisteredDrawerOpen,
        createEventModalOpen,
        setCreateEventModalOpen,
        firebaseConfigModalOpen,
        setFirebaseConfigModalOpen,
        showFavouritesOnly,
        setShowFavouritesOnly,
        resetFilters,
        addEvent,
        updateEvent,
        deleteEvent,
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = () => useContext(EventsContext);
