import { createMDX } from "fumadocs-mdx/next";

/** @type {import('next').NextConfig} */
const config = {
  transpilePackages: ["@assistant-ui/*"],
  rewrites: async () => ({
    beforeFiles: [
      {
        source: "/umami/:path*",
        destination: "https://assistant-ui-umami.vercel.app/:path*",
      },
    ],
    fallback: [
      {
        source: "/registry/:path*",
        destination: "https://ui.shadcn.com/registry/:path*",
      },
    ],
  }),
  env: {
    NEXT_PUBLIC_ASTERAI_APP_ID: process.env.NEXT_PUBLIC_ASTERAI_APP_ID,
    NEXT_PUBLIC_ASTERAI_PUBLIC_QUERY_KEY: process.env.NEXT_PUBLIC_ASTERAI_PUBLIC_QUERY_KEY,
  }
};

const withMDX = createMDX();

export default withMDX(config);
