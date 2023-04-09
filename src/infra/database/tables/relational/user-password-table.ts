export const userPasswordTable: string = `
    CREATE TABLE user_password(
        id VARCHAR(50) PRIMARY KEY,
        userId VARCHAR(50),
        passwordId VARCHAR(50),
        FOREIGN KEY (userId) REFERENCES User(id),
        FOREIGN KEY (appId) REFERENCES Password(id)
    )
`;
