/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
}/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      letterSpacing: {
        wider: '0.05rem',
      },
      wordSpacing: {
        wider: '0.2rem',
      },
      
    },
  },
  plugins: [],
}

