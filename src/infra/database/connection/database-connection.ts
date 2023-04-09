import { Client } from 'pg';
import { DatabaseConnectionInterface } from 'src/infra/abstract/database/connection/database-connection-interface';

export class DatabaseConnection implements DatabaseConnectionInterface {
  private readonly client: Client;

  public constructor() {
    this.client = new Client({
      connectionString: process.env.DATABASE_URL,
    });
  }

  public async connect(): Promise<void> {
    return await this.client.connect();
  }

  public async disconnect(): Promise<void> {
    return await this.client.end();
  }

  public async executeSqlQuery(sqlQuery: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.query(sqlQuery, (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response.rows);
        }
      });
    });
  }
}
