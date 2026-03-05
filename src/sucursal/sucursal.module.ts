import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SucursalEntity } from './entities/sucursal.entity';
import { sucursalService } from './sucursal.service';
import { sucursalController } from './sucursal.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SucursalEntity])],
  controllers: [sucursalController],
  providers: [sucursalService],
})
export class SucursalModule {}