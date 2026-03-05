import { PartialType } from '@nestjs/mapped-types';
import { CreateClienteDto } from './create-cliente.dto';

export class UpdateClienteDto extends PartialType(CreateClienteDto) {
    id: number;
    nombre?: string | undefined;
    correo?: string | undefined;
    telefono?: string | undefined;
}
