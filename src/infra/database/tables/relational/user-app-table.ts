export const userAppTable: string = `
    CREATE TABLE user_app(
        id VARCHAR(50) PRIMARY KEY NOT NULL,
        userId VARCHAR(50) NOT NULL,
        appId VARCHAR(50) NOT NULL,
        FOREIGN KEY (userId) REFERENCES User(id),
        FOREIGN KEY (appId) REFERENCES App(id)
    )
`;
