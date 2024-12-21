// _app.tsx

import { LanguageProvider } from "@/hooks/LanguageContext";
import "../styles/globals.css"; // Import global styles
import type { AppProps } from "next/app";
import Layout from "@/components/layout/layout";
import { APIResponse } from "@/lib/types";
import { fetchAllPages } from "@/api/api";

const defaultLanguages = [
  {
    LangageID: 1,
    Name: "Swedish",
    LangCode: "se",
    Flag: "https://onlineutbildning.seconsulting.se/assets/flags/4x3/sw.svg",
  },
];

export default function MyApp({ Component, pageProps }: AppProps) {
  console.log("pageProps", pageProps);
  const languages = pageProps.languages || defaultLanguages; // Use provided languages or default fallback

  return (
    <LanguageProvider>
      {/* Wrap the app with the LanguageProvider */}
      <Layout languages={languages}>
        {/* Include Layout for global elements */}
        <Component {...pageProps} />
      </Layout>
    </LanguageProvider>
  );
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const data: APIResponse = await fetchAllPages(); // Fetch all data
  const page = data.Pages.find(
    (p) => p.Name.toLowerCase() === params.slug.toLowerCase()
  );

  return {
    props: {
      page,
      modules: data.Modules,
      languages: data.Languages, // Pass languages here
    },
    revalidate: 60,
  };
}
