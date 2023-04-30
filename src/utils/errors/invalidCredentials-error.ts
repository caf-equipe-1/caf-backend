export class InvalidCredentialsError extends Error {
  public constructor() {
    super(`Invalid credentials`);
    this.name = `Invalid credentials`;
  }
}
