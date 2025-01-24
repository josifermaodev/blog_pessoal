import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TemaService } from '../services/tema.service';
import { Temas } from '../entities/tema.entity';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';

// Declaração de um controlador que gerencia endpoints relacionados à entidade "Tema".
@UseGuards(JwtAuthGuard)
@Controller('/temas')
export class TemaController {
  // Construtor da classe, que injeta a dependência do serviço TemaService para manipulação de dados.
  constructor(
    private readonly temaService: TemaService, // Define que o TemaService será usado nesta classe.
  ) {}

  // Define o endpoint HTTP GET na raiz ("/"), para buscar todos os temas.
  @Get()
  @HttpCode(HttpStatus.OK) // Retorna o status HTTP 200 (OK) se a requisição for bem-sucedida.
  findAll(): Promise<Temas[]> {
    return this.temaService.findAll(); // Chama o método "findAll" do serviço para obter todos os temas.
  }

  // Define o endpoint HTTP GET com parâmetro de rota ":id" para buscar um tema específico pelo ID.
  @Get('/:id')
  @HttpCode(HttpStatus.OK) // Retorna o status HTTP 200 (OK) se a requisição for bem-sucedida.
  findById(@Param('id', ParseIntPipe) id: number): Promise<Temas> {
    // O "ParseIntPipe" converte o parâmetro ID de string para número.
    return this.temaService.findById(id); // Chama o método "findById" do serviço para buscar o tema pelo ID.
  }

  // Define o endpoint HTTP GET com parâmetro de rota "/descricao/:descricao" para buscar temas por descrição.
  @Get('/descricao/:descricao')
  @HttpCode(HttpStatus.OK) // Retorna o status HTTP 200 (OK) se a requisição for bem-sucedida.
  findByDescricao(@Param('descricao') descricao: string): Promise<Temas[]> {
    return this.temaService.findByDescricao(descricao); // Busca temas que correspondem à descrição fornecida.
  }

  // Define o endpoint HTTP POST para criar um novo tema.
  @Post()
  @HttpCode(HttpStatus.CREATED) // Retorna o status HTTP 201 (Created) se a requisição for bem-sucedida.
  create(@Body() tema: Temas): Promise<Temas> {
    // O decorador @Body() extrai o corpo da requisição (dados do tema).
    return this.temaService.create(tema); // Chama o método "create" do serviço para salvar o novo tema.
  }

  // Define o endpoint HTTP PUT para atualizar um tema existente.
  @Put()
  @HttpCode(HttpStatus.OK) // Retorna o status HTTP 200 (OK) se a requisição for bem-sucedida.
  update(@Body() tema: Temas): Promise<Temas> {
    // O decorador @Body() extrai o corpo da requisição (dados do tema a ser atualizado).
    return this.temaService.update(tema); // Chama o método "update" do serviço para atualizar o tema.
  }

  // Define o endpoint HTTP DELETE com parâmetro de rota ":id" para deletar um tema específico pelo ID.
  @Delete('/:id')
  @HttpCode(HttpStatus.OK) // Retorna o status HTTP 204 (NO_CONTENT) se a requisição for bem-sucedida.
  delete(@Param('id', ParseIntPipe) id: number) {
    // O "ParseIntPipe" converte o parâmetro ID de string para número.
    return this.temaService.delete(id); // Chama o método "delete" do serviço para remover o tema pelo ID.
  }
}
