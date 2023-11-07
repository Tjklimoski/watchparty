// import { NextRequest, NextResponse as res } from 'next/server'
// import { getToken } from "next-auth/jwt"

// export async function middleware(req: NextRequest) {
//   const token = await getToken({ req })

//   if (token) {
//     if (req.nextUrl.pathname.startsWith('/auth')) {
//       // if logged in and going to /auth page, redirect user to /media
//       return res.redirect(new URL('/media', req.url))
//     }
//   } else {
//     if (!req.nextUrl.pathname.startsWith('/auth')) {
//       // if NOT logged in and going to a matching path that's NOT /auth then redirect user to /auth to log in.
//       return res.redirect(new URL('/auth?signin=true', req.url))
//     }
//   }
// }

// // The middleware will ONLY RUN on the following paths:
// // - all /api/:path* routes EXCEPT /api/auth/:path*
// // - /auth
// // - /media/:path*
// // - /user/:path*
// // - /watchparty/:path*
// // All other paths are exposed and accesible without being logged in.
// export const config = {
//   matcher: ['/api/((?!auth).*)', '/auth', '/media/:path*', '/user/:path*', '/watchparty/:path*']
// }
