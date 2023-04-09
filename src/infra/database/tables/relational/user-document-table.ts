export const userDocumentTable: string = `
    CREATE TABLE user_document(
        id VARCHAR(50) PRIMARY KEY,
        userId VARCHAR(50),
        documentId VARCHAR(50),
        FOREIGN KEY (userId) REFERENCES User(id),
        FOREIGN KEY (appId) REFERENCES Document(id)
    )
`;
