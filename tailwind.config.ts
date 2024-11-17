import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#23395D',
        'secondary': '#75D8D1',
        'accent': '#E8791D',
        'highlight': '#F9C74F',
        'background': '#CBBEA4',
      },
    },
  },
  plugins: [],
};
export default config;
