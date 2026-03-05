import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { EnvioEntity } from '../../envio/entities/envio.entity';

@Entity({ name: 'clientes' })
export class clienteEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  correo: string;

  @Column()
  telefono: string;

  @OneToMany(() => EnvioEntity, envio => envio.clienteId)
  envios: EnvioEntity[];
}