export class MissingParamError extends Error {
  public constructor(paramName: string) {
    super(`Missing parameter: ${paramName}`);
    this.name = `Missing parameter: ${paramName}`;
  }
}
