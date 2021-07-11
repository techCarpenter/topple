const presets = ["@vue/cli-plugin-babel/preset"];
const plugins = [];

if (process.env["ENV"] === "prod") {
  plugins.push("transform-remove-console");
}

module.exports = {
  presets,
  plugins
};
