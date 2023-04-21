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

  public async connect(): Promise<void> {
    await this.client.connect();
    return;
  }

  public async begin(): Promise<void> {
    await this.client.query('BEGIN');
    return;
  }

  public async rollback(): Promise<void> {
    await this.client.query('ROLLBACK');
    return;
  }

  public async commit(): Promise<void> {
    await this.client.query('COMMIT');
    return;
  }

  public async disconnect(): Promise<void> {
    this.client.end();
    return;
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
