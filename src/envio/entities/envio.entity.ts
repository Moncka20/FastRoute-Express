import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany
} from 'typeorm';

import { ClienteEntity } from '../../cliente/entities/cliente.entity';
import { ConductorEntity } from '../../conductor/entities/conductor.entity';
import { SucursalEntity } from '../../sucursal/entities/sucursal.entity';
import { PaqueteEntity } from '../../paquete/entities/paquete.entity';

@Entity({name: 'Envio'})
export class EnvioEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP'
  })
  fecha_creacion: Date;

  @Column('decimal', { default: 0 })
  peso: number;

  @Column('decimal', { default: 0 })
  costo_total: number;

  @ManyToOne(() => ClienteEntity, cliente => cliente.envios)
  cliente: ClienteEntity;

  @ManyToOne(() => ConductorEntity, conductor => conductor.envios)
  conductor: ConductorEntity;

  @ManyToOne(() => SucursalEntity, sucursal => sucursal.envios)
  sucursal: SucursalEntity;

  @OneToMany(() => PaqueteEntity, paquete => paquete.envio)
  paquetes: PaqueteEntity[];
}