import { MissingParamError } from 'src/utils/errors/missingParam-error';
import { CreateProfileDto } from '../../../domain/dtos/registration/createProfile-dto';
import { UserType } from 'src/domain/types/entities/user/user-type';
import { Entity } from '../entity/entity';
import { User } from 'src/domain/entities/user/user-entity';
import { UpdateProfileDto } from 'src/domain/dtos/registration/updateProfile-dto';
import { InvalidParamError } from 'src/utils/errors/invalidParam-error';
import { HashAdapterInterface } from 'src/data/abstract/helpers/adapters/hash/hash-adapter-interface';
import { IdGeneratorAdapterInterface } from 'src/data/abstract/helpers/adapters/idGenerator/idGenerator-adapter-interface';
import { UserEntityInterface } from 'src/data/abstract/entities/user/user-entity-interface';

export class UserEntity extends Entity implements UserEntityInterface {
  private readonly idGenerator: IdGeneratorAdapterInterface;
  private userDto: CreateProfileDto | UpdateProfileDto;
  private hasher: HashAdapterInterface;

  public constructor(
    idGenerator: IdGeneratorAdapterInterface,
    hasher: HashAdapterInterface,
  ) {
    super();
    this.idGenerator = idGenerator;
    this.hasher = hasher;
  }

  public setData(userDto: CreateProfileDto | UpdateProfileDto): void {
    this.userDto = userDto;
  }

  public validate(): void {
    if (!this.userDto.name) {
      throw new MissingParamError('Name');
    }

    if (!this.userDto.email) {
      throw new MissingParamError('Email');
    }

    if (!this.userDto.password) {
      throw new MissingParamError('Password');
    }

    if (!this.userDto.photo) {
      throw new MissingParamError('Photo');
    }

    if (!this.userDto.cpf) {
      throw new MissingParamError('Cpf');
    }

    if (typeof this.userDto.name !== 'string') {
      throw new InvalidParamError('Name');
    }

    if (typeof this.userDto.email !== 'string') {
      throw new InvalidParamError('Email');
    }

    if (typeof this.userDto.password !== 'string') {
      throw new InvalidParamError('Password');
    }

    if (typeof this.userDto.photo !== 'string') {
      throw new InvalidParamError('Photo');
    }

    if (typeof this.userDto.cpf !== 'string') {
      throw new InvalidParamError('Cpf');
    }

    if (this.userDto.name.toString().length > 100) {
      throw new InvalidParamError('Name too long');
    }

    if (this.userDto.email.toString().length > 100) {
      throw new InvalidParamError('Email too long');
    }

    if (this.userDto.password.toString().length > 100) {
      throw new InvalidParamError('Password too long');
    }

    if (this.userDto.cpf.toString().length > 11) {
      throw new InvalidParamError(
        'CPF must have a maximum length of 11 characters',
      );
    }

    return;
  }

  public getBody(): UserType {
    return {
      id: this.idGenerator.generateId(),
      name: this.userDto.name,
      password: this.hasher.hash(this.userDto.password, 10),
      cpf: this.userDto.cpf,
      email: this.userDto.email,
      photo: this.userDto.photo,
      cards: [],
      documents: [],
      apps: [],
      passwords: [],
      createdAt: this.getDate(),
      updatedAt: this.getDate(),
    };
  }

  public updateData(mainData: User): UserType {
    return {
      id: mainData.id,
      name: this.userDto.name ?? mainData.name,
      password: this.userDto.password
        ? this.hasher.hash(this.userDto.password, 10)
        : mainData.password,
      cpf: this.userDto.cpf ?? mainData.cpf,
      email: this.userDto.email ?? mainData.email,
      photo: this.userDto.photo ?? mainData.photo,
      cards: mainData.cards ? mainData.cards.map((item) => item.id) : [],
      documents: mainData.documents
        ? mainData.documents.map((item) => item.id)
        : [],
      apps: mainData.apps ? mainData.apps.map((item) => item.id) : [],
      passwords: mainData.passwords
        ? mainData.passwords.map((item) => item.id)
        : [],
      createdAt: mainData.createdAt,
      updatedAt: this.getDate(),
    };
  }
}
