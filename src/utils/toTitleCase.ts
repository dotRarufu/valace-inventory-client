export const toTitleCase = (text: string) => {
  const first = text[0].toUpperCase();
  const capitalized = text.slice(1).toLowerCase();

  return first + capitalized;
};
