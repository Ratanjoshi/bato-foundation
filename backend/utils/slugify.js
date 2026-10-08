const slugify = require("slugify");

const slugGenerator = (name) => {
  // Normalize Unicode to ensure consistent encoding
  // Normalize Unicode to ensure consistent encoding
  const normalized = name.normalize("NFKC");

  // Replace spaces with dashes and remove unwanted characters
  const slug = normalized
    .replace(/[\s]+/g, "-")
    .replace(/[^\w\u4E00-\u9FAF\u3040-\u309F\u30A0-\u30FF-]/g, "")
    .toLowerCase();

  return slug;
};

module.exports = slugGenerator;
