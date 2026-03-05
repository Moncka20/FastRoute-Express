import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaqueteService } from './paquete.service';
import { PaqueteController } from './paquete.controller';
import { PaqueteEntity } from './entities/paquete.entity';
import { EnvioEntity } from '../envio/entities/envio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaqueteEntity, EnvioEntity])],
  controllers: [PaqueteController],
  providers: [PaqueteService],
})
export class PaqueteModule {}
