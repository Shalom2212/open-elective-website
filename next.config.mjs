/** @type {import('next').NextConfig} */
const nextConfig = {
  headers: () => [
    {
      source: "/api/subjects",
      headers: [
        {
          key: "Cache-Control",
          value: "no-store, max-age=0",
        },
      ],
    },
  ],
};

export default nextConfig;
