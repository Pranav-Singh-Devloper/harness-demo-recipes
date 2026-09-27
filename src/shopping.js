'use strict';

/**
 * Combine the ingredients of several recipes into one shopping list,
 * adding up the quantities of ingredients that appear more than once.
 */
function buildShoppingList(recipes) {
  // Conversion table: unit -> { toBase: factor, base: baseUnit }
  const unitConversion = {
    g: { toBase: 1, base: 'g' },
    kg: { toBase: 1000, base: 'g' },
    ml: { toBase: 1, base: 'ml' },
    l: { toBase: 1000, base: 'ml' }
  };

  const items = new Map();
  for (const recipe of recipes) {
    for (const ingredient of recipe.ingredients) {
      const info = unitConversion[ingredient.unit];
      let baseUnit;
      let factor;
      if (info) {
        baseUnit = info.base;
        factor = info.toBase;
      } else {
        baseUnit = ingredient.unit;
        factor = 1;
      }

      const key = ingredient.name.toLowerCase() + '|' + baseUnit;
      const qtyBase = ingredient.qty * factor;

      if (items.has(key)) {
        const existing = items.get(key);
        existing.qty += qtyBase;
      } else {
        items.set(key, { 
          name: ingredient.name, 
          qty: qtyBase, 
          unit: baseUnit 
        });
      }
    }
  }
  return [...items.values()].sort((a, b) => a.name.localeCompare(b.name));
}

module.exports = { buildShoppingList };
