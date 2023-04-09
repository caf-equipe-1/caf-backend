export const userAppTable: string = `
    CREATE TABLE user_app(
        id VARCHAR(50) PRIMARY KEY,
        userId VARCHAR(50),
        appId VARCHAR(50),
        FOREIGN KEY (userId) REFERENCES User(id),
        FOREIGN KEY (appId) REFERENCES App(id)
    )
`;
