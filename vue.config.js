const path = require("path");
module.exports = {
  publicPath:
    process.env.NODE_ENV === "production" ? "/debt-paydown-app/" : "/",
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "@/styles/index.scss";'
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src")
      }
    }
  }
};
