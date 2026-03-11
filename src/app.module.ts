import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ClienteModule } from './cliente/cliente.module';
import { ConductorModule } from './conductor/conductor.module';
import { ConfigModule } from '@nestjs/config';
import { EnvioModule } from './envio/envio.module';
import { PaqueteModule } from './paquete/paquete.module';
import { SucursalModule } from './sucursal/sucursal.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    ClienteModule,
    ConductorModule,
    EnvioModule,
    PaqueteModule,
    SucursalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
