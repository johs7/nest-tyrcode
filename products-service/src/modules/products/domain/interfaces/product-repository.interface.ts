import { Product } from '../entities/product.entity';

export interface IProductRepository {
  save(product: Product): Promise<Product>;
  findByUserId(userId: string): Promise<Product[]>;
}
