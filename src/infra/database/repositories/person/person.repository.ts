import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from 'src/infra/entities/person.entity';
import { IPersonRepository } from './person.repository.interface';
import { ICreatePersonDTO } from 'src/modules/persons/dtos/create-person.dto';

@Injectable()
export class PersonRepository implements IPersonRepository {
  constructor(
    @InjectRepository(Person)
    private readonly repository: Repository<Person>
  ) { }

  async create(data: ICreatePersonDTO): Promise<Person> {
    const person = this.repository.create(data);

    return this.repository.save(person);
  }

  async findByCpf(cpf: string): Promise<Person | null> {
    return this.repository.findOne({ where: { cpf } });
  }

  async findByEmail(email: string): Promise<Person | null> {
    return this.repository.findOne({ where: { email } });
  }

  async findAll(): Promise<Person[]> {
    return this.repository.find();
  }

  async findById(id: string): Promise<Person | null> {
    return this.repository.findOne({ where: { id } });
  }

  async update(person: Person): Promise<Person> {
    return this.repository.save(person);
  }

  async delete(person: Person): Promise<DeleteResult> {
    return this.repository.delete(person);
  }
}