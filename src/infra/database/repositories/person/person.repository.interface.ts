import { Person } from "src/infra/entities/person.entity";
import { ICreatePersonDTO } from "src/modules/persons/dtos/create-person.dto";
import { DeleteResult } from "typeorm";

export abstract class IPersonRepository {
  abstract create(data: ICreatePersonDTO): Promise<Person>

  abstract findByCpf(cpf: string): Promise<Person | null>;

  abstract findByEmail(email: string): Promise<Person | null>;

  abstract findAll(): Promise<Person[]>;

  abstract findById(id: string): Promise<Person | null>;

  abstract update(person: Person): Promise<Person>

  abstract delete(person: Person): Promise<DeleteResult>
}
