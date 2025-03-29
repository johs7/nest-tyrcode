
import { IsEmail, MinLength, IsEnum } from 'class-validator';
import { Role } from '../domain/enum/role.enum';

export class CreateUserDto {
  @IsEmail({}, { message: 'Correo inválido' })
  email: string;

  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  @IsEnum(Role, { message: 'Rol inválido' })
  role: Role;
}
