import SiteShell from "@/components/SiteShell";
import SearchClient from "@/components/SearchClient";
import { pageMetadata } from "@/lib/site";

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const query = String(params?.q || "").trim();
  return pageMetadata({
    title: query ? `Search: ${query}` : "Search",
    description: query
      ? `Search results for ${query} in the Phil's Pharma research catalogue.`
      : "Search research peptides, medications, oils, and accessories.",
    path: query ? `/search?q=${encodeURIComponent(query)}` : "/search",
  });
}

export default async function SearchPage({ searchParams }) {
  const params = await searchParams;
  const query = String(params?.q || "");

  return (
    <SiteShell>
      <SearchClient initialQuery={query} />
    </SiteShell>
  );
}
