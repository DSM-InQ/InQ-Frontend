/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    compiler: {
        styledComponents: true,
    },
    webpack: (config) => {
        config.cache = false;
        return config;
    },
};

module.exports = nextConfig;
