const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

const Hypher = require('hypher')
const english = require('hyphenation.en-gb');

const hypher = new Hypher(english);

const { JSDOM } = require('jsdom');

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

  config.addCollection("adventures", (collection) => {
    return collection.getFilteredByTag('adventures').sort((a, b) => {
      return a.data.order - b.data.order;
    });
  });

  config.addTransform("hyphenation", (content, outputPath) => {

    console.log(outputPath);
    const dom = new JSDOM(content);
    const document = dom.window.document;
    const NodeFilter = dom.window.NodeFilter;

    const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); 

    while (walk.nextNode()) {
      walk.currentNode.nodeValue = hypher.hyphenateText(walk.currentNode.nodeValue);
    }
    return dom.serialize();
  });

  return {
    dir: {
      input: "src/view/",
      output: "_site",
      markdownTemplateEngine: "njk"
    }
  };
}

