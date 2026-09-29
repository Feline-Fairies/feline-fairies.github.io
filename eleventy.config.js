export default function (eleventyConfig) {

  eleventyConfig.addGlobalData("currentYear", () => {
    return new Date().getFullYear();
  });

  eleventyConfig.addPassthroughCopy({
    "src/assets": "assets"
  });

  eleventyConfig.addPassthroughCopy({
    "src/media": "media"
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },

    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
}