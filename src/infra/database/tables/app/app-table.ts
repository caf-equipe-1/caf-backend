export const appTable: string = `
    DROP TABLE IF EXISTS "app" CASCADE;
    CREATE TABLE "app"(
        id VARCHAR(50) PRIMARY KEY NOT NULL,
        name VARCHAR(100) NOT NULL,
        createdAt VARCHAR(10) NOT NULL,
        updatedAt VARCHAR(10) NOT NULL
    )
`;
