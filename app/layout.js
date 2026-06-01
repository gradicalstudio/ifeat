import { Montserrat, Raleway } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/LenisScroll";

const monsterrat = Montserrat({
  variable: "--font-monsterrat-sans",
  subsets: ["latin"],
});
const raleway = Raleway({
  variable: "--font-raleway-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "ifeat",
  description: "ifeat",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${monsterrat.variable} ${raleway.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll>
          <Header />  
          <main className="bg-[#FEFFF4]">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
