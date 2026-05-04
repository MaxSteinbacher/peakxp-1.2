import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AppAuthContext = createContext(null);

export function AppAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("peakxp_user");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.id) setUser(parsed);
      }
    } catch {}
    setIsLoading(false);
  }, []);

  function login(userData) {
    const { password: _p, ...safeUser } = userData;
    setUser(safeUser);
    localStorage.setItem("peakxp_user", JSON.stringify(safeUser));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("peakxp_user");
    localStorage.removeItem("peakxp_profile");
    window.location.href = "/";
  }

  function updateUser(partialUpdate) {
    setUser(prev => {
      const updated = { ...prev, ...partialUpdate };
      localStorage.setItem("peakxp_user", JSON.stringify(updated));
      return updated;
    });
  }

  return (
    <AppAuthContext.Provider value={{ user, isLoggedIn: !!user, isLoading, login, logout, updateUser }}>
      {children}
    </AppAuthContext.Provider>
  );
}

export function useAppAuth() {
  return useContext(AppAuthContext);
}