import { Language } from "@/lib/types";
// import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { LanguageProvider } from "@/hooks/LanguageContext";
import { Header } from "@/components/layout/Header";
import "../output.css";
import "../styles/globals.css";
import { Suspense } from "react";
import { NavigationEvents } from "@/components/layout/navigation-event";
interface LayoutProps {
  children: React.ReactNode;
  languages: Language[];
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <html>
        <body>
          <LanguageProvider>
            <Header />
            {/* <LanguageSwitcher /> */}
            <main>
              {children}

              <Suspense fallback={null}>
                <NavigationEvents />
              </Suspense>
            </main>
          </LanguageProvider>
          <footer className="text-center">
            <p>&copy; 2024 My Headless CMS</p>
          </footer>
        </body>
      </html>
    </>
  );
}
