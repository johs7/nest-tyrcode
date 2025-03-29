import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    example: 'Monitor LG UltraWide',
    description: 'Nombre del producto',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 129.99,
    description: 'Precio del producto (mayor a 0)',
  })Q
  @IsNumber()
  @Min(0.01)
  price: number;

  userId?: string;
}
