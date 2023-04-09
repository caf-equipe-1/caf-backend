export const userTable: string = `
    CREATE TABLE user(
        id varchar(50),
        name varchar(100),
        email varchar(100),
        password varchar(100),
        photo TEXT,
        cpf varchar(11),
        createdAt varchar(10),
        updatedAt varchar(10)
    )
`;
