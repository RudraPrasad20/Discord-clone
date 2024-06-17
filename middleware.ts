import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
    // @ts-ignore
    publicRoutes: ["api/uploadthing"]
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};