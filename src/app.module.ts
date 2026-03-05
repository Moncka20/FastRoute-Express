import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ClienteModule } from './cliente/cliente.module';
import { ConductorModule } from './conductor/conductor.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConductorEntity } from './conductor/entities/conductor.entity';
import { clienteEntity } from './cliente/entities/cliente.entity';
import { EnvioEntity } from './envio/entities/envio.entity';
import { EnvioModule } from './envio/envio.module';
import { PaqueteModule } from './paquete/paquete.module';
import { PaqueteEntity } from './paquete/entities/paquete.entity';
import { SucursalModule } from './sucursal/sucursal.module';
import { SucursalEntity } from './sucursal/entities/sucursal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ConductorEntity, clienteEntity, EnvioEntity, PaqueteEntity, SucursalEntity]),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),DatabaseModule, ClienteModule, ConductorModule, EnvioModule, PaqueteModule, SucursalModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
