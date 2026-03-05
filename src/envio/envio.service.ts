import { Injectable } from '@nestjs/common';
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

  create(createEnvioDto: CreateEnvioDto) {
    const envio = this.envioRepository.create(createEnvioDto);
    return this.envioRepository.save(envio);
  }

  findAll() {
    return this.envioRepository.find();
  }

  findOne(id: number) {
    return this.envioRepository.findOneBy({ id });
  }

  update(id: number, updateEnvioDto: UpdateEnvioDto) {
    return this.envioRepository.update(id, updateEnvioDto);
  }

  remove(id: number) {
    return this.envioRepository.delete(id);
  }
}