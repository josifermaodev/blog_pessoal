import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Temas } from "src/temas/entities/tema.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: "tb_postagens"}) //CREATE TABLE tb_postagens()
export class Postagem{

    @PrimaryGeneratedColumn() // id Int Autoincrement Primary key autoincrement
    id: number;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty() // Validação dos dados do objeto
    @Column({length: 100, nullable: false}) //VARCHAR(100) NOT NULL
    titulo: string;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty() // Validação dos dados do objeto
    @Column({length: 1000, nullable: false}) //VARCHAR(1000) NOT NULL
    texto: string;

    @UpdateDateColumn() // Atualiza os dados de data e hora automaticamente
    data: Date;

    @ManyToOne(() => Temas, (tema) => tema.postagem,{
        onDelete: "CASCADE"
    })
    tema: Temas;

    @ManyToOne(() => Temas, (tema) => tema.postagem,{
        onDelete: "CASCADE"
    })
    usuario: Usuario;

}