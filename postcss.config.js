module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    process.env.MINIMISE  === 'yes' ? require('cssnano')({preset: 'default',}) : false, // This will only use cssnano (to minify css) if MINIMISE is set to 'yes'
  ]
}