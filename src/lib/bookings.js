import { persist, retrieve, KEYS } from './persistence.js';

// ─── Saved Plans ───────────────────────────────────────────────────────────────

function getAllSavedPlans() {
  return retrieve(KEYS.SAVED_PLANS, null, []);
}

export function getSavedPlans(userId) {
  const all = getAllSavedPlans();
  return userId ? all.filter(p => p.userId === userId) : all;
}

export function savePlan(userId, planData) {
  const all = getAllSavedPlans();
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
  persist(KEYS.SAVED_PLANS, updated, null);
  return plan;
}

export function getUserSavedPlans(userId) {
  return getSavedPlans(userId);
}

export function deleteSavedPlan(id) {
  const updated = getAllSavedPlans().filter(p => p.id !== id);
  persist(KEYS.SAVED_PLANS, updated, null);
}

export function updateSavedPlan(id, changes) {
  const updated = getAllSavedPlans().map(p =>
    p.id === id ? { ...p, ...changes, updatedAt: new Date().toISOString() } : p
  );
  persist(KEYS.SAVED_PLANS, updated, null);
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

function getAllSeasonPasses() {
  return retrieve(KEYS.SEASON_PASSES, null, []);
}

export function getSeasonPasses(userId) {
  const all = getAllSeasonPasses();
  return userId ? all.filter(p => p.userId === userId) : all;
}

export function addSeasonPass(userId, passData) {
  const all = getAllSeasonPasses();
  const pass = {
    id: Date.now().toString(),
    userId: userId || "guest",
    createdAt: new Date().toISOString(),
    ...passData,
  };
  persist(KEYS.SEASON_PASSES, [pass, ...all], null);
  return pass;
}

export function removeSeasonPass(id) {
  const updated = getAllSeasonPasses().filter(p => p.id !== id);
  persist(KEYS.SEASON_PASSES, updated, null);
}