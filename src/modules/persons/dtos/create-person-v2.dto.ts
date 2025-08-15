import { personGenderEnum } from 'src/infra/entities/person.entity';
import { z } from 'zod';

export const createPersonV2Schema = z.object({
  name: z.string().nonempty("Nome é obrigatório"),
  gender: z
    .enum([personGenderEnum.MALE, personGenderEnum.FEMALE])
    .optional(),
  email: z.email("E-mail inválido").optional(),
  birthDate: z.string()
    .refine((date) => !isNaN(Date.parse(date)), { message: "Data de nascimento inválida" }),
  placeOfBirth: z.string().optional(),
  nationality: z.string().optional(),
  cpf: z.string()
    .regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, "CPF inválido no formato XXX.XXX.XXX-XX"),
  address: z.string()
}).strict();

export type ICreatePersonV2DTO = z.infer<typeof createPersonV2Schema>;

