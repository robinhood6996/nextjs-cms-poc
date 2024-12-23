import { fetchAllPages, fetchPageDataByLang } from "@/api/api";
import BlockRenderer from "@/components/blocks/BlockRenderer";
import { APIResponse, Module, Page as PageType } from "@/lib/types";
import Head from "next/head";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

interface PageProps {
  params: {
    slug: string;
  };
  searchParams: {
    lang?: string; // Mark lang as optional if it may not always be provided
  };
}

const Page = async ({ params, searchParams }: PageProps) => {
  const { slug } = params;
  const { lang } = searchParams;

  const getModules = async (): Promise<Module[]> => {
    const response = await fetchAllPages();
    return response.data.Modules;
  };

  const getPage = async (): Promise<APIResponse | PageType> => {
    if (lang) {
      const response = await fetchPageDataByLang(slug, lang);
      return response.data;
    } else {
      const response = await fetchAllPages();
      return response.data;
    }
  };

  const page: APIResponse | PageType = await getPage();
  const _modules: Module[] = await getModules();

  const pageContent = !lang
    ? (page as APIResponse).Pages.find(
        (p: PageType) => p.Name.toLowerCase() === slug.toLowerCase()
      )
    : page;

  if (!pageContent) return notFound();

  return (
    <>
      <Head>
        <title>{(pageContent as PageType).Name}</title>
      </Head>
     <div className="mt-5 text-center">
     <h1 className="text-center text-2xl">{(pageContent as PageType).Name}</h1>
      <BlockRenderer
        blocks={(pageContent as PageType).Blocks}
        modules={_modules}
        languageId={lang === "gb" ? 2 : 1}
      />
     </div>
    </>
  );
};

export default Page;
