import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  HttpStatus,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
} from "@nestjs/swagger";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Product } from "./entities/product.entity";

@ApiTags("products")
@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: "Создать новый товар" })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Товар успешно создан",
    type: Product,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Неверные данные",
  })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: "Получить все товары" })
  @ApiQuery({
    name: "category",
    required: false,
    description: "Фильтр по категории товара",
    example: "Рулонная трава",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Список товаров успешно получен",
    type: [Product],
  })
  findAll(@Query("category") category?: string) {
    return this.productsService.findAll(category);
  }

  @Get(":id")
  @ApiOperation({ summary: "Получить товар по ID" })
  @ApiParam({
    name: "id",
    description: "ID товара",
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Товар успешно получен",
    type: Product,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Товар не найден",
  })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Обновить товар" })
  @ApiParam({
    name: "id",
    description: "ID товара",
    example: 1,
  })
  @ApiBody({ type: UpdateProductDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Товар успешно обновлен",
    type: Product,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Товар не найден",
  })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Удалить товар" })
  @ApiParam({
    name: "id",
    description: "ID товара",
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Товар успешно удален",
    type: Product,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Товар не найден",
  })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}
