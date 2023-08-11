export function capitalize(word: string) {
  return word[0].toUpperCase() + word.slice(1);
}

export function kebab(word: string) {
  return word.split(" ").join("-");
}

export function getFirstName(name: string) {
  return name.split(' ')[0];
}