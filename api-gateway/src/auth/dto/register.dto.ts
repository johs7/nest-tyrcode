import { IsEmail, MinLength, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../domain/enums/role.enum';



export class RegisterDto {
  @ApiProperty({
    example: 'usuario@email.com',
    description: 'Correo electrónico único del usuario',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'Contraseña del usuario (mínimo 6 caracteres)',
  })
  @MinLength(6)
  password: string;

  @ApiProperty({
    enum: Role,
    example: Role.USER,
    description: 'Rol del usuario (admin o user)',
  })
  @IsEnum(Role)
  role: Role;
}
