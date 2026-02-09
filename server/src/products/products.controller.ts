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
  UseGuards,
  Request,
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
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";

@ApiTags("products")
@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
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

  // ============ АНАЛИТИКА (ставим ДО :id, чтобы маршруты не конфликтовали) ============

  @Get("popular")
  @ApiOperation({ summary: "Получить топ популярных товаров по покупкам" })
  @ApiQuery({
    name: "limit",
    required: false,
    description: "Количество товаров (по умолчанию 10)",
    example: 10,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Топ популярных товаров",
  })
  getPopular(@Query("limit") limit?: string) {
    return this.productsService.getPopularProducts(
      limit ? parseInt(limit, 10) : 10,
    );
  }

  @Get("analytics")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @ApiOperation({ summary: "Получить полную аналитику по товарам (только для админа)" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Аналитика по товарам",
  })
  getAnalytics() {
    return this.productsService.getAnalytics();
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

  @Get(":id/stats")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @ApiOperation({ summary: "Получить статистику товара (только для админа)" })
  @ApiParam({ name: "id", description: "ID товара", example: 1 })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Статистика товара",
  })
  getStats(@Param("id", ParseIntPipe) id: number) {
    return this.productsService.getProductStats(id);
  }

  @Post(":id/view")
  @ApiOperation({ summary: "Инкрементировать счётчик просмотров товара" })
  @ApiParam({ name: "id", description: "ID товара", example: 1 })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Просмотр записан",
  })
  incrementView(@Param("id", ParseIntPipe) id: number) {
    return this.productsService.incrementViewCount(id);
  }

  @Post("checkout")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Записать покупки из корзины при оформлении заказа" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Покупки записаны",
  })
  checkout(@Request() req) {
    return this.productsService.recordPurchasesFromCart(req.user.id);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
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
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
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
