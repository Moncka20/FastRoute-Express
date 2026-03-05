import { Module } from '@nestjs/common';
import { EnvioService } from './envio.service';
import { EnvioController } from './envio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvioEntity } from './entities/envio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EnvioEntity])],
  controllers: [EnvioController],
  providers: [EnvioService],
})
export class EnvioModule {}