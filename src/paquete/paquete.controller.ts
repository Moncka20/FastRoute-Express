import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { PaqueteService } from './paquete.service';
import { CreatePaqueteDto } from './dto/create-paquete.dto';
import { UpdatePaqueteDto } from './dto/update-paquete.dto';

@Controller('paquete')
export class PaqueteController {

  constructor(private readonly paqueteService: PaqueteService) {}

  @Post()
  async create(@Body() createPaqueteDto: CreatePaqueteDto) {
    return await this.paqueteService.create(createPaqueteDto);
  }

  @Get()
  async findAll() {
    return await this.paqueteService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.paqueteService.findOne(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePaqueteDto: UpdatePaqueteDto,
  ) {
    return await this.paqueteService.update(+id, updatePaqueteDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.paqueteService.remove(+id);
  }
}