import { AppEntityInterface } from 'src/data/abstract/entities/app/app-entity-interface';
import { App } from 'src/domain/entities/app/app-entity';
import { CreateOrUpdateAppType } from 'src/domain/types/entities/app/createOrUpdateApp-type';
import { AppType } from 'src/domain/types/entities/app/app-type';
import { Entity } from '../entity/entity';
import { IdGeneratorAdapterInterface } from 'src/data/abstract/helpers/adapters/idGenerator/idGenerator-adapter-interface';
import { MissingParamError } from 'src/utils/errors/missingParam-error';
import { InvalidParamError } from 'src/utils/errors/invalidParam-error';

export class AppEntity extends Entity implements AppEntityInterface {
  private appDto: CreateOrUpdateAppType;
  private readonly idGenerator: IdGeneratorAdapterInterface;

  public constructor(idGenerator: IdGeneratorAdapterInterface) {
    super();
    this.idGenerator = idGenerator;
  }

  public setData(appDto: CreateOrUpdateAppType): void {
    this.appDto = appDto;
  }

  public validate(): void {
    if (!this.appDto.name) {
      throw new MissingParamError('Name');
    }

    if (typeof this.appDto.name !== 'string') {
      throw new InvalidParamError('Name');
    }
  }

  public getBody(): AppType {
    return {
      id: this.idGenerator.generateId(),
      name: this.appDto.name,
      createdAt: this.getDate(),
      updatedAt: this.getDate(),
    };
  }

  public updateData(mainData: App): AppType {
    return {
      id: mainData.id,
      name: this.appDto.name ?? mainData.name,
      createdAt: mainData.createdAt,
      updatedAt: this.getDate(),
    };
  }
}
