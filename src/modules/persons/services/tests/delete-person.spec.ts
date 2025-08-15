import { HttpStatus } from "@nestjs/common";
import DeletePersonService from "../delete-person.service";
import { IPersonRepository } from "src/infra/database/repositories/person/person.repository.interface";
import { ErrorMessages } from "src/shared/enums/error-messages.enum";
import ServerError from "src/shared/error/server-error";
import { Person, personGenderEnum } from "src/infra/entities/person.entity";

describe("DeletePersonService", () => {
  let service: DeletePersonService;
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
    } as unknown as jest.Mocked<IPersonRepository>;

    service = new DeletePersonService(personRepository);
  });

  it("deve lançar erro se a pessoa não for encontrada", async () => {
    personRepository.findById.mockResolvedValueOnce(null);

    await expect(service.execute("uuid-nao-existe")).rejects.toEqual(
      new ServerError(ErrorMessages.PERSON_NOT_FOUND, HttpStatus.BAD_REQUEST)
    );

    expect(personRepository.findById).toHaveBeenCalledWith("uuid-nao-existe");
    expect(personRepository.delete).not.toHaveBeenCalled();
  });

  it("deve deletar a pessoa se ela existir", async () => {
    personRepository.findById.mockResolvedValueOnce(mockPerson);

    await service.execute(mockPerson.id);

    expect(personRepository.findById).toHaveBeenCalledWith(mockPerson.id);
    expect(personRepository.delete).toHaveBeenCalledWith(mockPerson);
  });
});
