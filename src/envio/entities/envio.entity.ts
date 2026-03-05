import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
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

  @Column({ nullable: true })
  sucursalOrigen: string;

  @Column({ nullable: true })
  sucursalDestino: string;

  @ManyToOne(() => clienteEntity, cliente => cliente.envios)
  clienteId: number;
}