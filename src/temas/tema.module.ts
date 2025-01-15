import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Temas } from "./entities/tema.entity";
import { TemaController } from "./controllers/tema.controller";
import { TemaService } from "./services/tema.service";


@Module({
    imports: [ TypeOrmModule.forFeature([Temas])],
    controllers: [TemaController],
    providers: [TemaService],
    exports: [TypeOrmModule],

})

export class TemaModule {}