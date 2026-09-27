'use strict';

/** URL slug for a title, e.g. "Banana Bread" -> "banana-bread". */
function slugify(text) {
  const from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  const to   = "aaaaeeeeiiiioooouuuunc------";
  let slug = String(text).toLowerCase();

  for (let i = 0, l = from.length; i < l; i++) {
    slug = slug.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  slug = slug.replace(/[^a-z0-9]+/g, '-'); // Replace non-alphanumeric with hyphen
  slug = slug.replace(/^-+|-+$/g, '');    // Remove leading/trailing hyphens
  return slug;
}

module.exports = { slugify };
