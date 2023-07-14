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
          accent: '#1fb2a6',
          neutral: '#334349',
          'base-100': '#CACDD6',
          info: '#3abff8',
          success: '#019328',
          warning: '#56410B',
          error: '#E10909',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
};
