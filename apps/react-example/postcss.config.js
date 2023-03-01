const { join } = require("path");

const configPath = join(__dirname, "tailwind.config.js");

module.exports = {
    plugins: {
        "tailwindcss/nesting": {},
        tailwindcss: {
            config: configPath,
        },
        autoprefixer: {},
    },
};
