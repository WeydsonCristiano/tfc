export default interface AuthenticatedUser {
  user: string;
  email: string;
  password: string;
  id?: number;
}
