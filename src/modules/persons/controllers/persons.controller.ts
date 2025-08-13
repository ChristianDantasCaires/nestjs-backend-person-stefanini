import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import CreatePersonService from '../services/create-person.service';
import IControllerResponse from 'src/shared/interfaces/IControllerResponse';
import { ZodValidationPipe } from 'src/shared/http/zod-validation.pipe';
import { createPersonSchema } from '../dtos/create-person.dto';
import type { ICreatePersonDTO } from '../dtos/create-person.dto';
import FindAllPersonsService from '../services/find-all-persons.service';
import FindOnePersonsService from '../services/find-one-person.service';

@Controller('persons')
export class PersonsController {
  constructor(
    private readonly createPersonService: CreatePersonService,
    private readonly findAllPersonsService: FindAllPersonsService,
    private readonly findOnePersonsService: FindOnePersonsService,
  ) { }

  @Post('/create')
  @UsePipes(new ZodValidationPipe(createPersonSchema))
  async createPerson(@Body() createPersonDTO: ICreatePersonDTO): Promise<IControllerResponse> {
    const result = await this.createPersonService.execute(createPersonDTO);
    return { data: result, success: true, message: '' }
  }

  @Get()
  async findAllPersons(): Promise<IControllerResponse> {
    const result = await this.findAllPersonsService.execute();
    return { data: result, success: true, message: '' }
  }

  @Get(':id')
  async findOnePerson(@Param('id') id: string) {
    const result = await this.findOnePersonsService.execute(id);
    return { data: result, success: true, message: '' }
  }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
  //   return this.personsService.update(id, updatePersonDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.personsService.remove(id);
  // }
}
