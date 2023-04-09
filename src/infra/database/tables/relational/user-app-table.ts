export const userAppTable: string = `
    DROP TABLE IF EXISTS "user_app";
    CREATE TABLE "user_app"(
        id SERIAL PRIMARY KEY,
        userId VARCHAR(50) NOT NULL,
        appId VARCHAR(50) NOT NULL,
        FOREIGN KEY (userId) REFERENCES "user"(id),
        FOREIGN KEY (appId) REFERENCES "app"(id)
    )
`;
