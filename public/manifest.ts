import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Pushzada",
    short_name: "Toma aí!",
    start_url: "/",
    lang: "pt-BR",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      {
        src: "icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
