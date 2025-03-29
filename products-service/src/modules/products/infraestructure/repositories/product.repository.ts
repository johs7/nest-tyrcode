import { Injectable } from '@nestjs/common';
import { IProductRepository } from '../../domain/interfaces/product-repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductOrmEntity } from '../typeorm/entities/product.orm-entity';
import { Product } from '../../domain/entities/product.entity';
import { ProductMapper } from '../typeorm/mappers/product.mapper';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(
    @InjectRepository(ProductOrmEntity)
    private readonly repo: Repository<ProductOrmEntity>,
  ) {}

  async save(product: Product): Promise<Product> {
    const orm = ProductMapper.toOrm(product);
    const saved = await this.repo.save(orm);
    return ProductMapper.toDomain(saved);
  }

  async findByUserId(userId: string): Promise<Product[]> {
    const list = await this.repo.find({ where: { userId } });
    return list.map(ProductMapper.toDomain);
  }
}
