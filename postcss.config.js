module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    process.env.MINIMISE  === 'yes' ? require('cssnano')({preset: 'default',}) : false,
  ]
}