import { sqlAction } from 'src/infra/abstract/enums/sqlAction-enum';
import { SqlQueryHelperInterface } from 'src/infra/abstract/helpers/sqlQuery/sqlQuery-helper-interface';

export class SqlQueryHelper implements SqlQueryHelperInterface {
  private table: string;
  private action: string;
  private fields: string[];
  private fieldsRaw: string;
  private innerJoin: {
    table: string;
    field1: string;
    operator: string;
    field2: string;
  }[];
  private innerJoinRaw: string;
  private leftJoin: {
    table: string;
    field1: string;
    operator: string;
    field2: string;
  }[];
  private leftJoinRaw: string;
  private values: { field: string; value: string | number | boolean }[];
  private valuesRaw: string;
  private where: {
    field: string;
    operator: string;
    value: string | number | boolean;
  }[];
  private whereRaw: string;

  public constructor() {
    this.table = '';
    this.action = '';
    this.fields = [];
    this.fieldsRaw = '';
    this.innerJoin = [];
    this.innerJoinRaw = '';
    this.leftJoin = [];
    this.leftJoinRaw = '';
    this.values = [];
    this.valuesRaw = '';
    this.where = [];
    this.whereRaw = '';
  }

  public getSqlQuery(): string {
    return this.generateSql();
  }

  public setAction(actionName: sqlAction): void {
    this.action = actionName;
  }

  public setTable(tableName: string): void {
    this.table = tableName;
  }

  public setFields(fields: string[]): void {
    this.fields = fields;
  }

  public setFieldsRaw(fields: string): void {
    this.fieldsRaw = fields;
  }

  public setInnerJoin(
    innerJoin: {
      table: string;
      field1: string;
      operator: string;
      field2: string;
    }[],
  ): void {
    this.innerJoin = innerJoin;
  }

  public setInnerJoinRaw(innerJoin: string): void {
    this.innerJoinRaw = innerJoin;
  }

  public setLeftJoin(
    leftJoin: {
      table: string;
      field1: string;
      operator: string;
      field2: string;
    }[],
  ): void {
    this.leftJoin = leftJoin;
  }

  public setLeftJoinRaw(leftJoin: string): void {
    this.leftJoinRaw = leftJoin;
  }

  public setValues(
    values: { field: string; value: string | number | boolean }[],
  ): void {
    this.values = values;
  }

  public setValuesRaw(values: string): void {
    this.valuesRaw = values;
  }

  public setWhere(
    where: {
      field: string;
      operator: string;
      value: string | number | boolean;
    }[],
  ): void {
    this.where = where;
  }

  public setWhereRaw(where: string): void {
    this.whereRaw = where;
  }

  private generateSql(): string {
    const tableDefined = this.table.trim() !== '';
    const actionDefined = this.action.trim() !== '';
    const fieldsDefined = this.fields.length > 0;
    const fieldsRawDefined = this.fieldsRaw.trim() !== '';
    const innerJoinDefined = this.innerJoin.length > 0;
    const innerJoinRawDefined = this.innerJoinRaw.trim() !== '';
    const leftJoinRawDefined = this.leftJoinRaw.trim() !== '';
    const leftJoinDefined = this.leftJoin.length > 0;
    const valuesDefined = this.values.length > 0;
    const valuesRawDefined = this.valuesRaw.trim() !== '';
    const whereDefined = this.where.length > 0;
    const whereRawDefined = this.whereRaw.trim() !== '';

    if (!tableDefined || !actionDefined) {
      return '';
    }

    const table = this.table;
    const action = this.action;

    const fields = fieldsRawDefined
      ? this.fieldsRaw
      : fieldsDefined
      ? this.fields.join(', ')
      : '*';

    const innerJoin = innerJoinRawDefined
      ? this.innerJoinRaw
      : innerJoinDefined
      ? this.innerJoin
          .map(
            (element) =>
              ` INNER JOIN ${element.table} ON ${element.table}.${element.field1} ${element.operator} "${table}".${element.field2}`,
          )
          .join(' ')
      : '';

    const leftJoin = leftJoinRawDefined
      ? this.leftJoinRaw
      : leftJoinDefined
      ? this.leftJoin
          .map(
            (element) =>
              ` LEFT JOIN ${element.table} ON ${element.table}.${element.field1} ${element.operator} "${table}".${element.field2}`,
          )
          .join(' ')
      : '';

    const valueLabels = valuesRawDefined
      ? this.valuesRaw
      : valuesDefined
      ? this.values.map((element) => ` ${element.field}`).join(', ')
      : '';

    const valuesForInsertion = valuesRawDefined
      ? this.valuesRaw
      : valuesDefined
      ? this.values.map((element) => ` ${element.value}`).join(', ')
      : '';

    const valuesForUpdate = valuesRawDefined
      ? this.valuesRaw
      : valuesDefined
      ? this.values
          .map((element) => ` ${element.field} = ${element.value}`)
          .join(', ')
      : '';

    const where = whereRawDefined
      ? this.whereRaw
      : whereDefined
      ? this.where
          .map(
            (element) =>
              ` AND ${element.field} ${element.operator} ${element.value}`,
          )
          .join(', ')
      : '';

    switch (this.action) {
      case 'SELECT':
        return `
                SELECT ${fields}
                    FROM "${table}"
                    ${innerJoin}
                    ${leftJoin}
                WHERE 1 = 1 ${where}
            `;

      case 'INSERT':
        return `
                INSERT INTO "${table}"
                ${valueLabels}
                VALUES ${valuesForInsertion}
            `;

      case 'DELETE':
        return `
                DELETE FROM "${table}"
                ${where}
            `;

      case 'UPDATE':
        return `
                UPDATE "${table}"
                SET ${valuesForUpdate}
                WHERE 1 = 1 ${where}
            `;
    }
  }
}
