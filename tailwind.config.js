module.exports = {
  purge: {
    // This will only purge if PURGE is set to 'yes'
    enabled: process.env.PURGE === 'yes' ? true : false ,
    content: ['./source/**/*.html','./source/**/*.liquid'],
  },
  theme: {
    extend: {
        colors: {
        'anderson-blue': '#07689F',
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
