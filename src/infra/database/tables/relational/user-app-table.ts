export const userAppTable: string = `
    DROP TABLE IF EXISTS "user_app";
    CREATE TABLE "user_app"(
        id VARCHAR(50) PRIMARY KEY NOT NULL,
        userId VARCHAR(50) NOT NULL,
        appId VARCHAR(50) NOT NULL,
        FOREIGN KEY (userId) REFERENCES "user"(id),
        FOREIGN KEY (appId) REFERENCES "app"(id)
    )
`;
