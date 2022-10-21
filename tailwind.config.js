/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "320px",
      },
      backgroundImage: {
        "banner-01": "linear-gradient(rgba(0,0,0, 0.6), rgba(0,0,0, 0.6)), url(/public/assets/banners/01.jpg)",
      },
      colors: {
        primary: "#3688E5",
        secondary: "#212121",
        warning: '#F9CA29',
        error: "#F51B01",
        black: "#020D1B",
        white: '#DDDDDD',
      },
      height: {
        "2/3vh": "calc(100vh - 33.33333vh)",
      },
      fontFamily: {
        "helvetica": "Helvetica",
        "montserrat": "Montserrat"
      },
    },
  },
  plugins: [],
};
