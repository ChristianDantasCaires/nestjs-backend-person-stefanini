import FindAllPersonsService from "../find-all-persons.service";
import { IPersonRepository } from "src/infra/database/repositories/person/person.repository.interface";
import { Person, personGenderEnum } from "src/infra/entities/person.entity";

describe("FindAllPersonsService", () => {
  let service: FindAllPersonsService;
  let personRepository: jest.Mocked<IPersonRepository>;

  const mockPersons: Person[] = [
    {
      id: "uuid-1",
      cpf: "12345678900",
      email: "john@example.com",
      name: "John Doe",
      birthDate: new Date("1990-01-01"),
      gender: personGenderEnum.MALE,
    },
    {
      id: "uuid-2",
      cpf: "98765432100",
      email: "jane@example.com",
      name: "Jane Doe",
      birthDate: new Date("1992-05-15"),
      gender: personGenderEnum.FEMALE,
    },
  ];

  beforeEach(() => {
    personRepository = {
      create: jest.fn(),
      findByCpf: jest.fn(),
      findByEmail: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
    };

    service = new FindAllPersonsService(personRepository);
  });

  it("should return all persons from repository", async () => {
    personRepository.findAll.mockResolvedValueOnce(mockPersons);

    const result = await service.execute();

    expect(personRepository.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockPersons);
  });

  it("should return an empty array when no persons exist", async () => {
    personRepository.findAll.mockResolvedValueOnce([]);

    const result = await service.execute();

    expect(personRepository.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual([]);
  });
});
