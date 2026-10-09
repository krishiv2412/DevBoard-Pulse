export const INITIAL_EVENTS = [
  {
    id: "evt-nmit-urgent-1",
    title: "NMIT Generative AI & Agentic Prompting Bootcamp 2026",
    category: "AI & ML",
    categoryColor: "#0284c7", // Peacock Blue
    format: "In-Person",
    date: "2026-10-10", // In 2 days!
    time: "09:30 AM - 04:30 PM IST",
    location: "CSE Seminar Hall & AI Lab 302, NMIT Campus, Yelahanka, Bengaluru",
    venueDetails: "2nd Floor CSE Wing, Nitte Meenakshi Institute of Technology",
    city: "Bengaluru",
    isVirtual: false,
    price: "Free",
    priceAmount: 0,
    organizer: "GDG on Campus NMIT & Department of CSE",
    organizerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
    description: "Happening this weekend! Intensive hands-on crash course on Google Gemini 3 Flash, Function Calling, Autonomous Multi-Agent Reasoning with LangGraph, and deploying custom AI agents for campus productivity.",
    tags: ["Gemini 3", "AI Agents", "Python", "Prompt Engineering", "NMIT", "LangGraph"],
    attendeesCount: 420,
    featured: true,
    speakers: [
      { name: "Dr. Sanjay Sharma", role: "Professor & Head of AI Research, NMIT", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80" },
      { name: "Ananya Sharma", role: "GDG on Campus Lead & AI Researcher", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80" },
      { name: "Rohan Varma", role: "AI Solutions Engineer @ Google Cloud India", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80" }
    ],
    agenda: [
      { time: "09:30 AM", title: "Keynote: Next-Gen Gemini 3 Multimodal Architecture & Structured Outputs", speaker: "Rohan Varma" },
      { time: "11:00 AM", title: "Hands-on Lab: Prompt Tuning, System Instructions & Function Calling in Python", speaker: "Ananya Sharma" },
      { time: "01:30 PM", title: "Lunch & Networking at NMIT Amphitheatre Cafeteria", speaker: "Open Networking" },
      { time: "02:30 PM", title: "Live Build Sprint: Deploying a Multi-Agent Campus Assistant on Google Cloud", speaker: "Dr. Sanjay Sharma" },
      { time: "04:00 PM", title: "Demo Showcase, Project Reviews & Certificate Distribution", speaker: "Faculty Mentors" }
    ],
    registrationUrl: "https://nmit.ac.in/genai-bootcamp"
  },
  {
    id: "evt-nmit-urgent-2",
    title: "Bengaluru Web3 & Smart Contract Security Lab",
    category: "Web3 & Cloud",
    categoryColor: "#f97316", // Saffron
    format: "In-Person",
    date: "2026-10-11", // In 3 days!
    time: "10:00 AM - 05:00 PM IST",
    location: "ISE Department Lab 402, NMIT Campus, Yelahanka, Bengaluru",
    venueDetails: "4th Floor ISE Block, NMIT Yelahanka",
    city: "Bengaluru",
    isVirtual: false,
    price: "Free",
    priceAmount: 0,
    organizer: "Ethereum Bengaluru & NMIT Blockchain Guild",
    organizerAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&auto=format&fit=crop&q=80",
    description: "Master Solidity 0.8+, Foundry testing framework, Zero-Knowledge proofs on Ethereum, and smart contract vulnerability auditing. Includes free testnet gas tokens and digital verifiable badges.",
    tags: ["Solidity", "Web3", "Ethereum", "Foundry", "Smart Contracts", "DeFi"],
    attendeesCount: 290,
    featured: true,
    speakers: [
      { name: "Karthik Subbaraj", role: "Core Protocol Contributor @ Polygon Labs", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80" },
      { name: "Pooja Hegde", role: "Smart Contract Security Auditor @ Web3Shield", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80" }
    ],
    agenda: [
      { time: "10:00 AM", title: "Architecture of Modern EVM Smart Contracts & Storage Layout", speaker: "Karthik Subbaraj" },
      { time: "12:00 PM", title: "Common DeFi Reentrancy, Flash Loan & Access Control Exploits", speaker: "Pooja Hegde" },
      { time: "02:30 PM", title: "Live Lab: Writing Invariant Tests with Foundry & Deploying to Sepolia", speaker: "Mentors" }
    ],
    registrationUrl: "https://nmit.ac.in/web3-lab"
  },
  {
    id: "evt-nmit-urgent-3",
    title: "National Cyber Security & CTF War Room 2026",
    category: "Cybersecurity",
    categoryColor: "#ef4444", // Crimson Red
    format: "Hybrid",
    date: "2026-10-13", // In 5 days!
    time: "09:00 AM - 05:30 PM IST",
    location: "APJ Abdul Kalam Auditorium, NMIT Campus, Bengaluru & Online Range",
    venueDetails: "Main Auditorium Complex, NMIT Yelahanka",
    city: "Bengaluru",
    isVirtual: true,
    price: "Free",
    priceAmount: 0,
    organizer: "NMIT Cyber Defense Cell & DSCI Karnataka",
    organizerAvatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&auto=format&fit=crop&q=80",
    description: "Live jeopardy-style Capture the Flag (CTF) tournament! Test your skills across Web Exploitation, Cryptography, Reverse Engineering, Binary Exploitation, and Cloud Forensics on our private sandboxed network.",
    tags: ["Cybersecurity", "CTF", "Ethical Hacking", "Cryptography", "Network Security"],
    attendeesCount: 650,
    featured: true,
    speakers: [
      { name: "Col. Sanjeev Rao", role: "Cyber Defense Advisor @ CERT-In", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80" },
      { name: "Divya Balan", role: "Senior Threat Analyst @ Bangalore Cyber Command", avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=120&auto=format&fit=crop&q=80" }
    ],
    agenda: [
      { time: "09:00 AM", title: "Briefing: Zero-Day Threat Landscape & Cyber Range Access Setup", speaker: "Col. Sanjeev Rao" },
      { time: "10:30 AM", title: "Tournament Start: 6-Hour Non-stop Live Capture The Flag (CTF)", speaker: "Live Range Mentors" },
      { time: "04:30 PM", title: "Challenge Walkthroughs, Leaderboard Finalization & Prize Ceremony", speaker: "Divya Balan" }
    ],
    registrationUrl: "https://nmit.ac.in/ctf-warroom"
  },
  {
    id: "evt-nmit-urgent-4",
    title: "Cloud Native Microservices with Go & Docker Lab",
    category: "DevOps & Cloud",
    categoryColor: "#10b981", // Emerald
    format: "In-Person",
    date: "2026-10-14", // In 6 days!
    time: "02:00 PM - 06:30 PM IST",
    location: "CSE High Performance Lab 501, NMIT Campus, Bengaluru",
    venueDetails: "5th Floor CSE Block, NMIT Yelahanka",
    city: "Bengaluru",
    isVirtual: false,
    price: "Free",
    priceAmount: 0,
    organizer: "Google Cloud Community Bengaluru & NMIT CSE",
    organizerAvatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=1200&auto=format&fit=crop&q=80",
    description: "Hands-on engineering workshop on building ultra-fast gRPC microservices in Golang, multi-stage Docker builds, Kubernetes ingress routing, and Prometheus telemetry.",
    tags: ["Golang", "Docker", "Kubernetes", "gRPC", "Microservices", "DevOps"],
    attendeesCount: 380,
    featured: false,
    speakers: [
      { name: "Rahul Verma", role: "Senior Infrastructure Engineer @ Swiggy", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80" },
      { name: "Meera Krishnan", role: "Cloud Solutions Architect @ Google", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80" }
    ],
    agenda: [
      { time: "02:00 PM", title: "Building High-Throughput gRPC APIs with Goroutines in Go", speaker: "Rahul Verma" },
      { time: "04:15 PM", title: "Containerizing & Orchestrating with GKE Autopilot on GCP", speaker: "Meera Krishnan" }
    ],
    registrationUrl: "https://nmit.ac.in/cloud-go-lab"
  },
  {
    id: "evt-nmit-1",
    title: "NMIT HackVerse 2026: 36-Hour National Hackathon",
    category: "Hackathons",
    categoryColor: "#f97316", // Vibrant Saffron
    format: "In-Person",
    date: "2026-10-24",
    time: "09:00 AM - 09:00 PM IST (36 Hours)",
    location: "APJ Abdul Kalam Auditorium & CSE Labs, NMIT Campus, Yelahanka, Bengaluru",
    venueDetails: "Main Academic Block, Nitte Meenakshi Institute of Technology",
    city: "Bengaluru",
    isVirtual: false,
    price: "Free",
    priceAmount: 0,
    organizer: "GDG on Campus NMIT & Department of CSE",
    organizerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&auto=format&fit=crop&q=80",
    description: "Compete for ₹2,50,000 in cash prizes! NMIT's flagship 36-hour hackathon bringing together over 600+ top student developers, engineers, and designers across India to build innovative solutions in GenAI, Web3, IoT, and AgriTech.",
    tags: ["Hackathon", "GenAI", "NMIT", "Fullstack", "IoT", "Web3"],
    attendeesCount: 540,
    featured: true,
    speakers: [
      { name: "Dr. H. C. Nagaraj", role: "Principal & Mentor @ NMIT", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80" },
      { name: "Arjun Reddy", role: "Staff AI Engineer @ Google Cloud India", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80" },
      { name: "Neha Kulkarni", role: "Lead Developer Advocate @ Bengaluru Tech Hub", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80" }
    ],
    agenda: [
      { time: "Day 1 - 09:00 AM", title: "Inauguration & Problem Statement Release at APJ Kalam Auditorium", speaker: "Dr. H. C. Nagaraj" },
      { time: "Day 1 - 02:00 PM", title: "Mentorship Round 1: Architecture & Model Validation", speaker: "Arjun Reddy" },
      { time: "Day 2 - 08:00 AM", title: "Mid-way Progress Evaluation & Live Demos", speaker: "Jury Panel" },
      { time: "Day 2 - 06:00 PM", title: "Grand Finale, Top 10 Pitches & Prize Distribution (₹2.5 Lakhs)", speaker: "Distinguished Guests" }
    ],
    registrationUrl: "https://nmit.ac.in/hackverse"
  },
  {
    id: "evt-nmit-2",
    title: "Bengaluru AI & Cloud Conclave: Gemini, Agentic AI & RAG",
    category: "AI & ML",
    categoryColor: "#0284c7", // Peacock Blue
    format: "Hybrid",
    date: "2026-10-31",
    time: "10:00 AM - 05:30 PM IST",
    location: "MBA Seminar Hall, NMIT Campus, Bengaluru & YouTube Live Stream",
    venueDetails: "MBA Block 3rd Floor, NMIT Yelahanka",
    city: "Bengaluru",
    isVirtual: true,
    price: "Free",
    priceAmount: 0,
    organizer: "GDG Bengaluru & NMIT AI Research Club",
    organizerAvatar: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=100&auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80",
    description: "Hands-on masterclass on building autonomous enterprise agents using Google Gemini 3, LangGraph, Multimodal RAG with Vertex AI, and high-throughput vector search architectures.",
    tags: ["Gemini 3", "AI Agents", "Python", "Vertex AI", "DeepLearning"],
    attendeesCount: 820,
    featured: true,
    speakers: [
      { name: "Vikram Singhania", role: "Principal Architect @ Google DeepMind India", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80" },
      { name: "Dr. Sanjay Sharma", role: "Professor & Head of AI Dept, NMIT", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80" },
      { name: "Tanvi Deshmukh", role: "Staff Research Scientist @ Bengaluru AI Lab", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80" }
    ],
    agenda: [
      { time: "10:00 AM", title: "Keynote: Multi-Turn Reasoning & Agentic Workflows with Gemini", speaker: "Vikram Singhania" },
      { time: "11:45 AM", title: "Production RAG with Vector Embeddings & Cloud Spanner", speaker: "Tanvi Deshmukh" },
      { time: "02:30 PM", title: "Live Code Lab: Deploying Real-time Autonomous Agent on GCP", speaker: "Dr. Sanjay Sharma" },
      { time: "04:45 PM", title: "Panel Discussion: Future of AI Careers in India", speaker: "All Panelists" }
    ],
    registrationUrl: "https://nmit.ac.in/events/ai-conclave"
  },
  {
    id: "evt-nmit-3",
    title: "Fullstack Web & Cloud Native Bootcamp 2026",
    category: "Web3 & Cloud",
    categoryColor: "#10b981", // Emerald Green
    format: "In-Person",
    date: "2026-11-07",
    time: "09:30 AM - 04:30 PM IST",
    location: "ISE Department Lab 4, NMIT Campus, Yelahanka, Bengaluru",
    venueDetails: "Lab 402, 4th Floor ISE Wing, NMIT",
    city: "Bengaluru",
    isVirtual: false,
    price: "₹199",
    priceAmount: 199,
    organizer: "NMIT Web Developers Guild & FOSS India",
    organizerAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&auto=format&fit=crop&q=80",
    description: "Deep dive into React 19, Next.js Server Actions, Docker containerization, Kubernetes on Google Cloud, and CI/CD pipelines. Includes hands-on deployment vouchers and swag kits.",
    tags: ["React 19", "Next.js", "Docker", "Kubernetes", "GCP"],
    attendeesCount: 310,
    featured: false,
    speakers: [
      { name: "Rahul Verma", role: "DevOps Architect @ Swiggy Tech", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80" },
      { name: "Ananya Iyer", role: "Senior Frontend Engineer @ Razorpay", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80" }
    ],
    agenda: [
      { time: "09:30 AM", title: "Modern React 19 Patterns & Concurrent Rendering", speaker: "Ananya Iyer" },
      { time: "01:30 PM", title: "Hands-on Containerization and K8s Cluster Management", speaker: "Rahul Verma" }
    ],
    registrationUrl: "https://nmit.ac.in/bootcamp"
  },
  {
    id: "evt-nmit-4",
    title: "Indian UI/UX & Design Systems Masterclass",
    category: "Design & UX",
    categoryColor: "#eab308", // Royal Gold / Amber
    format: "Hybrid",
    date: "2026-11-14",
    time: "02:00 PM - 06:30 PM IST",
    location: "Mechanical Seminar Hall, NMIT Bengaluru & Zoom",
    venueDetails: "Mech Dept, Ground Floor, NMIT Yelahanka",
    city: "Bengaluru",
    isVirtual: true,
    price: "Free",
    priceAmount: 0,
    organizer: "DesignCraft India & NMIT Creative Club",
    organizerAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=1200&auto=format&fit=crop&q=80",
    description: "Crafting multilingual, high-accessibility mobile and web products tailored for Bharat's next billion users. Master design tokens, micro-interactions, and Figma to React component pipelines.",
    tags: ["UI/UX", "Figma", "Design Systems", "Accessibility", "BharatUX"],
    attendeesCount: 460,
    featured: true,
    speakers: [
      { name: "Pooja Hegde", role: "Design Director @ CRED", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80" },
      { name: "Karthik Nair", role: "Principal UX Researcher @ PhonePe", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80" }
    ],
    agenda: [
      { time: "02:00 PM", title: "Designing for Indic Languages & Tier-2/3 Demographics", speaker: "Karthik Nair" },
      { time: "04:15 PM", title: "Component Systems & Smooth Motion in Production", speaker: "Pooja Hegde" }
    ],
    registrationUrl: "https://designcraft.in"
  },
  {
    id: "evt-nmit-5",
    title: "Open Source India Contribution Sprint (FOSS @ NMIT)",
    category: "Open Source",
    categoryColor: "#10b981", // Emerald
    format: "In-Person",
    date: "2026-11-21",
    time: "10:00 AM - 05:00 PM IST",
    location: "Open Air Amphitheatre & Central Library Lab, NMIT Campus, Bengaluru",
    venueDetails: "Central Library 2nd Floor Digital Lab, NMIT",
    city: "Bengaluru",
    isVirtual: false,
    price: "Free",
    priceAmount: 0,
    organizer: "FOSS United Bengaluru & NMIT Open Source Club",
    organizerAvatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80",
    description: "A nationwide collaborative hack sprint where mentors from CNCF, Rust India, and Mozilla guide students in opening their first production PRs to open-source codebases.",
    tags: ["Open Source", "Rust", "Go", "Git", "Kubernetes", "FOSS"],
    attendeesCount: 680,
    featured: false,
    speakers: [
      { name: "Kiran Kumar", role: "Core Maintainer @ CNCF Kubernetes India", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80" },
      { name: "Shreya Sen", role: "Staff Engineer @ Hasura", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80" }
    ],
    agenda: [
      { time: "10:00 AM", title: "Git Internals & Good First Issue Triage", speaker: "Shreya Sen" },
      { time: "12:30 PM", title: "Sprinting with Maintainers & Live PR Merge Celebration", speaker: "All Mentors" }
    ],
    registrationUrl: "https://fossunited.org/nmit"
  }
];

export const CATEGORIES = [
  "All",
  "AI & ML",
  "Hackathons",
  "Web3 & Cloud",
  "Design & UX",
  "Open Source",
  "Cybersecurity",
  "DevOps & Cloud"
];

export const FORMAT_OPTIONS = ["All Formats", "In-Person", "Virtual", "Hybrid"];

export const SORT_OPTIONS = [
  { id: "date-asc", label: "Date: Soonest First" },
  { id: "date-desc", label: "Date: Furthest Out" },
  { id: "popular", label: "Most Popular (Attendees)" },
  { id: "name-asc", label: "Name: A to Z" },
  { id: "name-desc", label: "Name: Z to A" }
];

export const NMIT_VENUES = [
  "APJ Abdul Kalam Auditorium, NMIT Campus",
  "CSE Seminar Hall, 2nd Floor, NMIT",
  "AI & Robotics Lab 302, NMIT",
  "ISE Department Lab 402, NMIT",
  "MBA Seminar Hall, 3rd Floor, NMIT",
  "Mechanical Seminar Hall, NMIT",
  "Open Air Amphitheatre, NMIT Campus",
  "Central Library Digital Lab, NMIT",
  "Online / Global Livestream"
];

export const ANIMATION_THEMES = [
  {
    id: "saffron-pulse",
    name: "Tricolor Saffron & Peacock Pulse",
    primaryGlow: "#f97316",
    secondaryGlow: "#0284c7",
    accentGlow: "#10b981",
    spotlightColor: "rgba(2, 132, 199, 0.14)",
    spotlightSubColor: "rgba(249, 115, 22, 0.06)",
    wave1Color: "rgba(56, 189, 248, 0.12)",
    wave2Color: "rgba(249, 115, 22, 0.09)",
    gridColor: "rgba(56, 189, 248, "
  },
  {
    id: "nmit-cyber-matrix",
    name: "NMIT Cyber Matrix & Cyan Frequency",
    primaryGlow: "#38bdf8",
    secondaryGlow: "#6366f1",
    accentGlow: "#f97316",
    spotlightColor: "rgba(56, 189, 248, 0.16)",
    spotlightSubColor: "rgba(99, 102, 241, 0.06)",
    wave1Color: "rgba(56, 189, 248, 0.15)",
    wave2Color: "rgba(99, 102, 241, 0.10)",
    gridColor: "rgba(56, 189, 248, "
  },
  {
    id: "emerald-matrix",
    name: "Emerald Matrix & FOSS Terminal",
    primaryGlow: "#10b981",
    secondaryGlow: "#06b6d4",
    accentGlow: "#eab308",
    spotlightColor: "rgba(16, 185, 129, 0.16)",
    spotlightSubColor: "rgba(6, 182, 212, 0.06)",
    wave1Color: "rgba(16, 185, 129, 0.14)",
    wave2Color: "rgba(6, 182, 212, 0.10)",
    gridColor: "rgba(16, 185, 129, "
  },
  {
    id: "royal-indigo",
    name: "Royal Peacock & Gold Neon",
    primaryGlow: "#8b5cf6",
    secondaryGlow: "#eab308",
    accentGlow: "#f97316",
    spotlightColor: "rgba(139, 92, 246, 0.16)",
    spotlightSubColor: "rgba(234, 179, 8, 0.06)",
    wave1Color: "rgba(139, 92, 246, 0.14)",
    wave2Color: "rgba(234, 179, 8, 0.10)",
    gridColor: "rgba(139, 92, 246, "
  }
];

