'use strict';

/** URL slug for a title, e.g. "Banana Bread" -> "banana-bread". */
function slugify(text) {
  if (typeof text !== 'string') text = String(text);
  return text
    .toLowerCase()
    .normalize('NFD') // decompose accented characters
    .replace(/[\u0300-\u036f]/g, '') // remove combining diacritical marks
    .replace(/[^a-z0-9]+/g, '-') // replace non-alphanumeric with hyphen
    .replace(/^-+|-+$/g, ''); // remove leading and trailing hyphens
}

module.exports = { slugify };
