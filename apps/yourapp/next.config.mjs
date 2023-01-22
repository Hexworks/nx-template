import { env } from "./env/server.mjs";

// eslint-disable-next-line @typescript-eslint/no-var-requires
import { withNx } from "@nrwl/next/plugins/with-nx.js";

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
    nx: {
        // Set this to true if you would like to to use SVGR
        // See: https://github.com/gregberge/svgr
        svgr: false,
    },
    reactStrictMode: true,
    swcMinify: true,
    // Next.js i18n docs: https://nextjs.org/docs/advanced-features/i18n-routing
    i18n: {
        locales: ["en"],
        defaultLocale: "en",
    },
    rewrites: async () => {
        return [
            {
                source: "/api/:rest*",
                destination: "/api/:rest*",
            },
            {
                source: "/:any*",
                destination: "/",
            },
        ];
    },
};

export default withNx(nextConfig);
