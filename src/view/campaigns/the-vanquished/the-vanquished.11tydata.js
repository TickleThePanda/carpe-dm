function coalesce(v, d) {
  return v !== undefined ? v : d;
}

module.exports = {
  eleventyComputed: {
    order: ({ type, index }) => {
      switch (type) {
        case "Introduction":
          return 000 + coalesce(index, 0);
        case "Chapter":
          return 100 + coalesce(index, 0);
        case "Appendix":
          return 200 + coalesce(index, 0);
        default:
          return 300 + coalesce(index, 0);
      }
    },
  },
};
