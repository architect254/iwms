export interface SignUpDto {
  first_name: string;
  last_name: string;
  id_number: string;
  birth_date: Date;
  phone_number: string;
  email: string;
  password: string;
}
export interface SignInDto {
  email: string;
  password: string;
}
