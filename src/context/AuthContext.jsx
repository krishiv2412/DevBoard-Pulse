import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db, isFirebaseLive } from "../firebase";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Start from scratch: no default fake user
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem("devboard_user_v3");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [adminPortalOpen, setAdminPortalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("user-login"); // "user-login" | "admin-login" | "signup"
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("devboard_user_v3", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("devboard_user_v3");
    }
  }, [currentUser]);

  // Is current logged in user an admin?
  const isAdmin = currentUser?.roleType === "admin" || currentUser?.email === "admin@nmit.ac.in";

  // Firebase auth state listener if live
  useEffect(() => {
    if (!isFirebaseLive || !auth) return;
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        let userDocData = {};
        try {
          if (db) {
            const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
            if (userDoc.exists()) {
              userDocData = userDoc.data();
            }
          }
        } catch (e) {
          console.warn("Firestore user fetch skipped:", e);
        }

        const isAdminRole = userDocData.roleType === "admin" || firebaseUser.email === "admin@nmit.ac.in";

        setCurrentUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName || firebaseUser.email.split("@")[0],
          avatar: firebaseUser.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(firebaseUser.displayName || firebaseUser.email)}&backgroundColor=f97316,0284c7,10b981`,
          role: userDocData.role || (isAdminRole ? "NMIT Event Administrator" : "Student Developer"),
          roleType: isAdminRole ? "admin" : "user",
          college: userDocData.college || "NMIT Bengaluru",
          usn: userDocData.usn || "",
          branch: userDocData.branch || "Computer Science",
          phone: userDocData.phone || ""
        });
      } else {
        // Explicitly clear currentUser on sign out
        setCurrentUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Student / User Login
  const loginUser = async (email, password) => {
    setLoading(true);
    try {
      if (isFirebaseLive && auth) {
        const cred = await signInWithEmailAndPassword(auth, email, password);
        return { success: true, user: cred.user };
      } else {
        // Local account verification from registered accounts
        let registeredUsers = [];
        try {
          registeredUsers = JSON.parse(localStorage.getItem("devboard_registered_users") || "[]");
        } catch {}

        const matched = registeredUsers.find(
          (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );

        if (matched) {
          const userObj = {
            uid: matched.uid,
            email: matched.email,
            displayName: matched.displayName,
            avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(matched.displayName)}&backgroundColor=f97316,0284c7,10b981`,
            role: "Student Developer",
            roleType: "user",
            college: matched.college || "NMIT Bengaluru",
            usn: matched.usn || "",
            branch: matched.branch || "Computer Science",
            phone: matched.phone || ""
          };
          setCurrentUser(userObj);
          return { success: true, user: userObj };
        }

        // Fallback for new email login
        const userObj = {
          uid: "usr-" + Date.now(),
          email,
          displayName: email.split("@")[0],
          avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(email)}&backgroundColor=f97316,0284c7,10b981`,
          role: "Student Developer",
          roleType: "user",
          college: "Nitte Meenakshi Institute of Technology (NMIT)",
          usn: "",
          branch: "Computer Science",
          phone: ""
        };
        setCurrentUser(userObj);
        return { success: true, user: userObj };
      }
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Admin Login (Strictly single dedicated administrator login)
  const loginAdmin = async (email, password) => {
    setLoading(true);
    try {
      const cleanEmail = email.toLowerCase().trim();
      const cleanPass = password.trim();

      // Check if trying to use student account
      if (cleanEmail !== "admin@nmit.ac.in" || cleanPass !== "admin123") {
        return { 
          success: false, 
          error: "Access Denied: Only designated NMIT Administrators (admin@nmit.ac.in) can access the Admin Console. Students please use the 'Sign In' tab." 
        };
      }

      const adminObj = {
        uid: "admin-nmit-1",
        email: "admin@nmit.ac.in",
        displayName: "NMIT Tech Admin",
        avatar: "https://api.dicebear.com/7.x/initials/svg?seed=NMIT+Admin&backgroundColor=f97316",
        role: "NMIT Event Administrator",
        roleType: "admin",
        college: "Nitte Meenakshi Institute of Technology, Bengaluru",
        usn: "FACULTY-COORDINATOR",
        branch: "Department of CSE"
      };

      // Try Firebase auth if admin account exists in Firebase, otherwise fallback to authorized admin
      if (isFirebaseLive && auth) {
        try {
          await signInWithEmailAndPassword(auth, "admin@nmit.ac.in", "admin123");
        } catch (fbErr) {
          // If admin not yet created in firebase auth, create or continue with admin token
          try {
            await createUserWithEmailAndPassword(auth, "admin@nmit.ac.in", "admin123");
          } catch {}
        }
      }

      setCurrentUser(adminObj);
      return { success: true, user: adminObj };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Signup from scratch
  const signupWithEmail = async ({ email, password, displayName, college, usn, branch, phone }) => {
    setLoading(true);
    try {
      const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(displayName || email)}&backgroundColor=f97316,0284c7,10b981`;

      if (isFirebaseLive && auth) {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(cred.user, { displayName, photoURL: avatarUrl });
        if (db) {
          await setDoc(doc(db, "users", cred.user.uid), {
            displayName,
            email,
            role: "Student Developer",
            roleType: "user",
            college: college || "NMIT Bengaluru",
            usn: usn || "",
            branch: branch || "Computer Science",
            phone: phone || "",
            createdAt: new Date().toISOString()
          });
        }
        return { success: true, user: cred.user };
      } else {
        const newUser = {
          uid: "usr-" + Date.now(),
          email,
          password,
          displayName: displayName || email.split("@")[0],
          avatar: avatarUrl,
          role: "Student Developer",
          roleType: "user",
          college: college || "Nitte Meenakshi Institute of Technology (NMIT)",
          usn: usn || "",
          branch: branch || "Computer Science",
          phone: phone || ""
        };

        // Save to registered users list in localStorage
        try {
          const registered = JSON.parse(localStorage.getItem("devboard_registered_users") || "[]");
          registered.push(newUser);
          localStorage.setItem("devboard_registered_users", JSON.stringify(registered));
        } catch {}

        setCurrentUser(newUser);
        return { success: true, user: newUser };
      }
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      if (isFirebaseLive && auth) {
        await signOut(auth);
      }
    } catch (err) {
      console.warn("Sign out error:", err);
    }
    setCurrentUser(null);
    localStorage.removeItem("devboard_user_v3");
    setAdminPortalOpen(false);
    setAuthModalOpen(false);
    setAuthMode("user-login");
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAdmin,
        loading,
        authModalOpen,
        setAuthModalOpen,
        adminPortalOpen,
        setAdminPortalOpen,
        authMode,
        setAuthMode,
        loginUser,
        loginAdmin,
        signupWithEmail,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
