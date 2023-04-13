export const cardTable: string = `
    DROP TABLE IF EXISTS "card" CASCADE;
    CREATE TABLE "card"(
        id VARCHAR(50) PRIMARY KEY NOT NULL,
        name VARCHAR(100) NOT NULL,
        nickname VARCHAR(100) NOT NULL,
        number NUMERIC NOT NULL,
        securityCode INTEGER NOT NULL,
        createdAt VARCHAR(10) NOT NULL,
        updatedAt VARCHAR(10) NOT NULL
    )
`;
