import { HttpStatus, Injectable } from "@nestjs/common";
import type { ICreatePersonDTO } from '../dtos/create-person.dto';
import { IPersonRepository } from "src/infra/database/repositories/person/person.repository.interface";
import ServerError from "src/shared/error/server-error";
import { ErrorMessages } from "src/shared/enums/error-messages.enum";
import { Person } from "src/infra/entities/person.entity";

@Injectable()
export default class CreatePersonService {
  constructor(
    private readonly personRepository: IPersonRepository,

  ) { }

  public async execute(data: ICreatePersonDTO): Promise<Person> {
    const existingPersonByCpf = await this.personRepository.findByCpf(data.cpf);

    if (existingPersonByCpf) {
      throw new ServerError(ErrorMessages.PERSON_CPF_ALREADY_REGISTERED, HttpStatus.BAD_REQUEST);
    }

    if (data?.email) {
      const existingPersonByEmail = await this.personRepository.findByEmail(data.email);

      if (existingPersonByEmail) {
        throw new ServerError(ErrorMessages.PERSON_EMAIL_ALREADY_REGISTERED, HttpStatus.BAD_REQUEST);
      }
    }

    const createPerson = await this.personRepository.create(data);

    return createPerson;
  }
}