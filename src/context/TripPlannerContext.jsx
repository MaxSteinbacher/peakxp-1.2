import { createContext, useContext, useState, useEffect } from "react";
import { useAppAuth } from "./AppAuthContext";

const TripPlannerContext = createContext(null);

export function TripPlannerProvider({ children }) {
  const { user } = useAppAuth();
  const [session, setSession] = useState(null);

  // Load draft on mount if logged in
  useEffect(() => {
    if (user) {
      const draft = localStorage.getItem("peakxp_trip_draft");
      if (draft) {
        try {
          setSession(JSON.parse(draft));
        } catch {}
      }
    }
  }, [user]);

  function generateSessionId() {
    return String(Date.now());
  }

  function startTrip(destination, dates, guests, selectedServices) {
    const newSession = {
      id: generateSessionId(),
      createdAt: new Date().toISOString(),
      status: "in-progress",
      destination,
      dates,
      guests,
      selectedServices,
      resorts: [],
      currentResortIndex: 0,
      currentStep: null,
      completedSteps: [],
      basket: [],
    };
    setSession(newSession);
    if (user) {
      localStorage.setItem("peakxp_trip_draft", JSON.stringify(newSession));
    }
  }

  function addResort(resortObject) {
    setSession((prev) => {
      const updated = {
        ...prev,
        resorts: [
          ...prev.resorts,
          { ...resortObject, order: prev.resorts.length },
        ],
      };
      if (user) localStorage.setItem("peakxp_trip_draft", JSON.stringify(updated));
      return updated;
    });
  }

  function removeResort(resortId) {
    setSession((prev) => {
      const updated = {
        ...prev,
        resorts: prev.resorts.filter((r) => r.resortId !== resortId),
        basket: prev.basket.filter((item) => item.resortId !== resortId),
      };
      if (user) localStorage.setItem("peakxp_trip_draft", JSON.stringify(updated));
      return updated;
    });
  }

  function setCurrentStep(serviceKey, resortId = null) {
    setSession((prev) => {
      const updated = {
        ...prev,
        currentStep: { serviceKey, resortId, stepIndex: 0 },
      };
      if (user) localStorage.setItem("peakxp_trip_draft", JSON.stringify(updated));
      return updated;
    });
  }

  function markStepComplete(serviceKey, resortId = null) {
    setSession((prev) => {
      const alreadyExists = prev.completedSteps.some(
        (s) => s.serviceKey === serviceKey && s.resortId === resortId
      );
      const updated = {
        ...prev,
        completedSteps: alreadyExists
          ? prev.completedSteps
          : [
              ...prev.completedSteps,
              { serviceKey, resortId, completed: true, skipped: false },
            ],
      };
      if (user) localStorage.setItem("peakxp_trip_draft", JSON.stringify(updated));
      return updated;
    });
  }

  function markStepSkipped(serviceKey, resortId = null) {
    setSession((prev) => {
      const alreadyExists = prev.completedSteps.some(
        (s) => s.serviceKey === serviceKey && s.resortId === resortId
      );
      const updated = {
        ...prev,
        completedSteps: alreadyExists
          ? prev.completedSteps
          : [
              ...prev.completedSteps,
              { serviceKey, resortId, completed: false, skipped: true },
            ],
      };
      if (user) localStorage.setItem("peakxp_trip_draft", JSON.stringify(updated));
      return updated;
    });
  }

  function addToBasket(item) {
    setSession((prev) => {
      const updated = {
        ...prev,
        basket: [...prev.basket, { ...item, itemId: String(Date.now()) }],
      };
      if (user) localStorage.setItem("peakxp_trip_draft", JSON.stringify(updated));
      return updated;
    });
  }

  function removeFromBasket(itemId) {
    setSession((prev) => {
      const updated = {
        ...prev,
        basket: prev.basket.filter((item) => item.itemId !== itemId),
      };
      if (user) localStorage.setItem("peakxp_trip_draft", JSON.stringify(updated));
      return updated;
    });
  }

  function updateBasketItem(itemId, changes) {
    setSession((prev) => {
      const updated = {
        ...prev,
        basket: prev.basket.map((item) =>
          item.itemId === itemId ? { ...item, ...changes } : item
        ),
      };
      if (user) localStorage.setItem("peakxp_trip_draft", JSON.stringify(updated));
      return updated;
    });
  }

  function clearTrip() {
    setSession(null);
    localStorage.removeItem("peakxp_trip_draft");
  }

  function loadDraft() {
    if (user) {
      const draft = localStorage.getItem("peakxp_trip_draft");
      if (draft) {
        try {
          setSession(JSON.parse(draft));
        } catch {}
      }
    }
  }

  function isStepComplete(serviceKey, resortId = null) {
    if (!session) return false;
    return session.completedSteps.some(
      (s) => s.serviceKey === serviceKey && s.resortId === resortId
    );
  }

  function getBasketTotal(currency = "EUR") {
    if (!session) return 0;
    return session.basket.reduce((sum, item) => sum + (item.priceEUR || 0) * (item.quantity || 1), 0);
  }

  function getNextStep() {
    if (!session) return null;

    const serviceOrder = [
      "ski-pass",
      "accommodation",
      "equipment",
      "ski-school",
      "dining",
      "storage",
      "activities",
      "childcare",
      "flights",
      "train",
      "car",
    ];

    const globalServices = ["flights", "train", "car"];

    // If ski-pass not selected, skip resort selection
    if (!session.selectedServices.includes("ski-pass")) {
      // Go directly to first selected service with null resortId
      for (const service of serviceOrder) {
        if (session.selectedServices.includes(service) && !globalServices.includes(service)) {
          if (!isStepComplete(service, null)) {
            return {
              serviceKey: service,
              resortId: null,
              label: service.charAt(0).toUpperCase() + service.slice(1),
              isLastStep: false,
            };
          }
        }
      }
    }

    // Check if resort selection is needed
    if (session.destination.type !== "resort" && session.resorts.length === 0) {
      const needsResortSelection = session.selectedServices.some(
        (s) => !globalServices.includes(s)
      );
      if (needsResortSelection) {
        return {
          serviceKey: "resort-selection",
          resortId: null,
          label: "Choose your ski resort",
          isLastStep: false,
        };
      }
    }

    // Process each resort
    for (let i = 0; i < session.resorts.length; i++) {
      const resort = session.resorts[i];
      for (const service of serviceOrder) {
        if (!session.selectedServices.includes(service)) continue;
        if (globalServices.includes(service)) continue;

        if (!isStepComplete(service, resort.resortId)) {
          const isLastResort = i === session.resorts.length - 1;
          const allResortServicesComplete = serviceOrder.every(
            (s) =>
              !session.selectedServices.includes(s) ||
              globalServices.includes(s) ||
              isStepComplete(s, resort.resortId)
          );

          return {
            serviceKey: service,
            resortId: resort.resortId,
            label: service.charAt(0).toUpperCase() + service.slice(1),
            isLastStep: isLastResort && allResortServicesComplete && !session.selectedServices.some((s) => globalServices.includes(s)),
          };
        }
      }
    }

    // Global steps
    for (const service of serviceOrder) {
      if (!session.selectedServices.includes(service)) continue;
      if (!globalServices.includes(service)) continue;

      if (!isStepComplete(service, null)) {
        return {
          serviceKey: service,
          resortId: null,
          label: service.charAt(0).toUpperCase() + service.slice(1),
          isLastStep: true,
        };
      }
    }

    return null;
  }

  return (
    <TripPlannerContext.Provider
      value={{
        session,
        startTrip,
        addResort,
        removeResort,
        setCurrentStep,
        markStepComplete,
        markStepSkipped,
        addToBasket,
        removeFromBasket,
        updateBasketItem,
        clearTrip,
        loadDraft,
        isStepComplete,
        getBasketTotal,
        getNextStep,
      }}
    >
      {children}
    </TripPlannerContext.Provider>
  );
}

export function useTripPlanner() {
  return useContext(TripPlannerContext);
}

/**
 * Custom hook for unsaved trip warning
 * Shows browser confirm if logged out, in-app modal if logged in
 */
export function useUnsavedTripWarning() {
  const { session } = useTripPlanner();
  const { user } = useAppAuth();

  useEffect(() => {
    if (!session || session.basket.length === 0) return;

    function handleBeforeUnload(e) {
      if (!user) {
        e.preventDefault();
        e.returnValue = "Your trip plan will not be saved if you leave. Sign in to save your progress.";
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [session, user]);
}