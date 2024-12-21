import Head from "next/head";
import LanguageSwitcher from "./LanguageSwitcher";
import { Language } from "@/lib/types";

interface LayoutProps {
  children: React.ReactNode;
  languages: Language[];
}

export default function Layout({ children, languages }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{"My Headless CMS"}</title>
        <meta name="description" content="A Headless CMS built with Next.js" />
      </Head>
      <header>
        <h1>My Headless CMS</h1>
        <LanguageSwitcher languages={languages} />
      </header>
      <main>{children}</main>
      <footer>
        <p>&copy; 2024 My Headless CMS</p>
      </footer>
    </>
  );
}
