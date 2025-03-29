import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './infraestructure/controllers/users.controller';
import { UsersService } from './application/users.service';
import { UserRepository } from './infraestructure/repositories/user.repository';
import { UserOrmEntity } from './infraestructure/typeorm/entities/user.orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserOrmEntity])],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: 'UserRepository',
      useClass: UserRepository,
    },
  ],
})
export class UsersModule {}
