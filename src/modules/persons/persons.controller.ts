import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes } from '@nestjs/common';
import CreatePersonService from './services/create-person.service';
import IControllerResponse from 'src/shared/interfaces/IControllerResponse';
import { ZodValidationPipe } from 'src/shared/http/pipe/zod-validation.pipe';
import { createPersonSchema } from './dtos/create-person.dto';
import type { ICreatePersonDTO } from './dtos/create-person.dto';
import FindAllPersonsService from './services/find-all-persons.service';
import FindOnePersonsService from './services/find-one-person.service';
import { AuthGuard } from 'src/shared/http/guard/auth.guard';
import DeletePersonService from './services/delete-person.service';
import { updatePersonSchema } from './dtos/update-person.dto';
import UpdatePersonService from './services/update-person.service';
import type { IUpdatePersonDTO } from './dtos/update-person.dto'

@Controller('persons')
export class PersonsController {
  constructor(
    private readonly createPersonService: CreatePersonService,
    private readonly findAllPersonsService: FindAllPersonsService,
    private readonly findOnePersonsService: FindOnePersonsService,
    private readonly updatePersonService: UpdatePersonService,
    private readonly deletePersonService: DeletePersonService,
  ) { }

  @UseGuards(AuthGuard)
  @Post('/create')
  @UsePipes(new ZodValidationPipe(createPersonSchema))
  async createPerson(@Body() createPersonDTO: ICreatePersonDTO): Promise<IControllerResponse> {
    const result = await this.createPersonService.execute(createPersonDTO);
    return { data: result, success: true, message: '' }
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAllPersons(): Promise<IControllerResponse> {
    const result = await this.findAllPersonsService.execute();
    return { data: result, success: true, message: '' }
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOnePerson(@Param('id') id: string): Promise<IControllerResponse> {
    const result = await this.findOnePersonsService.execute(id);
    return { data: result, success: true, message: '' }
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async updatePerson(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updatePersonSchema)) updatePersonDto: IUpdatePersonDTO
  ): Promise<IControllerResponse> {
    const result = await this.updatePersonService.execute(id, updatePersonDto);
    return { data: result, success: true, message: 'Pessoa atualizada com sucesso!' }
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async removePerson(@Param('id') id: string): Promise<IControllerResponse> {
    const result = await this.deletePersonService.execute(id);
    return { data: result, success: true, message: 'Pessoa deletada com sucesso!' }
  }
}
