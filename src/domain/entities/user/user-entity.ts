import { App } from '../app/app-entity';
import { Card } from '../card/card-entity';
import { Password } from '../password/password-entity';

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  photo: string;
  cpf: string;
  passwords: Password[];
  documents: { id: string; name: string }[];
  cards: Card[];
  apps: App[];
  createdAt: string;
  updatedAt: string;
};
