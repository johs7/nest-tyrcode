import { Controller, Post, Body } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from '../../application/users.service';
import { CreateUserDto } from '../../dto/create-user.dto';

@Controller() 
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('CREATE_USER')
  async createUser(@Payload() data: CreateUserDto) {
    return await this.usersService.create(data);
  }

  @MessagePattern('FIND_USER_BY_ID')
async findUserById(@Payload() id: string) {
  console.log('📩 Petición recibida en users-service con ID:', id);
  return await this.usersService.findById(id);
}


  @MessagePattern('FIND_USER_BY_EMAIL')
  async findUserByEmail(@Payload() email: string) {
    return await this.usersService.findByEmail(email);
  }


}
