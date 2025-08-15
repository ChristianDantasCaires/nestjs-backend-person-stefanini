import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

export enum personGenderEnum {
  MALE = 'M',
  FEMALE = 'F',
}

@Entity('persons')
@Unique(['cpf'])
export class Person {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({
    default: null,
  })
  gender?: personGenderEnum;

  @Column({ nullable: true, unique: true })
  email?: string;

  @Column({ type: 'date', nullable: false })
  birthDate: Date;

  @Column({ nullable: true })
  placeOfBirth?: string;

  @Column({ nullable: true })
  nationality?: string;

  @Column({ nullable: false, unique: true })
  cpf: string;

  @Column({ nullable: true })
  address?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
