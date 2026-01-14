import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

@Injectable()
export class ProductsService {
  private readonly baseUrl = process.env.BASE_URL || "http://localhost:3001";

  constructor(private prisma: PrismaService) {}

  private formatProductWithImageUrl(product: any) {
    if (!product.image) {
      return { ...product, image: null };
    }
    // Don't add baseUrl if image already contains the full URL
    const image =
      product.image.startsWith("http://") ||
      product.image.startsWith("https://") ||
      product.image.includes(this.baseUrl)
        ? product.image
        : `${this.baseUrl}${product.image}`;
    return {
      ...product,
      image,
    };
  }

  async create(createProductDto: CreateProductDto) {
    const product = await this.prisma.product.create({
      data: createProductDto,
    });
    return this.formatProductWithImageUrl(product);
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
    return this.formatProductWithImageUrl(product);
  }

  private cleanImageUrl(imageUrl: string): string {
    if (!imageUrl) return imageUrl;

    // If it's already a full URL, extract the path part
    if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
      // Extract path from full URL
      try {
        const url = new URL(imageUrl);
        return url.pathname;
      } catch {
        return imageUrl;
      }
    }

    return imageUrl;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    // Check if exists
    const existing = await this.prisma.product.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    // Clean image URL to prevent duplication
    const cleanedData = {
      ...updateProductDto,
      image: updateProductDto.image
        ? this.cleanImageUrl(updateProductDto.image)
        : updateProductDto.image,
    };

    const product = await this.prisma.product.update({
      where: { id },
      data: cleanedData,
    });
    return this.formatProductWithImageUrl(product);
  }

  async remove(id: number) {
    await this.findOne(id); // Check if exists
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
