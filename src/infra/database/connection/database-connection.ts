import { Pool } from 'pg';
import { DatabaseConnectionInterface } from 'src/infra/abstract/database/connection/database-connection-interface';
import { EnvVariables } from 'src/utils/env/envVariables-util';

export class DatabaseConnection implements DatabaseConnectionInterface {
  private readonly client: Pool;

  public constructor() {
    this.client = new Pool({
      connectionString: EnvVariables.getDatabaseUrl(),
    });
  }

  public async connect(): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve(this.client.connect());
    });
  }

  public async begin(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.query('BEGIN', (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response.rows);
        }
      });
    });
  }

  public async rollback(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.query('ROLLBACK', (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response.rows);
        }
      });
    });
  }

  public async commit(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.query('COMMIT', (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response.rows);
        }
      });
    });
  }

  public async disconnect(): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve(this.client.end());
    });
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
