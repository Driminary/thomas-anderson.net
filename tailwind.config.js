module.exports = {
  purge: {
    // This will only purge if _PURGE === true
    enabled: process.env.PURGE === 'yes' ? true : false ,
    content: ['./source/**/*.html','./source/**/*.liquid'],
  },
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
}
