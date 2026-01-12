import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from "@nestjs/common";
import { CartService } from "./cart.service";
import { AddToCartDto } from "./dto/add-to-cart.dto";
import { UpdateQuantityDto } from "./dto/update-quantity.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller("cart")
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async getCart(@Request() req) {
    return this.cartService.getCart(req.user.id);
  }

  @Post()
  async addToCart(@Request() req, @Body() addToCartDto: AddToCartDto) {
    return this.cartService.addToCart(req.user.id, addToCartDto);
  }

  @Put(":id")
  async updateQuantity(
    @Request() req,
    @Param("id") id: string,
    @Body() updateQuantityDto: UpdateQuantityDto
  ) {
    return this.cartService.updateQuantity(
      req.user.id,
      +id,
      updateQuantityDto.quantity
    );
  }

  @Delete(":id")
  async removeFromCart(@Request() req, @Param("id") id: string) {
    return this.cartService.removeFromCart(req.user.id, +id);
  }

  @Delete()
  async clearCart(@Request() req) {
    return this.cartService.clearCart(req.user.id);
  }
}
