import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { EnvioEntity } from '../../envio/entities/envio.entity';

@Entity( {name : 'Cliente'})
export class ClienteEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  correo: string;

  @Column()
  telefono: string;

  @OneToMany(() => EnvioEntity, envio => envio.cliente)
  envios: EnvioEntity[];
}