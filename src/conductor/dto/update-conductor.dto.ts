import { PartialType } from '@nestjs/mapped-types';
import { CreateConductorDto } from './create-conductor.dto';

export class UpdateConductorDto extends PartialType(CreateConductorDto) {
    nombre?: string | undefined;
    licencia?: string | undefined;
    telefono?: string | undefined;
}
