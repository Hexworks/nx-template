const { createGlobPatternsForDependencies } = require("@nrwl/react/tailwind");
const { join } = require("path");

const depPatterns = createGlobPatternsForDependencies(__dirname);

/** @type {import('tailwindcss').Config} */
module.exports = {
    presets: [require("../../tailwind-workspace-preset.js")],
    content: [
        join(
            __dirname,
            "{frontend,pages}/**/*!(*.stories|*.spec).{ts,tsx,html}"
        ),
        ...depPatterns,
    ],
    plugins: [require("@tailwindcss/typography"), require("daisyui")],
    theme: {
        container: {
            center: true,
        },
    },
    daisyui: {
        styled: true,
        themes: true,
        base: true,
        utils: true,
        logs: true,
        rtl: false,
        prefix: "",
        darkTheme: "dark",
    },
};
