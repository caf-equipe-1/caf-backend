export interface DatabaseConnectionInterface {
  connect(): Promise<void>;
  disconnect(rollback: boolean): Promise<void>;
  executeSqlQuery(sqlQuery: string): Promise<any>;
}
