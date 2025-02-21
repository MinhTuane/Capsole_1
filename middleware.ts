import {  clerkMiddleware ,createRouteMatcher} from '@clerk/nextjs/server'
import { NextResponse } from 'next/server';

const protectedRoutes = createRouteMatcher([
    '/',
    '/upcoming',
    '/previous',
    '/recordings',
    '/personal-room',
    '/meeting(.*)'
])

export default clerkMiddleware(async(auth,req)=>{
  if (protectedRoutes(req)) {
    // If user is not authenticated, redirect them to a sign-in page
    if(!(await auth()).userId) {

      return NextResponse.redirect(new URL('/sign-in', req.url));
    }
    
  }

  return NextResponse.next();
})
    
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}