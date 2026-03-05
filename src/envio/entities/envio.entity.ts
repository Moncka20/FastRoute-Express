import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { clienteEntity } from '../../cliente/entities/cliente.entity';

@Entity({name: 'envios'})
export class EnvioEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp', name: 'fecha_creacion' })
    fechaCreacion: Date;

  @Column({ type: 'decimal', default: 0 })
  costoTotal: number;
  
  @Column({ type: 'json', nullable: true })
  paquetes: any[];

  @OneToMany(() => clienteEntity, cliente => cliente.envios)
  cliente: clienteEntity;

  @ManyToOne(() => clienteEntity, cliente => cliente.envios)
  clienteId: number;

  @ManyToOne(() => clienteEntity, cliente => cliente.envios)
  envio: EnvioEntity[];
}