/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",  // Make sure this line includes your file paths
  ],
  theme: {
    extend: {
      colors: {
          primary: "#FFFFFF",
          secondary: "#D9EDAC",
          third: "#B3B3B3",
          forth: "#000000",
          green: "#C9FE54",
          sidebar: "#242424",
          hover: "#8BC804",
          iconUser: "#96B84B",
          createBTN: "#383838",
          use: "#C9FE59",
          dropZone: "#C4C4C4",
          success: "#4caf50",
          error: "#f44336",
          password:"#1E1E1E",
          green1: "#D9EDAC", //secondary
          green2: "#C9FE59", //use
          green3: "#C9FE54", //green
          green4: "#96B84B",//iconUser
          green5: "#8BC804",//hover
          green6: "#4caf50",//success
          red:"#f44336",//error
          gray1: "#C4C4C4",//dropZone
          gray2: "#B3B3B3",//third
          gray3: "#383838",//createBTN
          gray4: "#242424",//sidebar
          gray5: "#1E1E1E",//loginInput
      },
      screens: {
        'tablet': '640px',
        // => @media (min-width: 640px) { ... }
  
        'laptop': '1024px',
        // => @media (min-width: 1024px) { ... }
  
        'desktop': '1280px',
        // => @media (min-width: 1280px) { ... }
      },
      container: {
        center: true,
        padding: {
            DEFAULT: "1rem",
            sm: "2rem",
        },
    },
  },
  plugins: [],
}
}
