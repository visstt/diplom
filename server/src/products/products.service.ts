import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

@Injectable()
export class ProductsService {
  private readonly baseUrl = process.env.BASE_URL || "http://localhost:3001";

  constructor(private prisma: PrismaService) {}

  private formatProductWithImageUrl(product: any) {
    return {
      ...product,
      image: product.image ? `${this.baseUrl}${product.image}` : null,
    };
  }

  async create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: createProductDto,
    });
  }

  async findAll(category?: string) {
    const where = category ? { category } : {};
    const products = await this.prisma.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
    return products.map((product) => this.formatProductWithImageUrl(product));
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    this.formatProductWithImageUrl(product);
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.findOne(id); // Check if exists
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Check if exists
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
