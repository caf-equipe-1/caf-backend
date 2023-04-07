import { CardEntityInterface } from 'src/data/abstract/entities/card/card-entity-interface';
import { Card } from 'src/domain/entities/card/card-entity';
import { CreateOrUpdateCardType } from 'src/domain/types/entities/card/createOrUpdateCard-type';
import { CardType } from 'src/domain/types/entities/card/card-type';
import { Entity } from '../entity/entity';
import { IdGeneratorAdapterInterface } from 'src/data/abstract/helpers/adapters/idGenerator/idGenerator-adapter-interface';
import { MissingParamError } from 'src/utils/errors/missingParam-error';
import { InvalidParamError } from 'src/utils/errors/invalidParam-error';

export class CardEntity extends Entity implements CardEntityInterface {
  private cardDto: CreateOrUpdateCardType;
  private readonly idGenerator: IdGeneratorAdapterInterface;

  public constructor(idGenerator: IdGeneratorAdapterInterface) {
    super();
    this.idGenerator = idGenerator;
  }

  public setData(cardDto: CreateOrUpdateCardType): void {
    this.cardDto = cardDto;
  }

  public validate(): void {
    if (!this.cardDto.name) {
      throw new MissingParamError('Name');
    }

    if (!this.cardDto.nickname) {
      throw new MissingParamError('Nickname');
    }

    if (!this.cardDto.number) {
      throw new MissingParamError('Number');
    }

    if (!this.cardDto.securityCode) {
      throw new MissingParamError('Security Code');
    }

    if (typeof this.cardDto.name !== 'string') {
      throw new InvalidParamError('Name');
    }

    if (typeof this.cardDto.nickname !== 'string') {
      throw new InvalidParamError('Nickname');
    }

    if (typeof this.cardDto.number !== 'number') {
      throw new MissingParamError('Number');
    }

    if (typeof this.cardDto.securityCode !== 'number') {
      throw new MissingParamError('Security Code');
    }
  }

  public getBody(): CardType {
    return {
      id: this.idGenerator.generateId(),
      name: this.cardDto.name,
      nickname: this.cardDto.nickname,
      number: this.cardDto.number,
      securityCode: this.cardDto.securityCode,
      createdAt: this.getDate(),
      updatedAt: this.getDate(),
    };
  }

  public updateData(mainData: Card): CardType {
    return {
      id: mainData.id,
      name: this.cardDto.name ?? mainData.name,
      nickname: this.cardDto.nickname ?? mainData.nickname,
      number: this.cardDto.number ?? mainData.number,
      securityCode: this.cardDto.securityCode ?? mainData.securityCode,
      createdAt: mainData.createdAt,
      updatedAt: this.getDate(),
    };
  }
}