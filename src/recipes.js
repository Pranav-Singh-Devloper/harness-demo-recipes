'use strict';

const recipes = require('../data/recipes.json');

function getAll() {
  return recipes.slice();
}

function findBySlug(slug) {
  return recipes.find((recipe) => recipe.slug === slug);
}

function totalTime(recipe) {
  return recipe.prep + recipe.cook;
}

/** Recipes where every word of the query appears in the title or tags (case-insensitive). */
function search(query) {
  const trimmed = query.trim();
  if (trimmed === '') {
    return [];
  }
  const queryWords = trimmed.toLowerCase().split(/\s+/);
  return recipes.filter(recipe => {
    const titleLower = recipe.title.toLowerCase();
    const tagsLower = recipe.tags.map(tag => tag.toLowerCase());
    return queryWords.every(word => {
      return titleLower.includes(word) || tagsLower.some(tag => tag.includes(word));
    });
  });
}

/** Sort by "title" (default) or "time" (total time). Returns a new array. */
function sortRecipes(list, key = 'title') {
  const value = (recipe) => (key === 'time' ? totalTime(recipe) : recipe.title);
  return list.slice().sort((a, b) => {
    if (key === 'time') {
      return value(a) - value(b);
    }
    return String(value(a)).localeCompare(String(value(b)));
  });
}

module.exports = { getAll, findBySlug, totalTime, search, sortRecipes };
