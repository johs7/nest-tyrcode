import { Injectable, ConflictException, NotFoundException, Inject } from '@nestjs/common';
import { IUserRepository } from '../domain/interfaces/user-repository.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Role } from '../domain/enum/role.enum';
import { User } from '../domain/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UserRepository') 
    private readonly userRepository: IUserRepository,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, role } = createUserDto;

    const existing = await this.userRepository.findByEmail(email);
    if (existing) {
      throw new ConflictException('El email ya está registrado.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User(
      crypto.randomUUID(),
      email,
      hashedPassword,
      role || Role.USER,
      new Date(),
    );

    return await this.userRepository.save(user);
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException(`Usuario con email ${email} no encontrado.`);
    }
    return user;
  }
  
}
