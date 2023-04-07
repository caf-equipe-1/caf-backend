export class UnauthorizedError extends Error {
  public constructor(message: string) {
    super(`Unauthorized: ${message}`);
    this.name = `Unauthorized: ${message}`;
  }
}
