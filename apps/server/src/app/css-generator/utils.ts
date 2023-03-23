const kebabize = (str: string) => {
  return str
    .split('')
    .map((letter, idx) => {
      return letter.toUpperCase() === letter
        ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
        : letter;
    })
    .join('');
};

export function stylesToString(stylesObject: Record<string, string>) {
  const result: string[] = [];
  for (const key of Object.keys(stylesObject)) {
    result.push(`${kebabize(key)}: ${stylesObject[key]}`);
  }

  return `${result.join('; ')};`;
}
