'use strict';

/**
 * Combine the ingredients of several recipes into one shopping list,
 * adding up the quantities of ingredients that appear more than once.
 * Converts compatible units (g<->kg, ml<->l) to a common base unit before adding.
 */
function buildShoppingList(recipes) {
  const items = new Map();
  for (const recipe of recipes) {
    for (const ingredient of recipe.ingredients) {
      // Convert to base units for compatible units
      let qty = ingredient.qty;
      let unit = ingredient.unit;
      if (unit === 'kg') {
        qty *= 1000;
        unit = 'g';
      } else if (unit === 'l') {
        qty *= 1000;
        unit = 'ml';
      }
      // Use ingredient name and unit as key (unit is now normalized for compatible units)
      const key = `${ingredient.name.toLowerCase()}-${unit}`;
      if (items.has(key)) {
        items.get(key).qty += qty;
      } else {
        items.set(key, { name: ingredient.name, qty: qty, unit: unit });
      }
    }
  }
  return [...items.values()].sort((a, b) => a.name.localeCompare(b.name));
}

module.exports = { buildShoppingList };
