export const userCardTable: string = `
    CREATE TABLE user_card(
        id VARCHAR(50) PRIMARY KEY,
        userId VARCHAR(50),
        cardId VARCHAR(50),
        FOREIGN KEY (userId) REFERENCES User(id),
        FOREIGN KEY (appId) REFERENCES Card(id)
    )
`;
