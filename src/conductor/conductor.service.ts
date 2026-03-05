import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConductorEntity } from './entities/conductor.entity';
import { CreateConductorDto } from './dto/create-conductor.dto';
import { UpdateConductorDto } from './dto/update-conductor.dto';

@Injectable()
export class ConductorService {

  constructor(
    @InjectRepository(ConductorEntity)
    private readonly conductorRepository: Repository<ConductorEntity>,
  ) {}

  async create(createConductorDto: CreateConductorDto): Promise<ConductorEntity> {

    if (!createConductorDto.nombre ||
        !createConductorDto.licencia ||
        !createConductorDto.telefono) {
      throw new Error('Todos los campos son obligatorios');
    }

    const conductor = this.conductorRepository.create(createConductorDto);

    return await this.conductorRepository.save(conductor);
  }

  async findAll(): Promise<ConductorEntity[]> {
    return await this.conductorRepository.find();
  }

  async findOne(id: number): Promise<ConductorEntity> {

    const conductor = await this.conductorRepository.findOneBy({ id });

    if (!conductor) {
      throw new NotFoundException('Conductor no encontrado');
    }

    return conductor;
  }

  async update(id: number, updateConductorDto: UpdateConductorDto): Promise<ConductorEntity> {

    const conductor = await this.findOne(id);

    Object.assign(conductor, updateConductorDto);

    return await this.conductorRepository.save(conductor);
  }

  async remove(id: number): Promise<ConductorEntity> {

    const conductor = await this.findOne(id);

    return await this.conductorRepository.remove(conductor);
  }
}