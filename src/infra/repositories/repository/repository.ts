export class Repository {
  protected adaptProperties(item: any): any {
    if (item) {
      const adaptedItem = item;

      adaptedItem.createdAt = item.createdat;
      adaptedItem.updatedAt = item.updatedat;

      if (item.securitycode) {
        adaptedItem.securityCode = item.securitycode;

        delete adaptedItem.securitycode;
      }

      delete adaptedItem.createdat;
      delete adaptedItem.updatedat;

      return adaptedItem;
    }
  }
}
