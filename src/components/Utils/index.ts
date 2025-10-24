export const slugify = (str: string) =>
  str.toLowerCase().replace(/&/g, "and").replace(/\s+/g, "-");
