import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProductsController } from './infraestructure/controllers/products.controller';
import { ProductsService } from './application/products.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PRODUCTS_MS',
        transport: Transport.NATS,
        options: {
          servers: ['nats://localhost:4222'],
        },
      },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService], 
})
export class ProductsModule {}
