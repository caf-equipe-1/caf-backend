import { IdGeneratorAdapterInterface } from 'src/data/abstract/helpers/adapters/idGenerator/idGenerator-adapter-interface';
import { v4 as id } from 'uuid';

export class IdGeneratorAdapter implements IdGeneratorAdapterInterface {
  public generateId(): string {
    return id();
  }
}
