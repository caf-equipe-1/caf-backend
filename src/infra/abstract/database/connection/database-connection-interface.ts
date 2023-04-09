export interface DatabaseConnectionInterface {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  executeSqlQuery(sqlQuery: string): Promise<any>;
}
