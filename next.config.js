/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["ar", "en"],
    defaultLocale: "ar",
  }, 
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
