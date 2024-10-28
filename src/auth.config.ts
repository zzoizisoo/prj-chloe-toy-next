import type { NextAuthConfig } from "next-auth";

export const authConfig = {
	pages: {
		signIn: "/login",
	},
	callbacks: {
		authorized({ auth, request: { nextUrl } }) {
            console.log('[auth.config.ts/authConfig.callbacks.authorized]', auth, nextUrl)
			const isLoggedIn = !!auth?.user;
            return true;
            // TODO?: 여기다 access control 하는건가? middleware와의 차이는?
            // if(nextUrl.pathname.startsWith('/login')){ 
            //     console.log(auth.user)
            //     if(isLoggedIn) return Response.redirect(new URL('/', nextUrl));
            // }
            // return true;

            // if(isLoggedIn) return true;

			// const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
			// if (isOnDashboard) {
			// 	if (isLoggedIn) return true;
			// 	return false; // Redirect unauthenticated users to login page
			// } else if (isLoggedIn) {
			// 	return Response.redirect(new URL("/dashboard", nextUrl));
			// }
			// return true;
		},
	},
	providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
