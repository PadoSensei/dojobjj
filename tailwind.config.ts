import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dojoRed: '#b91c1c',
        dojoBlack: '#0f172a',
        dojoGold: '#fbbf24',
        dojoWhite: '#f8fafc',
        correctGreen: '#4CAF50',
        incorrectRed: '#FF0000',
      },
      fontFamily: {
        dojo: ['"Karate", sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
