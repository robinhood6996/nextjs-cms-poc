import { fetchAllPages, fetchPageDataByLang } from "@/api/api";
import BlockRenderer from "@/components/blocks/BlockRenderer";
// import BlockRenderer from "@/components/blocks/BlockRenderer";
import { APIResponse, Page as PageType } from "@/lib/types";
import Head from "next/head";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

interface PageProps {
  params: {
    slug: string;
  };
  searchParams: {
    lang: string;
  };
}

const Page = async (props: PageProps) => {
  const params = await props.params;
  const query = await props.searchParams;
  console.log("props", props);
  const { slug } = params;

  const getPage = async () => {
    if (query && query.lang) {
      const response = await fetchPageDataByLang(slug, query.lang);
      console.log("response", response);
      const page = response.data;
      return page;
    } else {
      const response = await fetchAllPages();
      // console.log("response", response.data);
      const page = response.data;
      return page;
    }
  };
  const page: APIResponse | PageType = await getPage();
  console.log("page", page);
  const pageContent = !query.lang
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
      <Link href={"/"}>Home</Link>
      <br />
      <Link href="/news?lang=se">News SE</Link>
      <br />
      <Link href="/news?lang=gb">News EN</Link>
      <h1>{(pageContent as PageType).Name}</h1>
      {/* <BlockRenderer blocks={pageContent.Blocks} modules={page.Modules} /> */}
    </>
  );
};

export default Page;
