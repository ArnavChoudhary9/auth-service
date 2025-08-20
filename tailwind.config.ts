import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,html}",
    "./public/index.html"
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
}

// For CommonJS compatibility, you can add:
module.exports = config;

export default config;
