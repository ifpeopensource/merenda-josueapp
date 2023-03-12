/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          800: '#2F9E41',
          900: '#3C8748',
        },
        red: {
          500: '#E45E5E',
        },
      },
    },
    fontFamily: {
      sans: ['Roboto', 'Helvetica', 'Ubuntu', 'Arial', 'sans-serif'],
    },
  },
  plugins: [],
};
