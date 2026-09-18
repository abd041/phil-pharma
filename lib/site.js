export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://philspharma.com").replace(
  /\/$/,
  ""
);
export const SITE_NAME = "Phil's Pharma";
export const SITE_DESCRIPTION =
  "Research peptides and lab essentials with straightforward product information, batch documentation on request, and discreet UK dispatch.";
export const DEFAULT_OG_IMAGE = "/images/hero-products.png";

export function absoluteUrl(path = "/") {
  if (!path) return SITE_URL;
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function pageMetadata({
  title,
  description = SITE_DESCRIPTION,
  path = "/",
  image = DEFAULT_OG_IMAGE,
  type = "website",
  noIndex = false,
}) {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  const fullTitle = title.includes("Phil's Pharma") ? title : `${title} — ${SITE_NAME}`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_GB",
      type,
      images: [
        {
          url: imageUrl,
          width: 1536,
          height: 1024,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl],
    },
  };
}
