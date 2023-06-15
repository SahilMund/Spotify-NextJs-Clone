import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

/*

this middleware function sets up server-side authentication with 
Supabase in a Next.js application. It initializes a Supabase client
 using the provided request and response objects, 
 retrieves the user's session, and ensures 
 that the authentication is applied to the incoming request.
*/
export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  // creates a Supabase client instance specifically configured for server-side authentication using the provided request and response objects.
  const supabase = createMiddlewareClient({ req, res });
  //   to check the user's session and authenticate the request using Supabase authentication. This ensures that the user's session is retrieved and available for subsequent authentication checks and protected route handling.
  await supabase.auth.getSession();
  return res;
}
