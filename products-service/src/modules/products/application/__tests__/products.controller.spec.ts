import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from '../../infraestructure/controllers/products.controller';
import { ProductsService } from '../products.service';
import { CreateProductDto } from '../../dto/create-product.dto';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  const mockService = {
    create: jest.fn(),
    findByUserId: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('debería crear producto vía NATS', async () => {
    const dto: CreateProductDto = {
      name: 'Test',
      price: 100,
      userId: 'uuid-123',
    };

    const product = { ...dto, id: 'uuid-prod' };
    mockService.create.mockResolvedValue(product);

    const result = await controller.create(dto);

    expect(result).toEqual(product);
    expect(mockService.create).toHaveBeenCalledWith(dto);
  });

  it('debería listar productos por userId', async () => {
    const list = [{ id: '1', name: 'X', price: 10, userId: 'abc' }];
    mockService.findByUserId.mockResolvedValue(list);

    const result = await controller.findByUserId('abc');

    expect(result).toEqual(list);
    expect(mockService.findByUserId).toHaveBeenCalledWith('abc');
  });
});
