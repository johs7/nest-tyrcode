import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from 'src/products/infraestructure/controllers/products.controller';
import { ProductsService } from 'src/products/application/products.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: {
            create: jest.fn(),
            getByUserId: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });
});
