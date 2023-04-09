import { sqlAction } from 'src/infra/abstract/enums/sqlAction-enum';

export interface SqlQueryHelperInterface {
  getSqlQuery(): string | void;
  setAction(actionName: sqlAction): void;
  setTable(tableName: string): void;
  setFields(fields: string[]): void;
  setFieldsRaw(fields: string): void;
  setInnerJoin(
    innerJoin: {
      table: string;
      field1: string;
      operator: string;
      field2: string;
    }[],
  ): void;
  setInnerJoinRaw(innerJoin: string): void;
  setLeftJoin(
    leftJoin: {
      table: string;
      field1: string;
      operator: string;
      field2: string;
    }[],
  ): void;
  setLeftJoinRaw(leftJoin: string): void;
  setValues(
    values: { field: string; value: string | number | boolean }[],
  ): void;
  setValuesRaw(values: string): void;
  setWhere(
    where: {
      field: string;
      operator: string;
      value: string | number | boolean;
    }[],
  ): void;
  setWhereRaw(where: string): void;
}
