/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // 👇 Tambahkan baris ini untuk menentukan root project
  outputFileTracingRoot: __dirname,
};

module.exports = nextConfig;
