
module.exports = config => {

  config.setDataDeepMerge(true);

  return {
    dir: {
      input: "src",
      output: "_site",
      markdownTemplateEngine: "njk"
    }
  };
}

