import ICreateUserDTO from "./dtos/ICreateUser.dto";
import { User } from "src/infra/entities/user.entity";

export abstract class IUserRepository {
  abstract create(data: ICreateUserDTO): Promise<User>

  abstract findById(id: string): Promise<User | null>

  abstract findByEmail(email: string): Promise<User | null>;
}
