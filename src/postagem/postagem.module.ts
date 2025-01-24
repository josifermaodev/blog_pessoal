import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Postagem } from "./entities/postagem.entity";
import { PostagemController } from "./controllers/postagem.controller";
import { PostagemService } from "./services/postagem.service";
import { TemaService } from "../temas/services/tema.service";
import { TemaModule } from "../temas/tema.module";


@Module({
    imports: [ TypeOrmModule.forFeature([Postagem]), TemaModule],
    controllers: [PostagemController],
    providers: [PostagemService, TemaService],
    exports: [TypeOrmModule],

})

export class PostagemModule {}