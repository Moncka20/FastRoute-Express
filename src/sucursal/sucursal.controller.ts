import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { sucursalService } from './sucursal.service';
import { SucursalEntity } from './entities/sucursal.entity';

@Controller('sucursal')
export class sucursalController {

  constructor(private readonly sucursalService: sucursalService) {}

  @Post()
  create(@Body() data: Partial<SucursalEntity>) {
    return this.sucursalService.create(data);
  }

  @Get()
  findAll() {
    return this.sucursalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.sucursalService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: Partial<SucursalEntity>) {
    return this.sucursalService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.sucursalService.remove(id);
  }
}