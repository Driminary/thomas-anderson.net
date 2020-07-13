module.exports = function(eleventyConfig) {
 
//   // Copy any CSS and PNG images.
//   eleventyConfig.setTemplateFormats([
//     "png",
//     "css"
//   ]);

  // Copy `img/` to `_build/img`
  eleventyConfig.addPassthroughCopy("source/img")

  // Copy built css 'css/bundle.css' to '_build/css/bundle.css'
  eleventyConfig.addPassthroughCopy('source/css/bundle.css')

  // Return the config object.
  return {
    dir: {
      input: "source",
      output: "_build"
    }
  };
};