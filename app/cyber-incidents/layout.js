import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";

export const metadata = {
  title: "Cyber Incidents & Breaches | CyberIntel",
};

export default function CyberIncidentsLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}