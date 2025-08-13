import { Injectable } from "@nestjs/common";
import { IPersonRepository } from "src/infra/database/repositories/person/person.repository.interface";
import { Person } from "src/infra/entities/person.entity";

@Injectable()
export default class FindAllPersonsService {
  constructor(
    private readonly personRepository: IPersonRepository,
  ) { }

  public async execute(): Promise<Person[]> {
    const persons = await this.personRepository.findAll();

    return persons;
  }
}