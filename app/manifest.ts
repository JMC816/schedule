import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "더 스케줄러",
    short_name: "더 스케줄러",
    description: "오늘 할 일과 일정을 달력에 기록할 수 있는 서비스",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#000000",
    lang: "ko-KR",
    icons: [
      {
        src: "/icons/192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
