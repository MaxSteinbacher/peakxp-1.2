import { createContext, useContext, useState, useEffect } from "react";
import { useAppAuth } from "./AppAuthContext";

const ProfileContext = createContext(null);

const DEFAULT_PROFILE = {
  height: null, weight: null, shoeSize: null, helmetSize: null,
  clothingSize: null, skiingLevel: null, preferredDiscipline: [],
  homeCity: null, homeCountry: null, homeAirport: null, homeTrainStation: null,
  savedResorts: [], savedHotels: [],
  language: "en", currency: "EUR", temperatureUnit: "celsius", distanceUnit: "metric",
  notifications: {
    newSnow: true, liftStatus: true, priceAlerts: true,
    friendActivity: true, challenges: true, promotions: true, newsletter: true,
  },
  priceAlerts: [],
  emergencyContactName: null, emergencyContactPhone: null,
  bloodType: null, medicalNotes: null,
  profileVisibility: "friends", showActivityFeed: true, showStats: true,
};

export function ProfileProvider({ children }) {
  const { isLoggedIn } = useAppAuth();
  const [profile, setProfile] = useState(DEFAULT_PROFILE);

  useEffect(() => {
    if (!isLoggedIn) return;
    try {
      const stored = localStorage.getItem("peakxp_profile");
      if (stored) setProfile({ ...DEFAULT_PROFILE, ...JSON.parse(stored) });
    } catch {}
  }, [isLoggedIn]);

  function updateProfile(partialUpdate) {
    setProfile(prev => {
      const updated = { ...prev, ...partialUpdate };
      localStorage.setItem("peakxp_profile", JSON.stringify(updated));
      return updated;
    });
  }

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  return useContext(ProfileContext);
}