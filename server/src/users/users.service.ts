import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException("Пользователь не найден");
    }

    const { password, ...result } = user;
    return result;
  }

  async updateProfile(userId: number, updateUserDto: UpdateUserDto) {
    const { password, birthDate, ...restData } = updateUserDto;

    const updateData: any = { ...restData };

    // Если меняется пароль, хешируем его
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    // Преобразуем дату рождения, если она есть
    if (birthDate) {
      updateData.birthDate = new Date(birthDate);
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    const { password: _, ...result } = updatedUser;
    return result;
  }
}
