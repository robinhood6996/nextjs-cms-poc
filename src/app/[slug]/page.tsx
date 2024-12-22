// import { fetchAllPages, fetchPageDataByLang } from "@/api/api";
// import BlockRenderer from "@/components/blocks/BlockRenderer";
// // import BlockRenderer from "@/components/blocks/BlockRenderer";
// import { APIResponse, Module, Page as PageType } from "@/lib/types";
// import Head from "next/head";
// import Link from "next/link";
// import { notFound } from "next/navigation";
// import React from "react";

// interface PageProps {
//   params: {
//     slug: string;
//   };
//   searchParams: {
//     lang: string;
//   };
// }

// const Page = async (props: PageProps) => {
//   const params = await props.params;
//   const query = await props.searchParams;
//   console.log("props", props);
//   const { slug } = params;
//   const getModule = async () => {
//     const response = await fetchAllPages();
//     // console.log("response", response.data);
//     const page = response.data.Modules;
//     return page;
//   };
//   const getPage = async () => {
//     if (query && query.lang) {
//       const response = await fetchPageDataByLang(slug, query.lang);
//       console.log("response", response);
//       const page = response.data;
//       return page;
//     } else {
//       const response = await fetchAllPages();
//       // console.log("response", response.data);
//       const page = response.data;
//       return page;
//     }
//   };
//   const page: APIResponse | PageType = await getPage();
//   const _modules: Module[] = await getModule();
//   console.log("_modules", query.lang);
//   const pageContent = !query.lang
//     ? (page as APIResponse).Pages.find(
//         (p: PageType) => p.Name.toLowerCase() === slug.toLowerCase()
//       )
//     : page;
//   if (!pageContent) return notFound();

//   return (
//     <>
//       <Head>
//         <title>{(pageContent as PageType).Name}</title>
//       </Head>
//       <Link href={"/"}>Home</Link>
//       <br />
//       <Link href="/news?lang=se">News SE</Link>
//       <br />
//       <Link href="/news?lang=gb">News EN</Link>
//       <h1>{(pageContent as PageType).Name}</h1>
//       {query.lang ? (
//         <BlockRenderer
//           blocks={(pageContent as PageType)?.Blocks}
//           modules={_modules}
//           languageId={query.lang === "gb" ? 2 : 1}
//         />
//       ) : (
//         <BlockRenderer
//           blocks={(pageContent as PageType)?.Blocks}
//           modules={_modules}
//           languageId={1}
//         />
//       )}
//     </>
//   );
// };

// export default Page;

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
      <Link href="/">Home</Link>
      <br />
      <Link href={`/${slug}?lang=se`}>News SE</Link>
      <br />
      <Link href={`/${slug}?lang=gb`}>News EN</Link>
      <h1>{(pageContent as PageType).Name}</h1>
      <BlockRenderer
        blocks={(pageContent as PageType).Blocks}
        modules={_modules}
        languageId={lang === "gb" ? 2 : 1}
      />
    </>
  );
};

export default Page;
