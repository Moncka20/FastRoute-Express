import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaqueteEntity } from './entities/paquete.entity';
import { EnvioEntity } from '../envio/entities/envio.entity';
import { CreatePaqueteDto } from './dto/create-paquete.dto';
import { UpdatePaqueteDto } from './dto/update-paquete.dto';

@Injectable()
export class PaqueteService {

  constructor(
    @InjectRepository(PaqueteEntity)
    private readonly paqueteRepository: Repository<PaqueteEntity>,

    @InjectRepository(EnvioEntity)
    private readonly envioRepository: Repository<EnvioEntity>,
  ) {}

  async create(createPaqueteDto: CreatePaqueteDto): Promise<PaqueteEntity> {

    if (!createPaqueteDto.peso || !createPaqueteDto.envioId) {
      throw new Error('Peso y envioId son obligatorios');
    }

    const envio = await this.envioRepository.findOneBy({
      id: createPaqueteDto.envioId,
    });

    if (!envio) {
      throw new NotFoundException('Envio no encontrado');
    }

    const paquete = this.paqueteRepository.create({
      peso: createPaqueteDto.peso,
      envio: envio,
    });

    return await this.paqueteRepository.save(paquete);
  }

  async findAll(): Promise<PaqueteEntity[]> {
    return await this.paqueteRepository.find({
      relations: ['envio'],
    });
  }

  async findOne(id: number): Promise<PaqueteEntity> {

    const paquete = await this.paqueteRepository.findOne({
      where: { id },
      relations: ['envio'],
    });

    if (!paquete) {
      throw new NotFoundException('Paquete no encontrado');
    }

    return paquete;
  }

  async update(id: number, updatePaqueteDto: UpdatePaqueteDto): Promise<PaqueteEntity> {

    const paquete = await this.findOne(id);

    Object.assign(paquete, updatePaqueteDto);

    return await this.paqueteRepository.save(paquete);
  }

  async remove(id: number): Promise<PaqueteEntity> {

    const paquete = await this.findOne(id);

    return await this.paqueteRepository.remove(paquete);
  }
}