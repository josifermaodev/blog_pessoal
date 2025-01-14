import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Postagem } from "../entities/postagem.entity";
import { DeleteResult, ILike, Repository } from "typeorm";

@Injectable()
export class PostagemService{

    constructor(
        @InjectRepository(Postagem)
        private postagemRepository: Repository<Postagem>
    ){}

    async findAll(): Promise<Postagem[]> {
        return await this.postagemRepository.find(); // SELECT * FROM tb_postagem;
    }

    // SELECT * FROM tb_postagens WHERE id = ?;
    async findById(id: number): Promise<Postagem> {
       let postagem = await this.postagemRepository.findOne({
        where: {
            id
        }
       });

       if (!postagem)
        throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);

       return postagem;
    }

    async findByTitulo(titulo: string): Promise<Postagem[]> {
        return await this.postagemRepository.find({
            where:{
                titulo: ILike(`%${titulo}%`) // ILike - insensitivo, vai ignorar o banco de dados
            }
        })
    }

    async create(postagem: Postagem): Promise<Postagem> {
        return await this.postagemRepository.save(postagem); // INSERT INTO tb_postagem (titulo, texto, data) VALUES (?,?)
    }

    async update(postagem: Postagem): Promise<Postagem> {
        await this.findById(postagem.id)

        //UPDATE tb_postagens SET titulo = ?, texto = ? WHERE id = postagem.id
        return await this.postagemRepository.save(postagem);
    }

    async delete(id: number): Promise<DeleteResult> {
        await this.findById(id);

        return await this.postagemRepository.delete(id);
    }
}


