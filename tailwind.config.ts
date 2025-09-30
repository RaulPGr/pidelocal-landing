import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#D4572A', // ← ajusta al naranja exacto de tu logo
          green:  '#2FA24D', // ← ajusta al verde exacto de tu logo
          dark:   '#3A3A3A',
          light:  '#F6F7F9',
        }
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #D4572A 0%, #2FA24D 100%)',
      }
    },
  },
  plugins: [],
}
export default config
