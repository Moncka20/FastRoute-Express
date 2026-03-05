import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { EnvioEntity } from '../../envio/entities/envio.entity';

@Entity()
export class PaqueteEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal')
  peso: number;

  @ManyToOne(() => EnvioEntity, envio => envio.paquetes, { onDelete: 'CASCADE' })
  envio: EnvioEntity;
}