export class CreateEnvioPaqueteDto {
    peso: number;
}

export class CreateEnvioDto {
    clienteId: number;
    conductorId: number;
    sucursalId: number;
    fechaCreacion?: Date;
    paquetes: CreateEnvioPaqueteDto[];
}
