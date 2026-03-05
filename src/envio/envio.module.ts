import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvioEntity } from './entities/envio.entity';
import { EnvioService } from './envio.service';
import { envioController } from './envio.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EnvioEntity])],
  controllers: [envioController],
  providers: [EnvioService],
})
export class EnvioModule {}