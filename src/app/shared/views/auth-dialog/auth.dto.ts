export interface SignUpDto {
  name: string;
  id_number: string;
  birth_date: Date;
  phone_number: string;
  email: string;
  password: string;
}
export interface SignInDto {
  id_number: string;
  password: string;
}
