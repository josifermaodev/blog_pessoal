import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Temas } from "../entities/tema.entity";

// Marca a classe como um serviço que pode ser injetado em outras partes da aplicação.
@Injectable()
export class TemaService {
    // Construtor que injeta o repositório da entidade "Temas" no serviço.
    constructor(
        @InjectRepository(Temas) // Injeta o repositório da entidade "Temas" usando TypeORM.
        private temaRepository: Repository<Temas> // Repositório para manipulação de dados da entidade "Temas".
    ) {}

    // Método para buscar todos os registros de temas no banco de dados.
    async findAll(): Promise<Temas[]> {
        return await this.temaRepository.find(); // Usa o método "find" do TypeORM para retornar todos os temas.
    }

    // Método para buscar um tema pelo ID.
    async findById(id: number): Promise<Temas> {
        let tema = await this.temaRepository.findOne({
            where: {
                id // Especifica a condição de busca: ID igual ao fornecido.
            }
        });

        // Se nenhum tema for encontrado, lança uma exceção com status HTTP 404 (Not Found).
        if (!tema)
            throw new HttpException('Tema não encontrado!', HttpStatus.NOT_FOUND);

        return tema; // Retorna o tema encontrado.
    }

    // Método para buscar temas que contêm uma descrição parcial (filtro por descrição).
    async findByDescricao(descricao: string): Promise<Temas[]> {
        return await this.temaRepository.find({
            where: {
                descricao: ILike(`%${descricao}%`) // Usa ILike para buscas insensíveis a maiúsculas/minúsculas.
            }
        });
    }

    // Método para criar um novo tema.
    async create(tema: Temas): Promise<Temas> {
        return await this.temaRepository.save(tema); // Salva o novo tema no banco de dados.
    }

    // Método para atualizar um tema existente.
    async update(tema: Temas): Promise<Temas> {
        await this.findById(tema.id); // Verifica se o tema existe antes de tentar atualizá-lo.

        return await this.temaRepository.save(tema); // Atualiza o tema no banco de dados.
    }

    // Método para deletar um tema pelo ID.
    async delete(id: number): Promise<DeleteResult> {
        await this.findById(id); // Verifica se o tema existe antes de tentar deletá-lo.

        return await this.temaRepository.delete(id); // Remove o tema do banco de dados.
    }
}