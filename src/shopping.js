'use strict';

/**
 * Combine the ingredients of several recipes into one shopping list,
 * adding up the quantities of ingredients that appear more than once.
 */
function buildShoppingList(recipes) {
  const items = new Map();

  // Helper function to normalize an ingredient to base units
  function normalize(ingredient) {
    const { qty, unit } = ingredient;
    if (!unit) {
      return { qty, unit: '' };
    }
    switch (unit.toLowerCase()) {
      case 'kg': return { qty: qty * 1000, unit: 'g' };
      case 'g':  return { qty: qty, unit: 'g' };
      case 'l':  return { qty: qty * 1000, unit: 'ml' };
      case 'ml': return { qty: qty, unit: 'ml' };
      default:   return { qty: qty, unit: unit }; // keep original unit and quantity
    }
  }

  for (const recipe of recipes) {
    for (const ingredient of recipe.ingredients) {
      const normalized = normalize(ingredient);
      const key = ingredient.name.toLowerCase() + '::' + normalized.unit;
      if (items.has(key)) {
        items.get(key).qty += normalized.qty;
      } else {
        items.set(key, { 
          name: ingredient.name, 
          qty: normalized.qty, 
          unit: normalized.unit 
        });
      }
    }
  }

  return [...items.values()].sort((a, b) => a.name.localeCompare(b.name));
}

module.exports = { buildShoppingList };
