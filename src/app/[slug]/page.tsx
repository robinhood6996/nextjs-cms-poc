import { fetchAllPages } from "@/api/api";
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
}

const Page = async (props: PageProps) => {
  const params = await props.params;
  const { slug } = params;

  const getPage = async () => {
    const response = await fetchAllPages();
    // console.log("response", response.data);
    const page = response.data;
    return page;
  };
  const page:APIResponse= await getPage();
  const pageContent = page.Pages.find(
    (p: PageType) => p.Name.toLowerCase() === slug.toLowerCase()
  );;
if(!pageContent) return notFound()
    console.log("page", page);
  return (
    <>
    <Head>
        <title>{pageContent.Name}</title>
    </Head>
    <Link href={'/'}>Home</Link>
      <h1>{pageContent.Name}</h1>
      <BlockRenderer blocks={pageContent.Blocks} modules={page.Modules} />
    </>
  );
};

export default Page;
