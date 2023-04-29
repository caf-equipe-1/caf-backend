export const tempImageTable: string = `
    DROP TABLE IF EXISTS "tempimage" CASCADE;
    CREATE TABLE "tempimage"(
        id VARCHAR(50) PRIMARY KEY NOT NULL,
        photo TEXT NOT NULL
    )
`;
