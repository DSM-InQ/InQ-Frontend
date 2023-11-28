/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        styledComponents: true,
    },
    webpack: (config) => {
        config.cache = false;
        return config;
    },
};

module.exports = nextConfig;
