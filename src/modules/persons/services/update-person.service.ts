import { HttpStatus, Injectable } from "@nestjs/common";
import { IPersonRepository } from "src/infra/database/repositories/person/person.repository.interface";
import { ErrorMessages } from "src/shared/enums/error-messages.enum";
import ServerError from "src/shared/error/server-error";
import { IUpdatePersonDTO } from "../dtos/update-person.dto";

@Injectable()
export default class UpdatePersonService {
  constructor(
    private readonly personRepository: IPersonRepository,
  ) { }

  public async execute(personId: string, personData: IUpdatePersonDTO) {
    const personFound = await this.personRepository.findById(personId);

    if (!personFound) {
      throw new ServerError(ErrorMessages.PERSON_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }

    await this.personRepository.update({
      ...personFound,
      name: personData.name,
      cpf: personData.cpf,
      birthDate: new Date(personData.birthDate),
      email: personData?.email,
      gender: personData?.gender,
      nationality: personData?.nationality,
      placeOfBirth: personData?.placeOfBirth,
    });
  }
}