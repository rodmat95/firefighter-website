import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get("host") || "";
  
  // Extract subdomain (handling localhost and production domains)
  // Logic: Split by dot. If localhost, subdomain is first part if length > 1 (e.g., path.localhost:3000)
  // If production (e.g., path.example.com), subdomain is first part usually.
  
  // Normalized checking for subdomain
  let currentHost = hostname.replace(".localhost:3000", "").replace(".localhost", ""); // simple dev handling
  // For production you might want: const currentHost = hostname.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, "");
  
  // If we are on localhost:3000, currentHost is "localhost:3000", so we need to be careful
  // Let's use a robust approach: check if it STARTS with the subdomain
  
  const isSubdomain = (sub: string) => hostname.startsWith(`${sub}.`);

  // 1. Path Editor -> path.domain
  if (isSubdomain("path")) {
    url.pathname = `/path-editor${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // 2. North Offset Editor -> north-set.domain
  if (isSubdomain("north-set")) {
    url.pathname = `/north-offset-editor${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // 3. Hotspot Editor -> hotspot.domain
  if (isSubdomain("hotspot")) {
    url.pathname = `/hotspot-editor${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // 4. Block direct access on main domain
  // If we assume main domain is NOT one of the above subdomains
  if (
    url.pathname.startsWith("/path-editor") || 
    url.pathname.startsWith("/north-offset-editor") || 
    url.pathname.startsWith("/hotspot-editor")
  ) {
    // Return 404 or Redirect to home
    return new NextResponse(null, { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
