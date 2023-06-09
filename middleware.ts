import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/users", // specify where to redirect when the user is not logged in
  },
});

export const config = {
  matcher: [
    // the page which should not be access when the user is not logged in
    "/profile/:path*",
    "/favorites/:path*",
    "/trips/:path*",
    "/chats/:path*",
    "/listings/:path*/edit",
    "/createHotel/:path*",
    "/host/:path*",
  ],
};
