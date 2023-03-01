export default interface AuthenticatedUser {
  user: string
  role: string;
  email: string;
  password: string;
  id?: number;
}
