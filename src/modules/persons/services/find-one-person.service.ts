import { HttpStatus, Injectable } from "@nestjs/common";
import { IPersonRepository } from "src/infra/database/repositories/person/person.repository.interface";
import { Person } from "src/infra/entities/person.entity";
import { ErrorMessages } from "src/shared/enums/error-messages.enum";
import ServerError from "src/shared/error/server-error";

@Injectable()
export default class FindOnePersonsService {
  constructor(
    private readonly personRepository: IPersonRepository,
  ) { }

  public async execute(id: string): Promise<Person> {
    const person = await this.personRepository.findById(id);

    if (!person) {
      throw new ServerError(ErrorMessages.PERSON_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }

    return person;
  }
}