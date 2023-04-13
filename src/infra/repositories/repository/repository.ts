export class Repository {
  protected adaptProperties(item: any): any {
    if (item) {
      const adaptedItem = item;

      adaptedItem.createdAt = item.createdat;
      adaptedItem.updatedAt = item.updatedat;

      delete adaptedItem.createdat;
      delete adaptedItem.updatedat;

      return adaptedItem;
    }
  }
}
