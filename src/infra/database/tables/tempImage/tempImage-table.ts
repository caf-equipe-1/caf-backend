export const tempImageTable: string = `
    DROP TABLE IF EXISTS "tempimage" CASCADE;
    CREATE TABLE "tempimage"(
        id VARCHAR(50) PRIMARY KEY NOT NULL,
        userId VARCHAR(50) NOT NULL,
        photo TEXT NOT NULL,
        FOREIGN KEY (userId) REFERENCES "user"(id) ON DELETE CASCADE
    )
`;
