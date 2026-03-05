import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { EnvioEntity } from '../../envio/entities/envio.entity';

@Entity({name: 'Conductor'})
export class ConductorEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  licencia: string;

  @Column()
  telefono: string;

  @OneToMany(() => EnvioEntity, envio => envio.conductor)
  envios: EnvioEntity[];
}