export const passwordTable: string = `
    DROP TABLE IF EXISTS "password";
    CREATE TABLE "password"(
        id VARCHAR(50) PRIMARY KEY NOT NULL,
        name VARCHAR(100) NOT NULL,
        password VARCHAR(100) NOT NULL,
        createdAt VARCHAR(10) NOT NULL,
        updatedAt VARCHAR(10) NOT NULL
    )
`;
