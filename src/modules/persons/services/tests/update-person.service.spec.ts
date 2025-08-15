import { HttpStatus } from "@nestjs/common";
import UpdatePersonService from "../update-person.service";
import { IPersonRepository } from "src/infra/database/repositories/person/person.repository.interface";
import { ErrorMessages } from "src/shared/enums/error-messages.enum";
import ServerError from "src/shared/error/server-error";
import { Person, personGenderEnum } from "src/infra/entities/person.entity";
import { IUpdatePersonDTO } from "../../dtos/update-person.dto";

describe("UpdatePersonService", () => {
  let service: UpdatePersonService;
  let personRepository: jest.Mocked<IPersonRepository>;

  const mockPerson: Person = {
    id: "uuid-123",
    cpf: "12345678900",
    email: "test@example.com",
    name: "John Doe",
    birthDate: new Date("1990-01-01"),
    gender: personGenderEnum.MALE,
    nationality: "Brazilian",
    placeOfBirth: "São Paulo",
  };

  const updateData: IUpdatePersonDTO = {
    cpf: "98765432100",
    email: "updated@example.com",
    name: "Jane Doe",
    birthDate: "1992-05-15",
    gender: personGenderEnum.FEMALE,
    nationality: "Brazilian",
    placeOfBirth: "Rio de Janeiro",
  };

  beforeEach(() => {
    personRepository = {
      create: jest.fn(),
      findByCpf: jest.fn(),
      findByEmail: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as unknown as jest.Mocked<IPersonRepository>;

    service = new UpdatePersonService(personRepository);
  });

  it("deve lançar erro se a pessoa não for encontrada", async () => {
    personRepository.findById.mockResolvedValueOnce(null);

    await expect(service.execute("id-invalido", updateData)).rejects.toEqual(
      new ServerError(ErrorMessages.PERSON_NOT_FOUND, HttpStatus.BAD_REQUEST)
    );

    expect(personRepository.findById).toHaveBeenCalledWith("id-invalido");
    expect(personRepository.update).not.toHaveBeenCalled();
  });

  it("deve atualizar a pessoa corretamente quando encontrada", async () => {
    personRepository.findById.mockResolvedValueOnce(mockPerson);

    await service.execute(mockPerson.id, updateData);

    expect(personRepository.findById).toHaveBeenCalledWith(mockPerson.id);
    expect(personRepository.update).toHaveBeenCalledWith({
      ...mockPerson,
      name: updateData.name,
      cpf: updateData.cpf,
      birthDate: new Date(updateData.birthDate),
      email: updateData.email,
      gender: updateData.gender,
      nationality: updateData.nationality,
      placeOfBirth: updateData.placeOfBirth,
    });
  });

  it("deve permitir atualização parcial dos dados", async () => {
    personRepository.findById.mockResolvedValueOnce(mockPerson);

    const partialUpdate: IUpdatePersonDTO = {
      name: "Novo Nome",
      cpf: mockPerson.cpf,
      birthDate: String(mockPerson.birthDate),
    };

    await service.execute(mockPerson.id, partialUpdate);

    expect(personRepository.update).toHaveBeenCalledWith({
      ...mockPerson,
      name: partialUpdate.name,
      cpf: partialUpdate.cpf,
      birthDate: new Date(partialUpdate.birthDate),
      email: undefined,
      gender: undefined,
      nationality: undefined,
      placeOfBirth: undefined,
    });
  });
});
