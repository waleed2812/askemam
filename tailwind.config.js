/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "320px",
      },
      backgroundImage: {
        "banner": "linear-gradient(rgba(0,0,0, 0.6), rgba(0,0,0, 0.6)), url(https://yt3.ggpht.com/8VhxphtWMrD3_J8abpez8t4dQGOUU_mz19VyXt2Q3y_gLeGcjkePFxSjWWKg-y48zHMbGsDhowI=w2120-fcrop64=1,00000000ffffffff-k-c0xffffffff-no-nd-rj)",
      },
      borderWidth: {
        "1": "1px"
      },
      colors: {
        primary: "#3688E5",
        secondary: "#212121",
        warning: '#F9CA29',
        error: "#F51B01",
        black: "#020D1B",
        white: '#DDDDDD',
        red: "#FF0000",
        hover: "rgba(0,0,0,0.3)"
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
