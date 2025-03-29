// src/products/products.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateProductDto } from '../dto/createproduct.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCTS_MS') 
    private readonly productsClient: ClientProxy,
  ) {}

  async create(dto: CreateProductDto) {
    return await firstValueFrom(
      this.productsClient.send('CREATE_PRODUCT', dto),
    );
  }

  async getByUserId(userId: string) {
    return await firstValueFrom(
      this.productsClient.send('GET_PRODUCTS_BY_USER', userId),
    );
  }
}
