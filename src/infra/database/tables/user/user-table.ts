export const userTable: string = `
    DROP TABLE IF EXISTS "user" CASCADE;
    CREATE TABLE "user"(
        id VARCHAR(50) PRIMARY KEY NOT NULL,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        password VARCHAR(100) NOT NULL,
        photo TEXT,
        cpf VARCHAR(11),
        createdAt VARCHAR(10) NOT NULL,
        updatedAt VARCHAR(10) NOT NULL
    )
`;
