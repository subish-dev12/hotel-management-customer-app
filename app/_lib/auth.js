// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";
//signIn is about authenticating the user (i.e., "Can this user log in?").
// authorized is about authorizing access to specific resources (i.e., "Can this user access this route or API?").
// The signIn callback must succeed (return true) for a session to be created, and only after a session exists can authorized come into play to check access rights.
//authorized callback is called after the user has logged in (authenticated) and the authorized callback only works after the user has authenticated and wants access to certain
//resource of our app
const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  // authorized determines whether a user is authorized to access a specific page or resource in your application.
  callbacks: {
    authorized({ auth, request }) {
      // auth gives the info about current session like user id , name , email etc
      return !!auth?.user;
      //double exclamation here is the trick to convert any value into boolean (true or false.)
    },
    async signIn({ user, account, profile }) {
      // https://grok.com/chat/9a9516a0-3549-4582-8af4-c21f732f180c
      //the user parameter is actually the user object (email,name, id....) that is returned by the provider (google in this case)
      try {
        const existingGuest = await getGuest(user.email);
        //we're checking here if the user already exists or not
        console.log("user ko data", user);
        if (!existingGuest)
          await createGuest({ email: user.email, fullName: user.name });
        return true;
      } catch {
        return false;
      }
      //if some error happens at the getGuest function then we'll move to the catch block and return false.
      //and user is not going to be logged in
    },
    // it is a callback function is invoked before the actual sign up happens
    //we can perform all sort of operations that are linked with signing in process
    //it somewhat acts like a middleware since it runs after the user has entered the
    //credentials but before the actual signing it take place
    async session({ session, user }) {
      const guest = await getGuest(session.user.email);
      //previosly session object had only name email and image.
      //but we added guestId there, for fetching guest information on other various pages.
      session.user.guestId = guest.id;
      return session;
      //returning the session with added id.
      // console.log("session ko session", session);
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET, // Added for security
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
// These exported functions—like signIn, signOut, auth, and
//  handlers—are tools NextAuth gives you to handle authentication without writing everything from scratch.

//https://grok.com/chat/0c57aaf7-0724-447e-ae26-e7c222d88167

// When does the authorized function get called?
// The authorized callback (optional in the callbacks object) is invoked by the auth middleware when a visitor attempts to access a protected route (e.g., /account, specified in matcher).
// It determines if access is granted, such as by checking if the visitor is authenticated.
//if the user is unauthenticated then by default the user is redirected to the signin page.
//check it yourself...

//pages object of the authConfig:
// By default, NextAuth provides built-in pages for these actions (e.g., at /api/auth/signin, signout), but the "pages" object lets you override these with custom pages in your Next.js application. This is particularly useful if you want to
//  create a tailored user experience or integrate authentication flows into your app’s design.

//so when does the session callback runs then ?
// ---->Whenver the user signs in initially,auth js geenrates the initial session object (usually from the provider like username email etc.)
//session Callback: Runs immediately after this base(initial) session is created to let you customize it before it’s saved or sent to the client.
//so session call back allows us to modify/add the session datas on the session like the for example "id".
