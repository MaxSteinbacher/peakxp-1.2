const SAVED_PLANS_KEY = "peakxp_saved_plans";
const SEASON_PASSES_KEY = "peakxp_season_passes";

// ─── Saved Plans ───────────────────────────────────────────────────────────────

export function getSavedPlans(userId) {
  try {
    const all = JSON.parse(localStorage.getItem(SAVED_PLANS_KEY) || "[]");
    return userId ? all.filter(p => p.userId === userId) : all;
  } catch { return []; }
}

export function savePlan(userId, planData) {
  const all = getSavedPlans();
  const plan = {
    id: Date.now().toString(),
    userId: userId || "guest",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: "planning",
    tags: [],
    notes: "",
    ...planData,
  };
  const updated = [plan, ...all];
  localStorage.setItem(SAVED_PLANS_KEY, JSON.stringify(updated));
  return plan;
}

export function getUserSavedPlans(userId) {
  return getSavedPlans(userId);
}

export function deleteSavedPlan(id) {
  const updated = getSavedPlans().filter(p => p.id !== id);
  localStorage.setItem(SAVED_PLANS_KEY, JSON.stringify(updated));
}

export function updateSavedPlan(id, changes) {
  const updated = getSavedPlans().map(p =>
    p.id === id ? { ...p, ...changes, updatedAt: new Date().toISOString() } : p
  );
  localStorage.setItem(SAVED_PLANS_KEY, JSON.stringify(updated));
}

export function addSavedPlanToBasket(planId, addToBasket) {
  const plan = getSavedPlans().find(p => p.id === planId);
  if (!plan || !plan.itemDetails) return false;
  if (addToBasket) addToBasket(plan.itemDetails);
  return true;
}

// ─── Season Passes ─────────────────────────────────────────────────────────────

export const PASS_REGISTRY = [
  { key: "snowcard_tirol", name: "Snowcard Tirol", region: "Tyrol, Austria", color: "bg-blue-600", textColor: "text-white", price: "~€380/season" },
  { key: "superski", name: "SuperSki Card", region: "Salzburg, Austria", color: "bg-orange-500", textColor: "text-white", price: "~€420/season" },
  { key: "laendle", name: "Ländle Card", region: "Vorarlberg, Austria", color: "bg-green-600", textColor: "text-white", price: "~€320/season" },
  { key: "magic_pass", name: "Magic Pass", region: "Switzerland (80+ resorts)", color: "bg-purple-600", textColor: "text-white", price: "~€389/season" },
  { key: "ikon", name: "Ikon Pass", region: "Global (50+ resorts)", color: "bg-blue-900", textColor: "text-white", price: "~€999/season" },
  { key: "epic", name: "Epic Pass", region: "Global (75+ resorts)", color: "bg-blue-700", textColor: "text-white", price: "~€949/season" },
  { key: "alpin_card", name: "Alpin Card", region: "Salzburg/Styria, Austria", color: "bg-red-700", textColor: "text-white", price: "~€499/season" },
  { key: "dolomiti", name: "Dolomiti Superski", region: "South Tyrol/Dolomites, Italy", color: "bg-yellow-500", textColor: "text-gray-900", price: "~€370/season" },
  { key: "ski_france", name: "Ski France Pass", region: "France (20+ resorts)", color: "bg-blue-500", textColor: "text-white", price: "~€399/season" },
  { key: "livigno", name: "Livigno Card", region: "Livigno, Italy", color: "bg-green-500", textColor: "text-white", price: "~€260/season" },
];

export function getSeasonPasses(userId) {
  try {
    const all = JSON.parse(localStorage.getItem(SEASON_PASSES_KEY) || "[]");
    return userId ? all.filter(p => p.userId === userId) : all;
  } catch { return []; }
}

export function addSeasonPass(userId, passData) {
  const all = getSeasonPasses();
  const pass = {
    id: Date.now().toString(),
    userId: userId || "guest",
    createdAt: new Date().toISOString(),
    ...passData,
  };
  localStorage.setItem(SEASON_PASSES_KEY, JSON.stringify([pass, ...all]));
  return pass;
}

export function removeSeasonPass(id) {
  const updated = getSeasonPasses().filter(p => p.id !== id);
  localStorage.setItem(SEASON_PASSES_KEY, JSON.stringify(updated));
}