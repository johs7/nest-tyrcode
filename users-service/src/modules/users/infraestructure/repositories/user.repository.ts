import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserOrmEntity } from '../typeorm/entities/user.orm-entity';
import { IUserRepository } from '../../domain/interfaces/user-repository.interface';
import { UserMapper } from '../typeorm/mappers/user.mapper';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly repo: Repository<UserOrmEntity>,
  ) {}

  async findByEmail(email: string) {
    return await this.repo.findOne({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    const ormUser = await this.repo.findOne({ where: { id } });
    return ormUser ? UserMapper.toDomain(ormUser) : null;
  }
  
  async save(user: User): Promise<User> {
    const ormUser = UserMapper.toOrm(user);
    const saved = await this.repo.save(ormUser);
    return UserMapper.toDomain(saved);
  }
}
