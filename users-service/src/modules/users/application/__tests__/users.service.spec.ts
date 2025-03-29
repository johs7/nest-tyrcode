import { UsersService } from '../users.service';
import { IUserRepository } from '../../domain/interfaces/user-repository.interface';
import { Role } from '../../domain/enum/role.enum';
import { CreateUserDto } from '../../dto/create-user.dto';
import { ConflictException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  let mockRepository: jest.Mocked<IUserRepository>;

  beforeEach(() => {
    mockRepository = {
      findByEmail: jest.fn(),
      findById: jest.fn(),
      save: jest.fn(),
    };

    service = new UsersService(mockRepository);
  });

  it('debería crear un usuario si el email no existe', async () => {
    const dto: CreateUserDto = {
      email: 'nuevo@correo.com',
      password: '123456',
      role: Role.USER,
    };

    mockRepository.findByEmail.mockResolvedValue(null);
    mockRepository.save.mockImplementation(async (user) => user);

    const user = await service.create(dto);

    expect(user.email).toBe(dto.email);
    expect(user.password).not.toBe(dto.password); 
    expect(mockRepository.save).toHaveBeenCalled();
  });

  it('debería lanzar error si el email ya existe', async () => {
    const dto: CreateUserDto = {
      email: 'existe@correo.com',
      password: '123456',
      role: Role.USER,
    };

    mockRepository.findByEmail.mockResolvedValue({ email: dto.email } as any);

    await expect(service.create(dto)).rejects.toThrow(ConflictException);
  });
});
