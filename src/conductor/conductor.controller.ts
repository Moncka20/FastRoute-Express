import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ConductorService } from './conductor.service';
import { CreateConductorDto } from './dto/create-conductor.dto';
import { UpdateConductorDto } from './dto/update-conductor.dto';

@Controller('conductor')
export class ConductorController {

  constructor(private readonly conductorService: ConductorService) {}

  @Post()
  async create(@Body() createConductorDto: CreateConductorDto) {
    return await this.conductorService.create(createConductorDto);
  }

  @Get()
  async findAll() {
    return await this.conductorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.conductorService.findOne(+id);
  }

  @Patch(':id')
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateConductorDto: UpdateConductorDto,
  ) {
    return await this.conductorService.update(+id, updateConductorDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.conductorService.remove(+id);
  }
}