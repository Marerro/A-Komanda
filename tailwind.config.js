/** @type {import('tailwindcss').Config} */
import forms from "@tailwindcss/forms";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        "red": "#FC4747",
        "dark-blue": "#10141E",
        "greyish-blue": "#5A698F",
        "semi-dark-blue": "#161D2F",
        
      },
      screens: {
        "mobile": "375px",
        "tablet": "768px",
        "desktop": "1440px"
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif']
      },
      fontSize: {
        hl: "2rem",
        hm: "1.5rem",
        hs: "1.125rem",
        bm: "0.938rem",
        bs: "0.8125rem",
        mm: "0.875rem", //mobile title
        ms: "0.6875rem", //mobile body
      },
      fontWeight: {
        ligth: "200",
        medium: "400",
      },
    },
  },
  plugins: [forms],
};
