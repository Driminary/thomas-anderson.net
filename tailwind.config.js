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
      }
    },
  },
  variants: {
      borderWidth: ['responsive', 'hover']
  },
  plugins: [],
}
