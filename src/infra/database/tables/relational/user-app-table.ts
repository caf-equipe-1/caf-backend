export const userAppTable: string = `
    DROP TABLE IF EXISTS "user_app" CASCADE;
    CREATE TABLE "user_app"(
        id SERIAL PRIMARY KEY,
        userId VARCHAR(50) NOT NULL,
        appId VARCHAR(50) NOT NULL,
        FOREIGN KEY (userId) REFERENCES "user"(id) ON DELETE CASCADE,
        FOREIGN KEY (appId) REFERENCES "app"(id) ON DELETE CASCADE
    )
`;
