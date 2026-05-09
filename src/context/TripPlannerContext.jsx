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

  function normaliseServiceKeys(arr) {
    if (!arr || !Array.isArray(arr)) return ["ski-pass"];
    const MAP = {
      skipass: "ski-pass", skiPass: "ski-pass", liftpass: "ski-pass", liftPass: "ski-pass", lift_pass: "ski-pass", ski_pass: "ski-pass",
      skischool: "ski-school", skiSchool: "ski-school", ski_school: "ski-school",
      carrental: "car", carRental: "car", car_rental: "car",
      hotelaccommodation: "accommodation", hotel: "accommodation",
    };
    return arr.map(k => {
      const lower = k.replace(/_/g, "-").replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
      return MAP[k] || MAP[k.toLowerCase()] || lower;
    });
  }

  function computeFirstStep(services, resortsArray) {
    if (!services || services.length === 0) return null;
    const serviceOrder = ["ski-pass", "accommodation", "equipment", "ski-school", "dining", "storage", "activities", "childcare"];
    const globalServices = ["flights", "train", "car"];
    const resortId = resortsArray?.[0]?.resortId || null;

    // Need resort selection?
    if (!resortId && services.some(s => !globalServices.includes(s))) {
      return { serviceKey: "resort-selection", resortId: null, stepIndex: 0 };
    }

    for (const svc of serviceOrder) {
      if (services.includes(svc)) return { serviceKey: svc, resortId, stepIndex: 0 };
    }
    for (const svc of globalServices) {
      if (services.includes(svc)) return { serviceKey: svc, resortId: null, stepIndex: 0 };
    }
    return null;
  }

  function startTrip(destination, dates, guests, selectedServices, initialResort = null) {
    const normalisedServices = normaliseServiceKeys(selectedServices);
    const resortsArray = initialResort
      ? [{ ...initialResort, resortId: initialResort.resortId || initialResort.id, order: 0 }]
      : [];
    const firstStep = computeFirstStep(normalisedServices, resortsArray);
    const newSession = {
      id: generateSessionId(),
      createdAt: new Date().toISOString(),
      status: "in-progress",
      destination,
      dates,
      guests,
      selectedServices: normalisedServices,
      resorts: resortsArray,
      currentResortIndex: 0,
      currentStep: firstStep,
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
    if (!session.selectedServices || session.selectedServices.length === 0) return null;

    const services = session.selectedServices.map(s =>
      s.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/_/g, "-").toLowerCase()
    );

    const serviceOrder = [
      "ski-pass", "accommodation", "equipment", "ski-school",
      "dining", "storage", "activities", "childcare",
      "flights", "train", "car",
    ];

    const globalServices = ["flights", "train", "car"];

    // Check if resort selection is needed
    if (session.resorts.length === 0) {
      const needsResortSelection = services.some(s => !globalServices.includes(s));
      if (needsResortSelection) {
        return { serviceKey: "resort-selection", resortId: null, label: "Choose your ski resort", isLastStep: false };
      }
    }

    // If ski-pass not selected, skip per-resort loop for non-resort services
    if (!services.includes("ski-pass") && session.resorts.length === 0) {
      for (const service of serviceOrder) {
        if (services.includes(service) && !globalServices.includes(service)) {
          if (!isStepComplete(service, null)) {
            return { serviceKey: service, resortId: null, label: service.charAt(0).toUpperCase() + service.slice(1), isLastStep: false };
          }
        }
      }
    }

    // Process each resort
    for (let i = 0; i < session.resorts.length; i++) {
      const resort = session.resorts[i];
      for (const service of serviceOrder) {
        if (!services.includes(service)) continue;
        if (globalServices.includes(service)) continue;
        if (!isStepComplete(service, resort.resortId)) {
          const isLastResort = i === session.resorts.length - 1;
          const allResortServicesComplete = serviceOrder.every(
            s => !services.includes(s) || globalServices.includes(s) || isStepComplete(s, resort.resortId)
          );
          return {
            serviceKey: service, resortId: resort.resortId,
            label: service.charAt(0).toUpperCase() + service.slice(1),
            isLastStep: isLastResort && allResortServicesComplete && !services.some(s => globalServices.includes(s)),
          };
        }
      }
    }

    // Global steps
    for (const service of serviceOrder) {
      if (!services.includes(service)) continue;
      if (!globalServices.includes(service)) continue;
      if (!isStepComplete(service, null)) {
        return { serviceKey: service, resortId: null, label: service.charAt(0).toUpperCase() + service.slice(1), isLastStep: true };
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