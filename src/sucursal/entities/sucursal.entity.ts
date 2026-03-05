import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { EnvioEntity } from "../../envio/entities/envio.entity";

@Entity()
export class SucursalEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  direccion: string;

  @Column()
  ciudad: string;

  @OneToMany(() => EnvioEntity, (envio) => envio.sucursalOrigen)
  envios: EnvioEntity[];
}