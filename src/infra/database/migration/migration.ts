import { DatabaseConnection } from '../connection/database-connection';
import { appTable } from '../tables/app/app-table';
import { cardTable } from '../tables/card/card-table';
import { documentTable } from '../tables/document/document-table';
import { passwordTable } from '../tables/password/password-table';
import { userAppTable } from '../tables/relational/user-app-table';
import { userCardTable } from '../tables/relational/user-card-table';
import { userDocumentTable } from '../tables/relational/user-document-table';
import { userPasswordTable } from '../tables/relational/user-password-table';
import { userTable } from '../tables/user/user-table';

class Migration {
  public static execute() {
    this.setTables();
  }

  private static setTables() {
    const database = new DatabaseConnection();
    database.connect();

    try {
      database.executeSqlQuery(userTable).then(() => {
        database.executeSqlQuery(passwordTable).then(() => {
          database.executeSqlQuery(documentTable).then(() => {
            database.executeSqlQuery(cardTable).then(() => {
              database.executeSqlQuery(appTable).then(() => {
                database.executeSqlQuery(userPasswordTable).then(() => {
                  database.executeSqlQuery(userDocumentTable).then(() => {
                    database.executeSqlQuery(userCardTable).then(() => {
                      database.executeSqlQuery(userAppTable).then(() => {
                        database.disconnect(false).then(() => {
                          console.log('Migration executed');
                          return;
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    } catch (error) {
      console.log(error);
      database.disconnect(true);
    }
  }
}

Migration.execute();
