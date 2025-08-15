import { HttpStatus, Injectable } from "@nestjs/common";
import { IPersonRepository } from "src/infra/database/repositories/person/person.repository.interface";
import { ErrorMessages } from "src/shared/enums/error-messages.enum";
import ServerError from "src/shared/error/server-error";

@Injectable()
export default class DeletePersonService {
  constructor(
    private readonly personRepository: IPersonRepository,
  ) { }

  public async execute(personId: string) {
    const personFound = await this.personRepository.findById(personId);

    if (!personFound) {
      throw new ServerError(ErrorMessages.PERSON_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }

    await this.personRepository.delete(personFound);
  }
}