import { config as envFileConfig } from 'dotenv';

envFileConfig();

export class EnvVariables {
  public static getPort(): number {
    return Number(process.env.PORT || 7777);
  }

  public static getDatabaseUrl(): string {
    return process.env.DATABASE_URL;
  }

  public static getSecret(): string {
    return process.env.SECRET;
  }

  public static getBackendUrl(): string {
    return process.env.BACKEND_URL;
  }

  public static getAuthApiUrl(): string {
    return process.env.AUTH_API_URL;
  }

  public static getAuthApiUserId(): string {
    return process.env.AUTH_API_USERID;
  }

  public static getAuthApiSecret(): string {
    return process.env.AUTH_API_SECRET;
  }
}
