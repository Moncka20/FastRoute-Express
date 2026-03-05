import { PartialType } from '@nestjs/mapped-types';
import { CreateSucursalDto } from './create-sucursal.dto';

export class UpdateSucursalDto extends PartialType(CreateSucursalDto) {
    nombre?: string | undefined;
    direccion?: string | undefined;
    ciudad?: string | undefined;
}
