/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        styledComponents: true,
    },
    webpack5: true,
    webpack: (config) => {
        config.cache = false;
        return config;
    },
};

module.exports = nextConfig;
