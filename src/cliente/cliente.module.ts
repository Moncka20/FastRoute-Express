import { Module } from '@nestjs/common';
import { ClientesService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { clienteEntity } from './entities/cliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([clienteEntity])],
  controllers: [ClienteController],
  providers: [ClientesService],
})
export class ClienteModule {}
