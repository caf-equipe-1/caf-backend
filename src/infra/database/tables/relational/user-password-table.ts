export const userPasswordTable: string = `
    CREATE TABLE user_password(
        id VARCHAR(50) PRIMARY KEY NOT NULL,
        userId VARCHAR(50) NOT NULL,
        passwordId VARCHAR(50) NOT NULL,
        FOREIGN KEY (userId) REFERENCES User(id),
        FOREIGN KEY (appId) REFERENCES Password(id)
    )
`;
