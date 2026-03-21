import { Controller, Get, Put, Body, UseGuards, Request, HttpStatus } from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@ApiTags("users")
@ApiBearerAuth("access-token")
@Controller("users")
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("profile")
  @ApiOperation({ summary: "Получить профиль текущего пользователя" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Профиль пользователя",
    schema: {
      example: {
        id: 1,
        email: "user@example.com",
        firstName: "Иван",
        lastName: "Иванов",
        phone: "+7 (999) 123-45-67",
        role: "user",
      },
    },
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Не авторизован" })
  async getProfile(@Request() req) {
    return this.usersService.getProfile(req.user.id);
  }

  @Put("profile")
  @ApiOperation({ summary: "Обновить профиль текущего пользователя" })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: HttpStatus.OK, description: "Профиль обновлён" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Не авторизован" })
  async updateProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateProfile(req.user.id, updateUserDto);
  }
}
