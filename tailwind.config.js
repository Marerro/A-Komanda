/** @type {import('tailwindcss').Config} */
import forms from "@tailwindcss/forms";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#10141E',
        'red': '#FC4747',
        'greyish-blue': '#5A698F',
        'semi-dark-blue': '#161D2F',
      }
    },
  },
  plugins: [forms],
};
