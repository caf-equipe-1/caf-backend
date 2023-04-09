export const documentTable: string = `
    DROP TABLE IF EXISTS "document" CASCADE;
    CREATE TABLE "document"(
        id VARCHAR(50) PRIMARY KEY NOT NULL,
        name VARCHAR(100) NOT NULL,
        document TEXT NOT NULL,
        createdAt VARCHAR(10) NOT NULL,
        updatedAt VARCHAR(10) NOT NULL
    )
`;
