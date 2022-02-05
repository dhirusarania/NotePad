module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        'ocean-green': {
          DEFAULT: '#41B883',
          50: '#C6EBDA',
          100: '#B7E5D1',
          200: '#99DBBD',
          300: '#7AD0AA',
          400: '#5CC697',
          500: '#41B883',
          600: '#328F65',
          700: '#246548',
          800: '#153C2A',
          900: '#06120D',
        },
      },
    },
  },
  plugins: [],
}
