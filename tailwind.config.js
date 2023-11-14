/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    
    extend: {
      colors: {
      background: "#fafafa",
        actionBlue: '#4A4E69',
      border: '#e4e4e4',
      },
      fontFamily: {
        Cookie: ['Cookie'],
        Oswald: ['Oswald'],
        Poppins: ['Poppins'],
      }
},
  },
  plugins: [],
}