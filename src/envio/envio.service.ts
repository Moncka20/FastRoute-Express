import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EnvioEntity } from './entities/envio.entity';
import { CreateEnvioDto } from './dto/create-envio.dto';
import { UpdateEnvioDto } from './dto/update-envio.dto';

@Injectable()
export class EnvioService {

  constructor(
    @InjectRepository(EnvioEntity)
    private envioRepository: Repository<EnvioEntity>,
  ) {}

  async create(createEnvioDto: CreateEnvioDto): Promise<EnvioEntity> {
    const envio = this.envioRepository.create({
      costo_total: createEnvioDto.costoTotal,
      fecha_creacion: createEnvioDto.fechaCreacion,
    });

    return this.envioRepository.save(envio);
  }
  async findAll(): Promise<EnvioEntity[]> {
    return await this.envioRepository.find();
  }
  async findOne(id: number): Promise<EnvioEntity> {
    const envio = await this.envioRepository.findOneBy({ id });

    if (!envio) {
      throw new NotFoundException(`Envio con id ${id} no encontrado`);
    }

    return envio;
  }
  async update(id: number, updateEnvioDto: UpdateEnvioDto): Promise<EnvioEntity> {
    const envio = await this.findOne(id);
    Object.assign(envio, updateEnvioDto);
    return await this.envioRepository.save(envio);
  }
  async remove(id: number): Promise<void> {
    await this.envioRepository.delete(id);
  }
}