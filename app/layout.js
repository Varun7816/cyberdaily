import "./globals.css";
import Header from "../components/Header";
import ComingSoonProvider from "../components/ComingSoonProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ComingSoonProvider>
          <Header />
          {children}
        </ComingSoonProvider>
      </body>
    </html>
  );
}
