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
      },
    },
    fontFamily: {
      sans: ['Roboto', 'Helvetica', 'Ubuntu', 'Arial', 'sans-serif'],
    },
    fontSize: {
      sm: '12.8px',
      base: '16px',
      xl: '20px',
      '2xl': '25px',
      '3xl': '35px',
      '4xl': '39px',
      '5xl': '48px',
    },
  },
  plugins: [],
};
