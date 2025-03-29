import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { Product } from '../domain/entities/product.entity';
import { IProductRepository } from '../domain/interfaces/product-repository.interface';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepo: IProductRepository,

    @Inject('USERS_SERVICE')
    private readonly usersClient: ClientProxy,
  ) {}

  async create(dto: CreateProductDto): Promise<Product> {
    try {
      console.log('📥 DTO recibido en products-service:', dto);

      if (!dto.userId) {
        throw new Error('❌ userId está vacío o no definido en el DTO');
      }

      console.log('🔎 Consultando usuario en users-service con ID:', dto.userId);

      const user = await firstValueFrom(
        this.usersClient.send('FIND_USER_BY_ID', dto.userId),
      );
      console.log('✅ Respuesta de users-service:', user);

      if (!user) {
        console.warn('⚠️ No se encontró el usuario');
        throw new NotFoundException('Usuario no encontrado');
      }

      const product = new Product(
        crypto.randomUUID(),
        dto.name,
        dto.price,
        dto.userId,
      );

      console.log('🛠️ Producto construido correctamente:', product);

      const saved = await this.productRepo.save(product);

      console.log('💾 Producto guardado en DB:', saved);
      return saved;
    } catch (err) {
      console.error('❌ Error al crear producto:', err);
      throw err;
    }
  }

  async findByUserId(userId: string): Promise<Product[]> {
    console.log('📦 Buscando productos del usuario con ID:', userId);
    return this.productRepo.findByUserId(userId);
  }
}
