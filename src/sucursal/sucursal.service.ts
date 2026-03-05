import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SucursalEntity } from './entities/sucursal.entity';

@Injectable()
export class sucursalService {

  constructor(
    @InjectRepository(SucursalEntity)
    private sucursalRepository: Repository<SucursalEntity>,
  ) {}

  create(data: Partial<SucursalEntity>) {
    const sucursal = this.sucursalRepository.create(data);
    return this.sucursalRepository.save(sucursal);
  }

  findAll() {
    return this.sucursalRepository.find();
  }

  findOne(id: number) {
    return this.sucursalRepository.findOneBy({ id });
  }

  update(id: number, data: Partial<SucursalEntity>) {
    return this.sucursalRepository.update(id, data);
  }

  remove(id: number) {
    return this.sucursalRepository.delete(id);
  }
}