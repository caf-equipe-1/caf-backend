export interface HashAdapterInterface {
  hash(password: string, saltRounds: number): string;
  compare(password: string, mainPassword: string): boolean;
}
