import { Client } from 'pg';
import { DatabaseConnectionInterface } from 'src/infra/abstract/database/connection/database-connection-interface';
import { EnvVariables } from 'src/utils/env/envVariables-util';

export class DatabaseConnection implements DatabaseConnectionInterface {
  private readonly client: Client;

  public constructor() {
    this.client = new Client({
      connectionString: EnvVariables.getDatabaseUrl(),
    });
  }

  public async connect(): Promise<void> {
    return await this.client.connect().then(() => {
      this.client.query('BEGIN');
    });
  }

  public async disconnect(rollback: boolean): Promise<void> {
    switch (rollback) {
      case true:
        return await this.client.query('ROLLBACK').then(() => {
          this.client.end();
        });

      default:
        return await this.client.query('COMMIT').then(() => {
          this.client.end();
        });
    }
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
