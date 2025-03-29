import { ProductsService } from '../products.service';
import { IProductRepository } from '../../domain/interfaces/product-repository.interface';
import { CreateProductDto } from '../../dto/create-product.dto';
import { ClientProxy } from '@nestjs/microservices';
import { of } from 'rxjs';
import { NotFoundException } from '@nestjs/common';

describe('ProductsService', () => {
  let service: ProductsService;
  let mockRepo: jest.Mocked<IProductRepository>;
  let mockClient: jest.Mocked<ClientProxy>;

  beforeEach(() => {
    mockRepo = {
      save: jest.fn(),
      findByUserId: jest.fn(),
    };

    mockClient = {
      send: jest.fn(),
    } as any;

    service = new ProductsService(mockRepo, mockClient);
  });

  it('debería crear un producto si el usuario existe', async () => {
    const dto: CreateProductDto = {
      name: 'Laptop Lenovo',
      price: 999.99,
      userId: 'uuid-123',
    };

    mockClient.send.mockReturnValue(of({ id: dto.userId }));
    mockRepo.save.mockImplementation(async (product) => product);

    const result = await service.create(dto);

    expect(mockClient.send).toHaveBeenCalledWith('FIND_USER_BY_ID', dto.userId);
    expect(mockRepo.save).toHaveBeenCalled();
    expect(result.name).toBe(dto.name);
  });

  it('debería lanzar error si el usuario no existe', async () => {
    const dto: CreateProductDto = {
      name: 'Laptop',
      price: 1000,
      userId: 'invalid-id',
    };

    mockClient.send.mockReturnValue(of(null));

    await expect(service.create(dto)).rejects.toThrow(NotFoundException);
  });

  it('debería retornar productos por userId', async () => {
    const products = [
      { id: '1', name: 'Producto 1', price: 50, userId: 'uuid' },
      { id: '2', name: 'Producto 2', price: 75, userId: 'uuid' },
    ];

    mockRepo.findByUserId.mockResolvedValue(products);

    const result = await service.findByUserId('uuid');

    expect(result).toEqual(products);
    expect(mockRepo.findByUserId).toHaveBeenCalledWith('uuid');
  });
});
