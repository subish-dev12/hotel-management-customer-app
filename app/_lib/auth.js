// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

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
  },
  secret: process.env.NEXTAUTH_SECRET, // Added for security
};

export const {
  auth,
  handlers: { GET, POST },
} = NextAuth(authConfig);

//https://grok.com/chat/0c57aaf7-0724-447e-ae26-e7c222d88167

// When does the authorized function get called?
// The authorized callback (optional in the callbacks object) is invoked by the auth middleware when a visitor attempts to access a protected route (e.g., /account, specified in matcher).
// It determines if access is granted, such as by checking if the visitor is authenticated.
//if the user is unauthenticated then by default the user is redirected to the signin page.
//check it yourself...
