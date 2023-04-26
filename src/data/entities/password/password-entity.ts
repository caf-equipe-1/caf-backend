import { PasswordEntityInterface } from 'src/data/abstract/entities/password/password-entity-interface';
import { Password } from 'src/domain/entities/password/password-entity';
import { CreateOrUpdatePasswordType } from 'src/domain/types/entities/password/createOrUpdatePassword-type';
import { PasswordType } from 'src/domain/types/entities/password/password-type';
import { Entity } from '../entity/entity';
import { IdGeneratorAdapterInterface } from 'src/data/abstract/helpers/adapters/idGenerator/idGenerator-adapter-interface';
import { MissingParamError } from 'src/utils/errors/missingParam-error';
import { InvalidParamError } from 'src/utils/errors/invalidParam-error';

export class PasswordEntity extends Entity implements PasswordEntityInterface {
  private passwordDto: CreateOrUpdatePasswordType;
  private readonly idGenerator: IdGeneratorAdapterInterface;

  public constructor(idGenerator: IdGeneratorAdapterInterface) {
    super();
    this.idGenerator = idGenerator;
  }

  public setData(passwordDto: CreateOrUpdatePasswordType): void {
    this.passwordDto = passwordDto;
  }

  public validate(): void {
    if (!this.passwordDto.name) {
      throw new MissingParamError('Name');
    }

    if (!this.passwordDto.password) {
      throw new MissingParamError('Password');
    }

    if (typeof this.passwordDto.name !== 'string') {
      throw new InvalidParamError('Name');
    }

    if (typeof this.passwordDto.password !== 'string') {
      throw new InvalidParamError('Password');
    }

    if (this.passwordDto.name.toString().length > 100) {
      throw new InvalidParamError('Name too long');
    }

    if (this.passwordDto.password.toString().length > 100) {
      throw new InvalidParamError('Password too long');
    }
  }

  public getBody(): PasswordType {
    return {
      id: this.idGenerator.generateId(),
      name: this.passwordDto.name ?? '',
      password: this.passwordDto.password ?? '',
      createdAt: this.getDate(),
      updatedAt: this.getDate(),
    };
  }

  public updateData(mainData: Password): PasswordType {
    return {
      id: mainData.id,
      name: this.passwordDto.name ?? mainData.name,
      password: this.passwordDto.password ?? mainData.password,
      createdAt: mainData.createdAt,
      updatedAt: this.getDate(),
    };
  }

  public validateUpdate(): void {
    if (this.passwordDto.name) {
      if (typeof this.passwordDto.name !== 'string') {
        throw new InvalidParamError('Name');
      }

      if (this.passwordDto.name.toString().length > 100) {
        throw new InvalidParamError('Name too long');
      }
    }

    if (this.passwordDto.password) {
      if (typeof this.passwordDto.password !== 'string') {
        throw new InvalidParamError('Password');
      }

      if (this.passwordDto.password.toString().length > 100) {
        throw new InvalidParamError('Password too long');
      }
    }
  }
}
