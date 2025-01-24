import { TypeOrmModule } from '@nestjs/typeorm';
import { TemaModule } from '../tema/tema.module';
import { PostagemController } from './controllers/postagem.controller';
import { Postagem } from './entities/postagem.entity';
import { TemaService } from '../tema/services/tema.service';
import { PostagemService } from './services/postagem.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Postagem]), TemaModule],
  controllers: [PostagemController],
  providers: [PostagemService, TemaService],
  exports: [TypeOrmModule],
})
export class PostagemModule {}
