import { Person } from "src/infra/entities/person.entity";
import { ICreatePersonDTO } from "src/modules/persons/dtos/create-person.dto";

export abstract class IPersonRepository {
  abstract create(data: ICreatePersonDTO): Promise<Person>

  abstract findByCpf(cpf: string): Promise<Person | null>;

  abstract findByEmail(email: string): Promise<Person | null>;

  abstract findAll(): Promise<Person[]>;

  abstract findById(id: string): Promise<Person | null>;
}
