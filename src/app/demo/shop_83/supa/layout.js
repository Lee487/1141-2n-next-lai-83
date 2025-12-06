import { Geist, Geist_Mono } from "next/font/google";
//import "./globals.css";               
import NavbarShopNode_xx from "@/components/midterm/NavbarShopNode_xx"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NavbarShopNode_xx /> 
        {children}
        {/* ... */}
      </body>
    </html>
  );
}