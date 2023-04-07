export class InvalidParamError extends Error {
  public constructor(paramName: string) {
    super(`Invalid parameter: ${paramName}`);
    this.name = `Invalid parameter: ${paramName}`;
  }
}
