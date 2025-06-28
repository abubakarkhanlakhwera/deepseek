import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { AppContext, AppContextProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  variable: "--font-inder",
  subsets: ["latin"],
});



export const metadata = {
  title: "DeepSeek",
  description: "Full Stack Project",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <AppContextProvider>
    <html lang="en">
      <body
        className={`${inter.className}  antialiased`}
      ><Toaster toastOptions={
        {
          success: {style:{background:"black",color:"white"}},
          error: {style:{background:"black",color:"white"}},
        }
      } />
        {children}
      </body>
    </html>
    </AppContextProvider>
    </ClerkProvider>
  );
}
