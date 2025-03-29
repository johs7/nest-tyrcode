import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../../infraestructure/controllers/users.controller';
import { UsersService } from '../users.service';
import { CreateUserDto } from '../../dto/create-user.dto';
import { Role } from '../../domain/enum/role.enum';
describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockService = {
    create: jest.fn(),
    findById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('debería crear un usuario', async () => {
    const dto: CreateUserDto = {
      email: 'test@mail.com',
      password: '123456',
      role: Role.USER,
    };

    const createdUser = { ...dto, id: 'uuid', createdAt: new Date() };
    mockService.create.mockResolvedValue(createdUser);

    const result = await controller.createUser(dto);

    expect(result).toEqual(createdUser);
    expect(mockService.create).toHaveBeenCalledWith(dto);
  });

  it('debería obtener un usuario por ID', async () => {
    const id = 'abc-123';
    const user = { id, email: 'user@mail.com', password: 'hashed', role: Role.USER, createdAt: new Date() };

    mockService.findById.mockResolvedValue(user);

    const result = await controller.findUserById(id);

    expect(result).toEqual(user);
    expect(mockService.findById).toHaveBeenCalledWith(id);
  });
});
