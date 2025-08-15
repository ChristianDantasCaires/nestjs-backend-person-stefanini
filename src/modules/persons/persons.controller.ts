import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UsePipes } from '@nestjs/common';
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
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PersonSwaggerDTO } from './dtos/person-swagger.dto';
import { createPersonV2Schema, type ICreatePersonV2DTO } from './dtos/create-person-v2.dto';

@ApiTags('Pessoas')
@ApiBearerAuth()
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
  @HttpCode(201)
  @ApiOperation({ summary: 'Cria uma nova pessoa' })
  @ApiBody({ type: PersonSwaggerDTO })
  @ApiResponse({ status: 201, description: 'Pessoa criada com sucesso', type: PersonSwaggerDTO })
  async createPerson(@Body() createPersonDTO: ICreatePersonDTO): Promise<IControllerResponse> {
    const result = await this.createPersonService.execute(createPersonDTO);
    return { data: result, success: true, message: '' }
  }

  @UseGuards(AuthGuard)
  @Post('/create/v2')
  @UsePipes(new ZodValidationPipe(createPersonV2Schema))
  @HttpCode(201)
  @ApiOperation({ summary: 'Cria uma nova pessoa (endereço obrigatório)' })
  @ApiBody({ type: PersonSwaggerDTO })
  @ApiResponse({ status: 201, description: 'Pessoa criada com sucesso', type: PersonSwaggerDTO })
  async createPersonV2(@Body() createPersonDTO: ICreatePersonV2DTO): Promise<IControllerResponse> {
    const result = await this.createPersonService.execute(createPersonDTO);
    return { data: result, success: true, message: '' }
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Retorna todas as pessoas' })
  @ApiResponse({ status: 200, description: 'Lista de pessoas', type: [PersonSwaggerDTO] })
  async findAllPersons(): Promise<IControllerResponse> {
    const result = await this.findAllPersonsService.execute();
    return { data: result, success: true, message: '' }
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Retorna uma pessoa pelo ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID da pessoa' })
  @ApiResponse({ status: 200, description: 'Pessoa encontrada', type: PersonSwaggerDTO })
  async findOnePerson(@Param('id') id: string): Promise<IControllerResponse> {
    const result = await this.findOnePersonsService.execute(id);
    return { data: result, success: true, message: '' }
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Atualiza uma pessoa pelo ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID da pessoa' })
  @ApiBody({ type: PersonSwaggerDTO })
  @ApiResponse({ status: 200, description: 'Pessoa atualizada', type: PersonSwaggerDTO })
  async updatePerson(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updatePersonSchema)) updatePersonDto: IUpdatePersonDTO
  ): Promise<IControllerResponse> {
    const result = await this.updatePersonService.execute(id, updatePersonDto);
    return { data: result, success: true, message: 'Pessoa atualizada com sucesso!' }
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Deleta uma pessoa pelo ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID da pessoa' })
  @ApiResponse({ status: 200, description: 'Pessoa deletada com sucesso' })
  async removePerson(@Param('id') id: string): Promise<IControllerResponse> {
    const result = await this.deletePersonService.execute(id);
    return { data: result, success: true, message: 'Pessoa deletada com sucesso!' }
  }
}
