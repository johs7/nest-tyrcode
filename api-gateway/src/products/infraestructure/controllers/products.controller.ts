import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Req,
  Param,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CreateProductDto } from '../../dto/createproduct.dto';
import { ProductsService } from 'src/products/application/products.service';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Productos')
@ApiBearerAuth()
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Crear producto (requiere login)' })
  create(@Req() req, @Body() dto: CreateProductDto) {
    console.log('🧾 userId desde token:', req.user.sub);
    return this.productsService.create({
      ...dto,
      userId: req.user.sub,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiOperation({ summary: 'Obtener mis productos (requiere login)' })
  getMyProducts(@Req() req) {
    return this.productsService.getByUserId(req.user.sub);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener productos por ID de usuario' })
  @ApiParam({ name: 'id', description: 'ID del usuario' })
  getByUserId(@Param('id') id: string) {
    return this.productsService.getByUserId(id);
  }
}
