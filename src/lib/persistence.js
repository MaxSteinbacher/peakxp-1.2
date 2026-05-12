// ─── Storage Key Constants ──────────────────────────────────────────────────
export const KEYS = {
  USER: 'user',
  PROFILE: 'profile',
  CURRENCY: 'currency',
  LANGUAGE: 'language',
  BOOKINGS: 'bookings',
  SAVED_PLANS: 'saved_plans',
  SEASON_PASSES: 'season_passes',
  TRIP_DRAFT: 'trip_draft',
  ACTIVITIES: 'activities',
  VISION_ANALYSES: 'vision_analyses',
  AGENT_CONVERSATIONS: 'agent_conversations',
  AGENT_PLANS: 'agent_plans',
  COMMUNITY_POSTS: 'community_posts',
  COMMUNITY_DRAFT: 'community_draft',
  ROUTES: 'routes',
  NOTIFICATIONS: 'notifications',
  BACK_CONTEXT: 'back_context',
  REDIRECT: 'redirect',
  AGENT_OPTION: 'agent_option',
  AGENT_SERVICE_DETAILS: 'agent_service_details',
};

// ─── Key Builder ────────────────────────────────────────────────────────────
function storageKey(key, userId) {
  return userId ? `peakxp_${userId}_${key}` : `peakxp_${key}`;
}

// ─── Core API ────────────────────────────────────────────────────────────────

/**
 * Write a value to localStorage. Returns the value written.
 */
export function persist(key, value, userId) {
  try {
    localStorage.setItem(storageKey(key, userId), JSON.stringify(value));
  } catch {}
  return value;
}

/**
 * Read a value from localStorage. Returns fallback if missing or parse fails.
 */
export function retrieve(key, userId, fallback = null) {
  try {
    const raw = localStorage.getItem(storageKey(key, userId));
    if (raw === null || raw === undefined) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

/**
 * Remove a key from localStorage.
 */
export function remove(key, userId) {
  try {
    localStorage.removeItem(storageKey(key, userId));
  } catch {}
}

/**
 * Remove all localStorage keys that start with peakxp_[userId]_
 * Used on logout to clear all user-scoped data.
 */
export function clearUserData(userId) {
  if (!userId) return;
  const prefix = `peakxp_${userId}_`;
  try {
    const toRemove = Object.keys(localStorage).filter(k => k.startsWith(prefix));
    toRemove.forEach(k => localStorage.removeItem(k));
  } catch {}
}

/**
 * Remove all localStorage keys that start with peakxp_
 * Used for full reset.
 */
export function clearAll() {
  try {
    const toRemove = Object.keys(localStorage).filter(k => k.startsWith('peakxp_'));
    toRemove.forEach(k => localStorage.removeItem(k));
  } catch {}
}