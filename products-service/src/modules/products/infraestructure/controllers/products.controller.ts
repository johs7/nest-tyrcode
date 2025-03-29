import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateProductDto } from '../../dto/create-product.dto';
import { ProductsService } from '../../application/products.service';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern('CREATE_PRODUCT')
  create(@Payload() data: CreateProductDto) {
    return this.productsService.create(data);
  }

  @MessagePattern('GET_PRODUCTS_BY_USER')
  findByUserId(@Payload() userId: string) {
    return this.productsService.findByUserId(userId);
  }
}
