export const userCardTable: string = `
    CREATE TABLE user_card(
        id VARCHAR(50) PRIMARY KEY NOT NULL,
        userId VARCHAR(50) NOT NULL,
        cardId VARCHAR(50) NOT NULL,
        FOREIGN KEY (userId) REFERENCES User(id),
        FOREIGN KEY (appId) REFERENCES Card(id)
    )
`;
