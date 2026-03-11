import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Repository } from 'typeorm';
import { ClienteEntity } from './entities/cliente.entity';

@Injectable()
export class ClientesService {
    constructor(
        @InjectRepository(ClienteEntity)
        private readonly clienteRepository: Repository<ClienteEntity>,
    ) { }


    async findAll(): Promise<ClienteEntity[]> {
        const clientes =  await this.clienteRepository.find();
        return clientes;
    }

    async findOne(id: number): Promise<ClienteEntity> {
        const cliente = await this.clienteRepository.findOne(
            {
                where: { id },
                relations: ['envios'],
            }
        );
        if (!cliente) {
            throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
        }
        return cliente;
    }

    async create(createClienteDto: CreateClienteDto): Promise<ClienteEntity> {
        const cliente = this.clienteRepository.create({
            nombre: createClienteDto.nombre,
            correo: createClienteDto.correo,
            telefono: createClienteDto.telefono,
        });
        return await this.clienteRepository.save(cliente);
    }

        async update(id: number, updateClienteDto: UpdateClienteDto): Promise<ClienteEntity>{
            const cliente = await this.clienteRepository.findOneBy({ id });

            if (!cliente) {
                throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
            }

            Object.assign(cliente, updateClienteDto);

            return await this.clienteRepository.save(cliente);
    }

    async delete(id: number): Promise<void> {
        const result = await this.clienteRepository.delete(id);
        if (result.affected === 0) {  
            throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
        }
        console.log('el cliente con id:',id ,' fue eliminado') 
    }
}
