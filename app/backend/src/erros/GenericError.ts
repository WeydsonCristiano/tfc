export default class GenericError extends Error {
  constructor(message: string, status: number) {
    super(message);
    this.name = 'GenericError';
    this.stack = status.toString();
  }
}
