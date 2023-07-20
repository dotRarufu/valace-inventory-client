/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      khula: ['"Khula"'],
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#00104A',
          secondary: '#ffffff',
          accent: '#4A000D',
          neutral: '#334349',
          'base-100': '#CACDD6',
          info: '#3abff8',
          success: '#019328',
          warning: '#56410B',
          error: '#E10909',
          admin: '#4A000D',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
};
