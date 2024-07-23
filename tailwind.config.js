/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
          // 'custom-gradient': 'linear-gradient(to bottom, #ba5370, #f4e2d8)',
      },
      colors:{
        'bg-gradient-from': '#4b6469',
        'bg-gradient-to': '#708871',
        'custom-pink': '#1a3636',
      }
    },
  },
  plugins: [],
};
