/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['pub-b70cb36a6853407fa468c5d6dec16633.r2.dev'],
  },
  transpilePackages: ['three'],
}

module.exports = nextConfig
