function toOrder(v, d) {
  if (v === undefined) {
    return 99;
  }

  if (Number.isInteger(v)) {
    return v;
  }

  if (typeof v === "string") {
    return v.toLowerCase().charCodeAt(0) - 97 + 1;
  }
}

module.exports = {
  eleventyComputed: {
    order: ({ type, index }) => {
      switch (type) {
        case "Introduction":
          return 000 + toOrder(index);
        case "Chapter":
          return 100 + toOrder(index);
        case "Appendix":
          return 200 + toOrder(index);
        default:
          return 300 + toOrder(index);
      }
    },
  },
};
