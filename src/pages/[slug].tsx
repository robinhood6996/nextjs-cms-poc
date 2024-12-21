import BlockRenderer from "@/components/blocks/BlockRenderer";
import Layout from "@/components/layout/layout";
import { useLanguage } from "@/hooks/LanguageContext";
import { fetchAllPages, fetchPageData } from "@/api/api";
import { Language, Module, Page } from "@/lib/types";
import { GetStaticPaths, GetStaticProps } from "next";

export default function DynamicPage({
  page,
  modules,
  languages,
}: {
  page: Page;
  modules: Module[];
  languages: Language[];
}) {
  const { currentLanguage } = useLanguage();

  // Fallback check for undefined `page` or `Title`
  if (!page || !page.Title) {
    return (
      <Layout languages={languages}>
        <h1>Page Not Found</h1>
      </Layout>
    );
  }

  return (
    <Layout languages={languages}>
      <h1>
        {page.Title.find((t) => t.LangageID === currentLanguage?.LangageID)
          ?.Title || page.Name}
      </h1>
      <BlockRenderer blocks={page.Blocks} modules={modules} />
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await fetchAllPages();

  if (!data?.Pages) {
    return {
      paths: [],
      fallback: "blocking", // Use blocking fallback to wait for data
    };
  }

  const paths = data.Pages.map((page: Page) => ({
    params: { slug: page.Name }, // Match `slug` key
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug as string;

  const data = await fetchPageData(slug);

  if (!data || !data.Pages || data.Pages.length === 0) {
    return {
      notFound: true, // Return 404 if page not found
    };
  }

  const page: Page =
    data.Pages.find((p: Page) => p.Name.toLowerCase() === slug.toLowerCase()) ||
    null;

  if (!page) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      page,
      modules: data.Modules || [],
      languages: data.Languages || [],
    },
    revalidate: 10, // ISR support
  };
};
