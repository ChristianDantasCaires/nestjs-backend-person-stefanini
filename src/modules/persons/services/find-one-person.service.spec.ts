import { HttpStatus } from "@nestjs/common";
import { IPersonRepository } from "src/infra/database/repositories/person/person.repository.interface";
import { Person, personGenderEnum } from "src/infra/entities/person.entity";
import { ErrorMessages } from "src/shared/enums/error-messages.enum";
import ServerError from "src/shared/error/server-error";
import FindOnePersonsService from "./find-one-person.service";

describe("FindOnePersonsService", () => {
  let service: FindOnePersonsService;
  let personRepository: jest.Mocked<IPersonRepository>;

  const mockPerson: Person = {
    id: "uuid-123",
    cpf: "12345678900",
    email: "john@example.com",
    name: "John Doe",
    birthDate: new Date("1990-01-01"),
    gender: personGenderEnum.MALE,
  };

  beforeEach(() => {
    personRepository = {
      create: jest.fn(),
      findByCpf: jest.fn(),
      findByEmail: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
    };

    service = new FindOnePersonsService(personRepository);
  });

  it("should return the person when found", async () => {
    personRepository.findById.mockResolvedValueOnce(mockPerson);

    const result = await service.execute(mockPerson.id);

    expect(personRepository.findById).toHaveBeenCalledWith(mockPerson.id);
    expect(result).toEqual(mockPerson);
  });

  it("should throw an error if person is not found", async () => {
    personRepository.findById.mockResolvedValueOnce(null);

    await expect(service.execute("non-existing-id")).rejects.toEqual(
      new ServerError(ErrorMessages.PERSON_NOT_FOUND, HttpStatus.BAD_REQUEST)
    );

    expect(personRepository.findById).toHaveBeenCalledWith("non-existing-id");
  });
});
