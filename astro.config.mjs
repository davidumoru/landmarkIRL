import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import postcssClamp from "postcss-clamp";
import postcssMediaMinMax from "postcss-media-minmax";
import postcssUtopia from "postcss-utopia";
import postcssLogicalViewportUnits from "@csstools/postcss-logical-viewport-units";

// https://astro.build/config
export default defineConfig({
  site: "https://landmarkirl.com",
  integrations: [react()],
  prefetch: true,
  vite: {
    css: {
      postcss: {
        plugins: [
          autoprefixer(),
          postcssUtopia({
            minWidth: 320,
            maxWidth: 1240,
          }),
          postcssMediaMinMax(),
          postcssLogicalViewportUnits(),
          postcssClamp(),
          cssnano(),
        ],
      },
    },
  },
  redirects: {
    "/share": "/posts",
    "/donate": "https://buymeacoffee.com/theumoru",
    "/webring": "https://webring.landmarkirl.com",
  },
});
