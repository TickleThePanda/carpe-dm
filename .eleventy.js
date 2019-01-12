const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

module.exports = config => {

  const markdownItOptions = {
    html: true,
    typographer: true
  };

  const markdownItAnchorOptions = {
    permalink: true,
    slugify: function(s) {
      return encodeURIComponent(String(s).replace(/New\ in\ v\d+\.\d+\.\d+/, '').trim().toLowerCase().replace(/\s+/g, '-'));
    },
    permalinkClass: "direct-link",
    permalinkSymbol: "⁜",
    level: [1,2,3,4]
  };

  config.setLibrary(
    "md",
    markdownIt(markdownItOptions)
      .use(markdownItAnchor, markdownItAnchorOptions)
  );

  config.setDataDeepMerge(true);

  return {
    dir: {
      input: "src",
      output: "_site",
      markdownTemplateEngine: "njk"
    }
  };
}

