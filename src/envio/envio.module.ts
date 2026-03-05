import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvioEntity } from './entities/envio.entity';
import { EnvioService } from './envio.service';
import { EnvioController } from './envio.controller';
import { ClienteEntity } from '../cliente/entities/cliente.entity';
import { ConductorEntity } from '../conductor/entities/conductor.entity';
import { SucursalEntity } from '../sucursal/entities/sucursal.entity';
import { PaqueteEntity } from '../paquete/entities/paquete.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EnvioEntity, ClienteEntity, ConductorEntity, SucursalEntity, PaqueteEntity])],
  controllers: [EnvioController],
  providers: [EnvioService],
})
export class EnvioModule {}