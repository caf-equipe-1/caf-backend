import { hashSync, compareSync } from 'bcrypt';
import { HashAdapterInterface } from 'src/data/abstract/helpers/adapters/hash/hash-adapter-interface';

export class HashAdapter implements HashAdapterInterface {
  public hash(password: string, saltRounds = 10): string {
    return hashSync(password, saltRounds);
  }

  public compare(password: string, mainPassword: string): boolean {
    return compareSync(password, mainPassword);
  }
}
