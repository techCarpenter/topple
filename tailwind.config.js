const colors = require("tailwindcss/colors");

module.exports = {
  purge: { content: ["./public/**/*.html", "./src/**/*.vue"] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        green: colors.green,
        gray: colors.trueGray
      }
    }
  },
  variants: {
    extend: {
      backgroundColor: ["active"],
      textColor: ["active"],
      borderColor: ["active"]
    }
  },
  plugins: []
};
