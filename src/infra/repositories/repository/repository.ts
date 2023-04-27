export class Repository {
  protected adaptProperties(item: any): any {
    if (item) {
      const adaptedItem = item;

      if (item.userid) {
        adaptedItem.userId = item.userid;
        delete adaptedItem.userid;
      }

      if (item.createdat) {
        adaptedItem.createdAt = item.createdat;
        delete adaptedItem.createdat;
      }

      if (item.updatedat) {
        adaptedItem.updatedAt = item.updatedat;
        delete adaptedItem.updatedat;
      }

      if (item.securitycode) {
        adaptedItem.securityCode = item.securitycode;
        delete adaptedItem.securitycode;
      }

      return adaptedItem;
    }
  }
}
