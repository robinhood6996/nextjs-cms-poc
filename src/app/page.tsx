import { fetchAllPages } from "@/api/api";
import { Page } from "@/lib/types";
import Link from "next/link";

export default async function Home() {
    const getPage = async () => {
      const response = await fetchAllPages();
      const page = response.data.Pages.map(
        (p: Page) => p
      );
      return page;
    };
    const Pages = await getPage();
  return (
    <>
    Home Page
    <div>
      {
        Pages.map((page: Page) => {
          return <Link key={page.ID} href={`/${page.Name}`}>{page.Name}</Link>
        })
      }
    </div>
    </>
  );
}
