import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { EnvioEntity } from '../../envio/entities/envio.entity';

@Entity({name: 'Paquete'})
export class PaqueteEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal')
  peso: number;

  @ManyToOne(() => EnvioEntity, envio => envio.paquetes)
  envio: EnvioEntity;
}