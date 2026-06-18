// Exposes Auth.js's HTTP endpoints (sign-in page, callbacks, session, etc.)
// at /api/auth/*. The [...nextauth] catch-all segment forwards every auth URL
// to these handlers.
import { handlers } from "@/auth";

export const { GET, POST } = handlers;
