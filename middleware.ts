import { authMiddleware } from "@clerk/nextjs";
 
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware


// not protecting stuff from Stripe because it's an unauthorized user
// https://youtu.be/PjYWpd7xkaM?si=ecbiWLp4mLs0Pd7M&t=20965
export default authMiddleware({
  publicRoutes: ["/api/webhook"]

});
 
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
 