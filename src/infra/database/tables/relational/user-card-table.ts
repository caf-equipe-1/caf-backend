export const userCardTable: string = `
    DROP TABLE IF EXISTS "user_card";
    CREATE TABLE "user_card"(
        id VARCHAR(50) PRIMARY KEY NOT NULL,
        userId VARCHAR(50) NOT NULL,
        cardId VARCHAR(50) NOT NULL,
        FOREIGN KEY (userId) REFERENCES "user"(id),
        FOREIGN KEY (cardId) REFERENCES "card"(id)
    )
`;
