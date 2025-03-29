import { Product } from '../../../domain/entities/product.entity';
import { ProductOrmEntity } from '../entities/product.orm-entity';

export class ProductMapper {
  static toDomain(entity: ProductOrmEntity): Product {
    return new Product(entity.id, entity.name, Number(entity.price), entity.userId);
  }

  static toOrm(product: Product): ProductOrmEntity {
    const entity = new ProductOrmEntity();
    entity.id = product.id;
    entity.name = product.name;
    entity.price = product.price;
    entity.userId = product.userId;
    return entity;
  }
}
