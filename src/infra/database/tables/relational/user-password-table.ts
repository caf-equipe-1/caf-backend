export const userPasswordTable: string = `
    DROP TABLE IF EXISTS "user_password" CASCADE;
    CREATE TABLE "user_password"(
        id SERIAL PRIMARY KEY,
        userId VARCHAR(50) NOT NULL,
        passwordId VARCHAR(50) NOT NULL,
        FOREIGN KEY (userId) REFERENCES "user"(id) ON DELETE CASCADE,
        FOREIGN KEY (passwordId) REFERENCES "password"(id) ON DELETE CASCADE
    )
`;
