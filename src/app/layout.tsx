import { Language } from "@/lib/types";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { LanguageProvider } from "@/hooks/LanguageContext";

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
            {/* <LanguageSwitcher /> */}
            <main>{children}</main>
          </LanguageProvider>
          <footer>
            <p>&copy; 2024 My Headless CMS</p>
          </footer>
        </body>
      </html>
    </>
  );
}
