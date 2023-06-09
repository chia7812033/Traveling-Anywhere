import Navbar from "./components/navbar/Navbar";
import "./globals.css";
import AuthProvider from "./providers/AuthProvider";
import ToastProvider from "./providers/ToastProvider";
import getCurrentUser from "./utils/getCurrentUser";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Nunito } from "next/font/google";

export const metadata = {
  title: "Travel Anywhere",
  description: "This is my website",
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang='en'>
      <body className={font.className}>
        <AuthProvider>
          <ToastProvider />
          <Navbar currentUser={currentUser} />
          <div className='pt-28 h-screen'>{children}</div>
        </AuthProvider>
      </body>
    </html>
  );
}
