import { Module } from '@nestjs/common';
import { PaqueteService } from './paquete.service';
import { PaqueteController } from './paquete.controller';

@Module({
  controllers: [PaqueteController],
  providers: [PaqueteService],
})
export class PaqueteModule {}
