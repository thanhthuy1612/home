import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        colorPrimary: '#03346E',
        colorSelect: '#ffb703',
        colorHover: '#1B1A55',
        colorLight: '#999999',
        colorError: '#780000',
        bgColor: '#ffffff',
        borderHeader: '#0505050f',
      },
    },
  },
  plugins: [],
};
export default config;
