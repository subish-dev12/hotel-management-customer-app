// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

// This file sets up authentication with NextAuth.js using Google as a login option.

const authConfig = {
  // Providers: List of ways users can sign in.
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],

  // Callbacks: Functions that run at different steps of the login process.
  callbacks: {
    // Authorized: Checks if a user can access a page or feature.
    // Runs after login when someone tries to visit a protected page.
    authorized({ auth, request }) {
      // 'auth' has session info (like user ID, name, email).
      // Returns true if user is logged in, false if not.
      return !!auth?.user; // Double !! turns it into true/false.
    },

    // SignIn: Runs when a user tries to log in.
    // Checks if login is okay and sets up the user in our system.
    async signIn({ user, account, profile }) {
      // 'user' is info from Google (email, name, etc.).
      try {
        // See if this user already exists in our database.
        const existingGuest = await getGuest(user.email);

        // If user doesn’t exist, create them with their email and name.
        if (!existingGuest) {
          await createGuest({ email: user.email, fullName: user.name });
        }
        return true; // Login successful.
      } catch {
        return false; // Login fails if something goes wrong.
      }
    },

    // Session: Runs after sign-in to customize the session data.
    // Adds extra info (like guest ID) to the session for later use.
    async session({ session, user }) {
      // Get the guest info from our database using the email.
      const guest = await getGuest(session.user.email);
      // Add the guest’s ID to the session (originally just name, email, image).
      session.user.guestId = guest.id;
      return session; // Return the updated session.
    },
  },

  // Pages: Custom page for login.
  pages: {
    signIn: "/login", // Users go here to sign in instead of the default page.
  },

  // Secret: A security key for NextAuth.
  secret: process.env.NEXTAUTH_SECRET,
};

// Export tools from NextAuth to use in our app (login, logout, etc.).
export const {
  auth, // Checks session or protects routes.
  signIn, // Logs a user in.
  signOut, // Logs a user out.
  handlers: { GET, POST }, // Handles API requests for auth.
} = NextAuth(authConfig);

// ---- Simple Notes ----
// How It Works:
// 1. SignIn: Runs when a user logs in. Makes sure they’re valid and sets them up.
// 2. Session: Runs right after sign-in to add extra info to their session (like guest ID).
// 3. Authorized: Runs later when a user tries to access a protected page. Checks if they’re logged in.

// When Things Happen:
// - SignIn: When someone clicks "Sign in with Google."
// - Session: Right after sign-in succeeds, and also when the app checks the session later.
// - Authorized: When a logged-in user tries to visit a protected page (e.g., /account).
// - If authorized fails (returns false), they’re sent to /login.

// Pages: We set /login as the sign-in page instead of using NextAuth’s default one.
