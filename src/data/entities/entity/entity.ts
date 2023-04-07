export class Entity {
  protected getDate(): string {
    return new Date().toISOString().split('T')[0];
  }
}
