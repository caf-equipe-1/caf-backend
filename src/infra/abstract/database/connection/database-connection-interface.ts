export interface DatabaseConnectionInterface {
  connect(): Promise<void>;
  begin(): Promise<void>;
  rollback(): Promise<void>;
  commit(): Promise<void>;
  disconnect(): Promise<void>;
  executeSqlQuery(sqlQuery: string): Promise<any>;
}
