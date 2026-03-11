import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { EnvioEntity } from './entities/envio.entity';
import { CreateEnvioDto } from './dto/create-envio.dto';
import { UpdateEnvioDto } from './dto/update-envio.dto';
import { ClienteEntity } from '../cliente/entities/cliente.entity';
import { ConductorEntity } from '../conductor/entities/conductor.entity';
import { SucursalEntity } from '../sucursal/entities/sucursal.entity';
import { PaqueteEntity } from '../paquete/entities/paquete.entity';

@Injectable()
export class EnvioService {

  private readonly TARIFA_POR_KILO = 100;

  constructor(
    @InjectRepository(EnvioEntity)
    private envioRepository: Repository<EnvioEntity>,
    @InjectRepository(ClienteEntity)
    private clienteRepository: Repository<ClienteEntity>,
    @InjectRepository(ConductorEntity)
    private conductorRepository: Repository<ConductorEntity>,
    @InjectRepository(SucursalEntity)
    private sucursalRepository: Repository<SucursalEntity>,
    @InjectRepository(PaqueteEntity)
    private paqueteRepository: Repository<PaqueteEntity>,
  ) {}

  async create(createEnvioDto: CreateEnvioDto): Promise<EnvioEntity> {

    const cliente = await this.clienteRepository.findOneBy({ id: createEnvioDto.clienteId });
    if (!cliente) {
      throw new NotFoundException(`Cliente con id ${createEnvioDto.clienteId} no encontrado`);
    }

    const conductor = await this.conductorRepository.findOneBy({ id: createEnvioDto.conductorId });
    if (!conductor) {
      throw new NotFoundException(`Conductor con id ${createEnvioDto.conductorId} no encontrado`);
    }

    const sucursal = await this.sucursalRepository.findOneBy({ id: createEnvioDto.sucursalId });
    if (!sucursal) {
      throw new NotFoundException(`Sucursal con id ${createEnvioDto.sucursalId} no encontrada`);
    }

    const paqueteIds = createEnvioDto.paqueteIds || [];

    if (paqueteIds.length === 0) {
      throw new BadRequestException('Debe seleccionar al menos un paquete');
    }

    const paquetes = await this.paqueteRepository.find({
      where: { id: In(paqueteIds) },
      relations: ['envio'],
    });

    if (paquetes.length !== paqueteIds.length) {
      throw new NotFoundException('Uno o más paquetes no existen');
    }

    const paquetesAsignados = paquetes.filter((paquete) => paquete.envio);

    if (paquetesAsignados.length > 0) {
      throw new BadRequestException('Uno o más paquetes ya están asociados a un envío');
    }

    const pesoTotal = paquetes.reduce((total, paquete) => {
      return total + Number(paquete.peso || 0);
    }, 0);

    const costoTotal = pesoTotal * this.TARIFA_POR_KILO;

    const envio = this.envioRepository.create({
      peso: pesoTotal,
      costo_total: costoTotal,
      fecha_creacion: createEnvioDto.fechaCreacion || new Date(),
      cliente,
      conductor,
      sucursal,
    });

    const envioGuardado = await this.envioRepository.save(envio);

    const paquetesActualizados = paquetes.map((paquete) => {
      paquete.envio = envioGuardado;
      return paquete;
    });

    await this.paqueteRepository.save(paquetesActualizados);

    return this.detalles(envioGuardado.id);
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
  async detalles(id: number): Promise<EnvioEntity> {
    const envio = await this.envioRepository.findOne({
      where: { id },
      relations: ['cliente', 'conductor', 'sucursal', 'paquetes'],
    });
    if (!envio) {
      throw new NotFoundException(`Envio con id ${id} no encontrado`);
    }
    return envio;
  }
}