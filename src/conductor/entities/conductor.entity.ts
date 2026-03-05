import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({name: 'conductores'})
export class ConductorEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  licencia: string;

  @Column()
  telefono: string;
}