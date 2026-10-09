import React, { useState } from "react";
import { useEvents } from "../context/EventsContext";
import { isFirebaseLive, getStoredFirebaseConfig } from "../firebase";
import { 
  X, 
  Flame, 
  CheckCircle2, 
  Layers, 
  Key, 
  Save, 
  RefreshCw, 
  ExternalLink,
  HelpCircle,
  Database
} from "lucide-react";

export const FirebaseConfigModal = () => {
  const { firebaseConfigModalOpen, setFirebaseConfigModalOpen, showToast } = useEvents();
  const defaultConfig = getStoredFirebaseConfig();

  const [apiKey, setApiKey] = useState(defaultConfig.apiKey || "");
  const [projectId, setProjectId] = useState(defaultConfig.projectId || "");
  const [authDomain, setAuthDomain] = useState(defaultConfig.authDomain || "");
  const [storageBucket, setStorageBucket] = useState(defaultConfig.storageBucket || "");
  const [messagingSenderId, setMessagingSenderId] = useState(defaultConfig.messagingSenderId || "");
  const [appId, setAppId] = useState(defaultConfig.appId || "");

  if (!firebaseConfigModalOpen) return null;

  const handleSaveConfig = (e) => {
    e.preventDefault();
    const config = {
      apiKey: apiKey.trim(),
      authDomain: authDomain.trim(),
      projectId: projectId.trim(),
      storageBucket: storageBucket.trim(),
      messagingSenderId: messagingSenderId.trim(),
      appId: appId.trim()
    };
    localStorage.setItem("devboard_custom_firebase_config", JSON.stringify(config));
    showToast("Firebase credentials saved! Reloading to establish cloud sync...", "success");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleResetToLocal = () => {
    localStorage.removeItem("devboard_custom_firebase_config");
    showToast("Switched back to DevBoard local database mode", "info");
    setTimeout(() => {
      window.location.reload();
    }, 800);
  };

  return (
    <div className="modal-backdrop" onClick={() => setFirebaseConfigModalOpen(false)}>
      <div 
        className="modal-container firebase-modal" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="fb-modal-title"
      >
        <button 
          className="modal-close-btn" 
          onClick={() => setFirebaseConfigModalOpen(false)}
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="firebase-modal-header">
          <div className="firebase-icon-wrap">
            <Flame size={22} className="text-amber-400" />
          </div>
          <div>
            <span className="reg-kicker">DATABASE & CLOUD SYNC</span>
            <h3 id="fb-modal-title" className="firebase-modal-title">Firebase Console Setup</h3>
          </div>
        </div>

        {/* Live Status Card */}
        <div className={`firebase-status-banner ${isFirebaseLive ? "live" : "local"}`}>
          <div className="status-banner-icon">
            {isFirebaseLive ? (
              <CheckCircle2 size={20} className="text-emerald-400" />
            ) : (
              <Layers size={20} className="text-cyan-400" />
            )}
          </div>
          <div className="status-banner-text">
            <span className="status-banner-title">
              {isFirebaseLive ? "Connected to Live Google Firebase Firestore" : "Running on Local Database (Offline Capable)"}
            </span>
            <p className="status-banner-desc">
              {isFirebaseLive 
                ? "Registrations, user sign-ups, and event edits are actively streaming to your Firestore Cloud Database." 
                : "All registrations, signups, and events are stored locally. Paste your Firebase credentials below to sync across all devices."}
            </p>
          </div>
        </div>

        {/* Quick Instructions Accordion */}
        <div className="firebase-guide-box">
          <div className="guide-box-header">
            <HelpCircle size={15} className="text-saffron" />
            <span>How to get credentials from Firebase Console:</span>
          </div>
          <ol className="guide-steps-list">
            <li>
              Go to <a href="https://console.firebase.google.com/" target="_blank" rel="noreferrer" className="text-saffron hover:underline inline-flex items-center gap-1">console.firebase.google.com <ExternalLink size={11} /></a> and click <strong>Create a project</strong>.
            </li>
            <li>Enable <strong>Authentication</strong> (Email/Password) and <strong>Cloud Firestore</strong> (Start in Test Mode).</li>
            <li>Click <strong>Project Settings (⚙)</strong> &rarr; <strong>Your Apps (&lt;/&gt; Web)</strong> &rarr; Copy the config keys below.</li>
          </ol>
        </div>

        {/* Configuration Form */}
        <form onSubmit={handleSaveConfig} className="firebase-config-form">
          <div className="fb-form-grid">
            <div className="form-field">
              <label htmlFor="cfg-apikey">API Key (apiKey) *</label>
              <input
                id="cfg-apikey"
                type="text"
                placeholder="AIzaSyB..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="cfg-projid">Project ID (projectId) *</label>
              <input
                id="cfg-projid"
                type="text"
                placeholder="nmit-devboard-2026"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="cfg-authdom">Auth Domain (authDomain)</label>
              <input
                id="cfg-authdom"
                type="text"
                placeholder="nmit-devboard-2026.firebaseapp.com"
                value={authDomain}
                onChange={(e) => setAuthDomain(e.target.value)}
              />
            </div>

            <div className="form-field">
              <label htmlFor="cfg-bucket">Storage Bucket (storageBucket)</label>
              <input
                id="cfg-bucket"
                type="text"
                placeholder="nmit-devboard-2026.appspot.com"
                value={storageBucket}
                onChange={(e) => setStorageBucket(e.target.value)}
              />
            </div>

            <div className="form-field">
              <label htmlFor="cfg-msgid">Messaging Sender ID</label>
              <input
                id="cfg-msgid"
                type="text"
                placeholder="104829104829"
                value={messagingSenderId}
                onChange={(e) => setMessagingSenderId(e.target.value)}
              />
            </div>

            <div className="form-field">
              <label htmlFor="cfg-appid">App ID (appId)</label>
              <input
                id="cfg-appid"
                type="text"
                placeholder="1:104829104829:web:abcdef123"
                value={appId}
                onChange={(e) => setAppId(e.target.value)}
              />
            </div>
          </div>

          {/* Form Action Buttons */}
          <div className="firebase-form-actions">
            <button type="button" className="config-reset-btn" onClick={handleResetToLocal}>
              <RefreshCw size={14} />
              <span>Use Local Storage</span>
            </button>
            <button type="submit" className="config-save-btn">
              <Save size={15} />
              <span>Save & Connect Firebase</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
