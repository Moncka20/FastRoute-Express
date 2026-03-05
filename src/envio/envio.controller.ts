import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { EnvioService } from './envio.service';
import { CreateEnvioDto } from './dto/create-envio.dto';
import { UpdateEnvioDto } from './dto/update-envio.dto';

@Controller('envios')
export class EnvioController {

  constructor(private readonly envioService: EnvioService) {}

  @Post()
  create(@Body() createEnvioDto: CreateEnvioDto) {
    return this.envioService.create(createEnvioDto);
  }

  @Get()
  findAll() {
    return this.envioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.envioService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateEnvioDto: UpdateEnvioDto,
  ) {
    return this.envioService.update(id, updateEnvioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.envioService.remove(id);
  }
  @Get(':id/detalles')
  detalles(@Param('id') id: number) {
    return this.envioService.detalles(id);
  }
}