/** @type {import('next').NextConfig} */
const nextConfig = {
  headers: () => [
    {
      source: "/api/subjects",
      headers: [
        {
          key: "Cache-Control",
          value: "no-store, ",
        },
      ],
    },
  ],
};

export default nextConfig;
