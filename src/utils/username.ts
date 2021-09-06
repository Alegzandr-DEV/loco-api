import { uniqueNamesGenerator, adjectives, animals } from 'unique-names-generator';
import { GuestModel } from '../models';

export function generateUsername() {
  const randomUsername = uniqueNamesGenerator({
    dictionaries: [adjectives, animals],
    separator: '',
    style: 'capital'
  });

  let checkUnique = GuestModel.findOne({ username: randomUsername }, (err: Error, data: any) => {
    if (err || !data) return randomUsername;
    return generateUsername();
  });

  return checkUnique.getQuery().username;
}
