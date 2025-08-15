import { HttpStatus } from "@nestjs/common";
import CreatePersonService from "../create-person.service";
import { ErrorMessages } from "src/shared/enums/error-messages.enum";
import ServerError from "src/shared/error/server-error";
import { Person, personGenderEnum } from "src/infra/entities/person.entity";
import { IPersonRepository } from "src/infra/database/repositories/person/person.repository.interface";

describe("CreatePersonService", () => {
  let service: CreatePersonService;
  let personRepository: jest.Mocked<IPersonRepository>;

  const mockPerson: Person = {
    id: "uuid-123",
    cpf: "12345678900",
    email: "test@example.com",
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
      delete: jest.fn(),
      update: jest.fn(),
    };

    service = new CreatePersonService(personRepository);
  });

  it("should throw an error if CPF already exists", async () => {
    personRepository.findByCpf.mockResolvedValueOnce(mockPerson);

    await expect(
      service.execute({ cpf: mockPerson.cpf, email: mockPerson.email, name: mockPerson.name, birthDate: String(mockPerson.birthDate), gender: mockPerson.gender })
    ).rejects.toEqual(
      new ServerError(ErrorMessages.PERSON_CPF_ALREADY_REGISTERED, HttpStatus.BAD_REQUEST)
    );

    expect(personRepository.findByCpf).toHaveBeenCalledWith(mockPerson.cpf);
    expect(personRepository.findByEmail).not.toHaveBeenCalled();
    expect(personRepository.create).not.toHaveBeenCalled();
  });

  it("should throw an error if email already exists", async () => {
    personRepository.findByCpf.mockResolvedValueOnce(null);
    personRepository.findByEmail.mockResolvedValueOnce(mockPerson);

    await expect(
      service.execute({ cpf: mockPerson.cpf, email: mockPerson.email, name: mockPerson.name, birthDate: String(mockPerson.birthDate), gender: mockPerson.gender })
    ).rejects.toEqual(
      new ServerError(ErrorMessages.PERSON_EMAIL_ALREADY_REGISTERED, HttpStatus.BAD_REQUEST)
    );

    expect(personRepository.findByCpf).toHaveBeenCalledWith(mockPerson.cpf);
    expect(personRepository.findByEmail).toHaveBeenCalledWith(mockPerson.email);
    expect(personRepository.create).not.toHaveBeenCalled();
  });

  it("should create and return the new person when no conflicts", async () => {
    personRepository.findByCpf.mockResolvedValueOnce(null);
    personRepository.findByEmail.mockResolvedValueOnce(null);
    personRepository.create.mockResolvedValueOnce(mockPerson);

    const result = await service.execute({
      cpf: mockPerson.cpf,
      email: mockPerson.email,
      name: mockPerson.name,
      birthDate: String(mockPerson.birthDate),
      gender: mockPerson.gender
    });

    expect(personRepository.findByCpf).toHaveBeenCalledWith(mockPerson.cpf);
    expect(personRepository.findByEmail).toHaveBeenCalledWith(mockPerson.email);
    expect(personRepository.create).toHaveBeenCalledWith({
      cpf: mockPerson.cpf,
      email: mockPerson.email,
      name: mockPerson.name,
      birthDate: String(mockPerson.birthDate),
      gender: mockPerson.gender
    });
    expect(result).toEqual(mockPerson);
  });

  it("should skip email check if no email is provided", async () => {
    personRepository.findByCpf.mockResolvedValueOnce(null);
    personRepository.create.mockResolvedValueOnce(mockPerson);

    const dtoWithoutEmail = {
      cpf: mockPerson.cpf,
      name: mockPerson.name,
      birthDate: mockPerson.birthDate,
      gender: mockPerson.gender
    };

    const result = await service.execute(dtoWithoutEmail as any);

    expect(personRepository.findByCpf).toHaveBeenCalledWith(mockPerson.cpf);
    expect(personRepository.findByEmail).not.toHaveBeenCalled();
    expect(personRepository.create).toHaveBeenCalledWith(dtoWithoutEmail);
    expect(result).toEqual(mockPerson);
  });
});
