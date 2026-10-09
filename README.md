# ⚡ DevBoard Pulse

> **Next-Generation Campus Event Discovery & Digital Ticketing Engine for NMIT Bengaluru**

[![React 19](https://img.shields.io/badge/React-19.0-61dafb?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646cff?logo=vite&logoColor=white)](https://vite.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-Firestore-ffca28?logo=firebase&logoColor=black)](https://firebase.google.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 🌟 Overview

**DevBoard Pulse** is a high-performance web platform built for **Nitte Meenakshi Institute of Technology (NMIT) Bengaluru**. It bridges the gap between campus tech clubs, faculty coordinators, and student builders by streamlining hackathon discovery, workshop registrations, instant encrypted digital pass generation, and real-time attendance management.

---

## ✨ Key Features

### 🎓 Student Experience
- **Interactive Event Discovery**: Instant keyword search, category track filtering (`AI & ML`, `Hackathons`, `Web3 & Cloud`, `Design & UX`, `Open Source`), and format filters (`In-Person`, `Virtual`, `Hybrid`).
- **One-Click RSVP & Digital Pass Generator**: Real-time RSVP with instant generation of scannable QR ticket passes with Apple/Google Wallet aesthetics.
- **Private Scoped Passes**: User passes and bookmarks are strictly isolated per authenticated student account.
- **Favourites & Bookmark System**: Save upcoming keynotes and hackathons for fast access in the dedicated Favourites Drawer.
- **Calendar & Team Sharing**: Copy event links or export event dates directly to Google Calendar.

### 🛡️ Secure Admin Portal
- **Role-Based Access Control (RBAC)**: Exclusive administrative access (`admin@nmit.ac.in`) prevents unauthorized event creation or modification.
- **Event Lifecycle Management**: Full CRUD capabilities to create, edit, update, or archive events with live cloud synchronization.
- **Attendee Roster & CSV Export**: Real-time participant analytics and one-click CSV export for campus security check-in desks.
- **Firebase Dual-Storage Engine**: Real-time cloud sync with Firestore with resilient automatic fallback to local persistence.

### 🎨 Design & Visual Engineering
- **Sleek Paradigm-Style Dark Mode**: Obsidian depth (`#03060d`) paired with radiant Saffron (`#f97316`) and Electric Peacock Blue (`#0284c7`) accents.
- **Live Pulse Wave & Cursor Spotlight Engine**: Custom HTML5 canvas backdrop featuring smooth mouse-following radial spotlight physics, live campus frequency waveforms, and proximity grid highlights.
- **Real-Time Admin Background Customizer**: Adjust spotlight radius, pulse frequency, waveform amplitude, and color presets in real time.

---

## 🔑 Demo Credentials

| Role | Email | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@nmit.ac.in` | `admin123` | Full Event CRUD, Attendee Export & Background Engine |
| **Student** | Any email (e.g. `student@nmit.ac.in`) | Any password (min 6 chars) | Event Discovery, RSVP & Digital Passes |

---

## 🛠️ Tech Stack

- **Frontend**: React 19, JavaScript (ES2024), Vite
- **Styling**: Vanilla CSS (Custom Design System with CSS Tokens, Glassmorphism & Micro-animations)
- **Backend / Database**: Google Firebase Firestore
- **Icons**: Lucide React
- **Effects**: Canvas Confetti, Custom HTML5 Canvas Particle & Waveform Engine

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/krishiv2412/DevBoard-Pulse.git
cd DevBoard-Pulse
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for production
```bash
npm run build
```

---

## 📂 Project Structure

```text
src/
├── components/
│   ├── AdminPortal.jsx          # Admin management & background engine
│   ├── AuthModal.jsx            # Student Sign In / Sign Up modal
│   ├── BackgroundCanvas.jsx     # Live Pulse Wave & Cursor Spotlight Canvas
│   ├── CreateEventModal.jsx     # Admin event creation dialog
│   ├── EditEventModal.jsx       # Admin event editor dialog
│   ├── EventCard.jsx            # Modern event card component
│   ├── EventDetailModal.jsx     # Full event details & venue maps
│   ├── EventList.jsx            # Events grid & conclave showcase
│   ├── FavouritesDrawer.jsx     # Saved events bookmark drawer
│   ├── FilterBar.jsx            # Multi-parameter search & sort bar
│   ├── FirebaseConfigModal.jsx  # Live Firebase connection dialog
│   ├── Footer.jsx               # Newsletter & ecosystem directory
│   ├── Hero.jsx                 # Paradigm-style glowing capsule hero
│   ├── Navbar.jsx               # Navigation & user state controller
│   ├── RegisteredEventsDrawer.jsx # Student digital passes & QR tickets
│   ├── RegistrationModal.jsx    # RSVP student details intake
│   └── Toast.jsx                # Toast notification system
├── context/
│   ├── AuthContext.jsx          # Authentication & RBAC state
│   └── EventsContext.jsx        # Events, registrations & filters state
├── data/
│   └── initialEvents.js         # Preloaded campus hackathons & themes
├── firebase.js                  # Firebase SDK initialization
├── App.jsx                      # Root application layout
├── index.css                    # Design tokens & glassmorphic styles
└── main.jsx                     # Vite React entry point
```

---

## 📄 License
This project is open source and available under the [MIT License](LICENSE).
