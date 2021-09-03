import { uniqueNamesGenerator, adjectives, animals } from 'unique-names-generator';

export function generateUsername() {
  return uniqueNamesGenerator({
    dictionaries: [adjectives, animals],
    separator: '',
    style: 'capital'
  });
}
