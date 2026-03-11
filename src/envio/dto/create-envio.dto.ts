export class CreateEnvioDto {
    clienteId: number;
    conductorId: number;
    sucursalId: number;
    fechaCreacion?: Date;
    paqueteIds: number[];
}
