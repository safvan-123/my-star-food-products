export function productCategoryKey(name: string) {
  return name.trim().replace(/\s+/g, ' ').toLocaleLowerCase();
}

export function uniqueProductCategories<T extends {name: string}>(categories: T[]) {
  const preferred = [...categories].sort((left, right) => {
    const cleanLeft = left.name === left.name.trim().replace(/\s+/g, ' ');
    const cleanRight = right.name === right.name.trim().replace(/\s+/g, ' ');
    return Number(cleanRight) - Number(cleanLeft) || left.name.localeCompare(right.name, undefined, {sensitivity: 'base'});
  });
  const unique = new Map<string, T>();
  for (const category of preferred) {
    const key = productCategoryKey(category.name);
    if (!unique.has(key)) unique.set(key, category);
  }
  return [...unique.values()];
}
