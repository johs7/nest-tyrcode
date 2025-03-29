import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './application/products.service';
import { ProductsController } from './infraestructure/controllers/products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProductOrmEntity } from './infraestructure/typeorm/entities/product.orm-entity';
import { ProductRepository } from './infraestructure/repositories/product.repository'; 
import { IProductRepository } from './domain/interfaces/product-repository.interface'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductOrmEntity]),
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: ['nats://localhost:4222'],
        },
      },
    ]),
  ],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    {
      provide: 'ProductRepository', 
      useClass: ProductRepository,
    },
  ],
})
export class ProductsModule {}
