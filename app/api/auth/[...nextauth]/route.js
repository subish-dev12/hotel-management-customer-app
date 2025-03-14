//[...nextauth]
//this is a catch all segment
//catch all in the sense
//this route will handle everything that starts with api/auth/(watever)
// In Next.js, the [...nextauth] syntax defines a catch-all route (or "dynamic catch-all segment"),
//  meaning it matches any request under the /api/auth/ path, regardless of what follows. For example, it handles
// /api/auth/signin, /api/auth/callback/google, /api/auth/signout, and so on. This is the standard way to set up NextAuth.js in a
//  Next.js project because NextAuth.js needs to manage multiple authentication-related endpoints under a single route handler.
export { GET, POST } from "@/app/_lib/auth";
