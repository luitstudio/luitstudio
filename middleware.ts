import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const WWW_HOST = "www.luitstudio.com";
const CANONICAL_HOST = "luitstudio.com";

function requestHost(request: NextRequest): string {
  // On Vercel, x-forwarded-host carries the visitor-facing host. Fall back to
  // Host for local validation and other deployment environments.
  const host =
    request.headers.get("x-forwarded-host") ??
    request.headers.get("host") ??
    request.nextUrl.host;

  return host.split(",")[0].trim().toLowerCase().replace(/:\d+$/, "");
}

export async function middleware(request: NextRequest) {
  // Redirect only the public www custom domain. Exact matching prevents loops
  // and deliberately leaves the apex, Vercel production alias, and previews
  // untouched. pathname and search are retained by cloning the request URL.
  if (requestHost(request) === WWW_HOST) {
    const canonicalUrl = request.nextUrl.clone();
    canonicalUrl.protocol = "https:";
    canonicalUrl.host = CANONICAL_HOST;
    canonicalUrl.port = "";
    return NextResponse.redirect(canonicalUrl, 308);
  }

  // Keep authentication middleware scoped to admin traffic. The broad matcher
  // below exists solely so www redirects also cover public pages, APIs, and
  // generated SEO routes without adding Supabase work to those requests.
  if (!request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next({ request });
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  await supabase.auth.getUser();

  return response;
}

export const config = {
  matcher: ["/:path*"],
};
