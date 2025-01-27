import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { Temas } from '../../tema/entities/tema.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_postagens' }) //CREATE TABLE tb_postagens()
export class Postagem {
  @PrimaryGeneratedColumn() // id Int Autoincrement Primary key autoincrement
  @ApiProperty() 
  id: number;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty() // Validação dos dados do objeto
  @Column({ length: 100, nullable: false }) //VARCHAR(100) NOT NULL
  @ApiProperty() 
  titulo: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty() // Validação dos dados do objeto
  @Column({ length: 1000, nullable: false }) //VARCHAR(1000) NOT NULL
  @ApiProperty() 
  texto: string;

  @UpdateDateColumn() // Atualiza os dados de data e hora automaticamente
  @ApiProperty() 
  data: Date;

  @ApiProperty({ type: () => Temas }) 
  @ManyToOne(() => Temas, (tema) => tema.postagem, {
    onDelete: 'CASCADE',
  })
  tema: Temas;

  @ApiProperty({ type: () => Usuario }) 
  @ManyToOne(() => Temas, (tema) => tema.postagem, {
    onDelete: 'CASCADE',
  })
  usuario: Usuario;
}
