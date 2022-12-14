const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

const Hypher = require("hypher");
const english = require("hyphenation.en-gb");

const slugify = require("slugify");

const hypher = new Hypher(english);

const { JSDOM } = require("jsdom");

const util = require("util");

const pluginTOC = require("eleventy-plugin-toc");

module.exports = (config) => {
  config.addPlugin(pluginTOC, {
    tags: ["h2", "h3"],
    wrapper: "nav",
    wrapperClass: "toc",
    ul: false,
    flat: false,
  });

  const markdownItOptions = {
    html: true,
    typographer: true,
  };

  const markdownItAnchorOptions = {
    permalink: true,
    slugify: (s) =>
      slugify(s, {
        lower: true,
        strict: true,
      }),
    permalinkClass: "direct-link",
    permalinkSymbol: "2",
    permalinkAttrs: (slug, state) => ({
      "aria-label": "Permalink: " + slug,
    }),
    level: [1, 2, 3, 4],
  };

  config.setLibrary(
    "md",
    markdownIt(markdownItOptions).use(markdownItAnchor, markdownItAnchorOptions)
  );

  config.setDataDeepMerge(true);

  config.addCollection("adventures", (collection) => {
    const adventures = collection.getFilteredByTag("adventures");

    adventures.sort((a, b) => {
      return a.data.order - b.data.order;
    });

    return adventures;
  });

  config.addTransform("hyphenation", (content, outputPath) => {
    const dom = new JSDOM(content);
    const document = dom.window.document;
    const NodeFilter = dom.window.NodeFilter;

    const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);

    while (walk.nextNode()) {
      walk.currentNode.nodeValue = hypher.hyphenateText(
        walk.currentNode.nodeValue
      );
    }
    return dom.serialize();
  });

  config.addFilter("slug", (s) =>
    s !== undefined ? slugify(s, { lower: true, strict: true }) : "-"
  );

  config.addFilter("inspect", (s, d) =>
    util.inspect(s, { depth: d === undefined ? 2 : d })
  );

  config.addFilter("sortByOrder", (v) => {
    const nv = [...v];
    nv.sort((a, b) => {
      return a.data.order - b.data.order;
    });
    return nv;
  });

  config.addFilter("excludeBySelector", (content, selector) => {
    const dom = new JSDOM(content);
    const document = dom.window.document;
    const elements = document.querySelectorAll(selector);

    for (const element of elements) {
      element.remove();
    }
    return dom.serialize();
  });

  return {
    dir: {
      input: "src/view/",
      output: "_site",
      markdownTemplateEngine: "njk",
    },
  };
};
