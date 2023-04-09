export const userDocumentTable: string = `
    CREATE TABLE user_document(
        id VARCHAR(50) PRIMARY KEY NOT NULL,
        userId VARCHAR(50) NOT NULL,
        documentId VARCHAR(50) NOT NULL,
        FOREIGN KEY (userId) REFERENCES User(id),
        FOREIGN KEY (appId) REFERENCES Document(id)
    )
`;
