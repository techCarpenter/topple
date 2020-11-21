module.exports = {
  publicPath:
    process.env.NODE_ENV === "production" ? "/debt-paydown-app/" : "/",
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "@/styles/index.scss";'
      }
    }
  }
};
