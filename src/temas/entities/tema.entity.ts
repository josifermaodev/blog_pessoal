import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


// Marca a classe como uma entidade do TypeORM e define o nome da tabela como "tb_temas".
@Entity({name:"tb_temas"})
export class Temas {
    
    // Define a coluna "id" como chave primária e com incremento automático.
    @PrimaryGeneratedColumn() // Cria a coluna "id" como INT AUTOINCREMENT PRIMARY KEY.
    id: number;

    // Transforma o valor recebido, removendo espaços extras ao redor do texto.
    @Transform(({ value }: TransformFnParams) => value?.trim()) // Remove espaços antes e depois do valor.
    @IsNotEmpty() // Validação para garantir que o campo não está vazio
    @Column({ length: 100, nullable: false }) // Cria a coluna "descricao" como VARCHAR(100) NOT NULL.
    descricao: string;
}