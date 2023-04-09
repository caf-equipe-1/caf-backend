export const cardTable: string = `
    CREATE TABLE Card(
        id VARCHAR(50) PRIMARY KEY NOT NULL,
        name VARCHAR(100) NOT NULL,
        nickname VARCHAR(100) NOT NULL,
        number INTEGER NOT NULL,
        securityCode INTEGER NOT NULL,
        createdAt VARCHAR(10) NOT NULL,
        updatedAt VARCHAR(10) NOT NULL
    )
`;
