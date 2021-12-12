module.exports = {
  content: [
    './source/**/*.html',
    './source/**/*.liquid'
  ],
  theme: {
    extend: {
        colors: {
        'deep-gray-100': '#21374b',
        'deep-gray-200': '#162533'
      }
    },
  },
  variants: {
      borderWidth: ['responsive', 'hover']
  },
  plugins: [],
}
