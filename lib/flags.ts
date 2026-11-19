// Feature flags. ESTIMATOR_ENABLED is mirrored into NEXT_PUBLIC_ESTIMATOR_ENABLED by next.config.ts at build
// time so the same flag works on the server and in the browser. AI_CHAT_ENABLED is server-only (Phase 2).
export const estimatorEnabled = process.env.NEXT_PUBLIC_ESTIMATOR_ENABLED === "true";
export const aiChatEnabled = process.env.AI_CHAT_ENABLED === "true";
