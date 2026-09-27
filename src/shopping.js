'use strict';

/**
 * Combine the ingredients of several recipes into one shopping list,
 * adding up the quantities of ingredients that appear more than once.
 * Converts compatible units (g<->kg, ml<->l) before adding.
 */
function buildShoppingList(recipes) {
  // Conversion factors to base units (g for mass, ml for volume)
  const toBase = {
    g: 1,
    kg: 1000,
    ml: 1,
    l: 1000
  };
  // Map of base unit to display unit (we choose to display in g/ml)
  const baseToDisplay = {
    g: 'g',
    kg: 'g',
    ml: 'ml',
    l: 'ml'
  };
  const items = new Map();
  for (const recipe of recipes) {
    for (const ingredient of recipe.ingredients) {
      const name = ingredient.name.toLowerCase();
      const unit = ingredient.unit;
      let key = name;
      let qty = ingredient.qty;
      // If unit is convertible, we use a key that groups by ingredient and type (mass/volume)
      if (toBase.hasOwnProperty(unit)) {
        // Determine type: mass or volume
        const type = unit === 'g' || unit === 'kg' ? 'mass' : 'volume';
        key = name + '-' + type;
        // Convert to base unit
        qty = ingredient.qty * toBase[unit];
      } else {
        // Non-convertible unit: keep unit in key to avoid mixing
        key = name + '-' + unit;
      }
      if (items.has(key)) {
        items.get(key).qty += qty;
      } else {
        // Store the name (original casing from first occurrence) and the unit to display later
        items.set(key, { 
          name: ingredient.name, 
          qty: qty, 
          unit: unit, // original unit for non-convertible, or base unit for convertible
          isConvertible: toBase.hasOwnProperty(unit) // flag to know how to format later
        });
      }
    }
  }
  // Build result, converting back to display units for convertible types
  const result = [];
  for (const [key, item] of items) {
    let displayQty = item.qty;
    let displayUnit = item.unit;
    if (item.isConvertible) {
      // For convertible items, we stored qty in base units (g or ml) and unit as the original unit.
      // We want to display in the base unit (g or ml) as per the issue examples.
      // Determine if it's mass or volume from the key
      if (key.endsWith('-mass')) {
        displayUnit = 'g';
      } else if (key.endsWith('-volume')) {
        displayUnit = 'ml';
      } else {
        // Fallback (should not happen)
        displayUnit = item.unit;
      }
      // qty is already in base units (g or ml)
      displayQty = item.qty;
    }
    result.push({ name: item.name, qty: displayQty, unit: displayUnit });
  }
  // Sort by name
  return result.sort((a, b) => a.name.localeCompare(b.name));
}

module.exports = { buildShoppingList };
