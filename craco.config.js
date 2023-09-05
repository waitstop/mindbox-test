const path = require("path");
module.exports = {
    webpack: {
        alias: {
            '@': path.resolve(__dirname, "src/"),
        }
    },
    jest: {
        babel: {
            addPresets: true /* (default value) */,
            addPlugins: true /* (default value) */,
        }
    },
}