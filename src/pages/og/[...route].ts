import { OGImageRoute } from "astro-og-canvas";
import { getCollection } from "astro:content";

const blogEntries = await getCollection("posts");

const staticPages = {
  index: {
    title: "Landmark\nin Real Life",
  },
  tags: {
    title: "Tags",
  },
};

const collectionPages = [
  ...blogEntries.map((entry) => ({
    id: `blog/${entry.id}`,
    data: entry.data,
  })),
];

const uniqueTags = [
  ...new Set(blogEntries.flatMap((post) => post.data.tags || [])),
];

const tagPages = uniqueTags.map((tag) => ({
  id: `tags/${tag}`,
  data: {
    title: `Tagged: ${tag}`,
  },
}));

const pages = {
  ...Object.fromEntries(collectionPages.map(({ id, data }) => [id, data])),
  ...Object.fromEntries(tagPages.map(({ id, data }) => [id, data])),
  ...staticPages,
};

export const { getStaticPaths, GET } = OGImageRoute({
  param: "route",
  pages,
  getImageOptions: (route, page) => ({
    title: page.title,
    bgImage: {
      path: "./public/images/og.png",
      fit: "cover",
    },
    font: {
      title: {
        color: [0, 0, 0],
        size: 72,
        weight: "Bold",
        families: ["Alte Haas Grotesk"],
        lineHeight: 1.1,
      },
    },
    fonts: [
      "./public/fonts/AlteHaasGroteskBold.woff2",
    ],
    border: { color: [255, 255, 255], width: 0 },
    padding: 120,
  }),
});
