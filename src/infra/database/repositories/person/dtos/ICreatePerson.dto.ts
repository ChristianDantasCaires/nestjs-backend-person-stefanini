export default interface ICreatePersonDTO {
  name: string;

  gender?: string;

  email?: string;

  birthDate: Date;

  placeOfBirth?: string;

  nationality?: string;

  cpf: string;
}