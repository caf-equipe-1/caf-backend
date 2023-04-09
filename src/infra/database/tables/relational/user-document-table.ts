export const userDocumentTable: string = `
    DROP TABLE IF EXISTS "user_document" CASCADE;
    CREATE TABLE "user_document"(
        id SERIAL PRIMARY KEY,
        userId VARCHAR(50) NOT NULL,
        documentId VARCHAR(50) NOT NULL,
        FOREIGN KEY (userId) REFERENCES "user"(id) ON DELETE CASCADE,
        FOREIGN KEY (documentId) REFERENCES "document"(id) ON DELETE CASCADE
    )
`;
