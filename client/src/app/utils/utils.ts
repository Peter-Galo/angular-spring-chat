interface Named {
  name: string;
}

export function reorderedItems<T extends Named>(
  items: T[],
  defaultItemName: string
): T[] {
  let defaultItem: T | undefined;
  const reorderedItems: T[] = [];

  items.forEach((item) => {
    if (item.name === defaultItemName) {
      defaultItem = item;
    } else {
      reorderedItems.push(item);
    }
  });

  defaultItem && reorderedItems.unshift(defaultItem);

  return reorderedItems;
}

export function formatInput(text: string): string {
  return text
    .trim() // Remove leading and trailing whitespace
    .toLowerCase() // Convert all characters to lowercase
    .replace(/[^a-z0-9\s]/gi, '') // Remove non-numeric and non-alpha characters
    .replace(/\s+/g, '-') // Replace one or more spaces with a single hyphen
    .replace(/-+$/, ''); // Remove hyphen(s) at the end of the string
}
