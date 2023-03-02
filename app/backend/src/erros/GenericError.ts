export default class GenericError extends Error {
  constructor(message: string, status: number) {
    super(message);
    this.name = 'IdEqualError';
    this.stack = status.toString();
  }
}
