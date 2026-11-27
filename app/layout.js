import { preconnect } from "react-dom";
import { Montserrat, Raleway } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/LenisScroll";
import { siteUrl } from "@/utils/siteUrl";

const monsterrat = Montserrat({
  variable: "--font-monsterrat-sans",
  subsets: ["latin"],
});
const raleway = Raleway({
  variable: "--font-raleway-sans",
  subsets: ["latin"],
});

// Browser bar on phones matches the page background
export const viewport = { themeColor: "#FEFFF4" };

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Ifeat",
  description: "Ifeat",
};

export default function RootLayout({ children }) {
  // The hero image comes from Prismic's image server; open the connection early
  preconnect("https://images.prismic.io");
  return (
    <html
      lang="en"
      className={`${monsterrat.variable} ${raleway.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FEFFF4]">
        <SmoothScroll>
          <Header />  
          <main className="">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
