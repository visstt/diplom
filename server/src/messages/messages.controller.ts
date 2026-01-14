import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  UseGuards,
  Request,
} from "@nestjs/common";
import { MessagesService } from "./messages.service";
import { CreateMessageDto } from "./dto/create-message.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller("messages")
@UseGuards(JwtAuthGuard)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  // Отправить сообщение
  @Post()
  create(@Request() req, @Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(req.user.id, createMessageDto);
  }

  // Получить чат пользователя с админом
  @Get("my-chat")
  getUserChat(@Request() req) {
    return this.messagesService.getUserChat(req.user.id);
  }

  // Получить все чаты для админа
  @Get("admin/chats")
  getAdminChats(@Request() req) {
    return this.messagesService.getAdminChats(req.user.id);
  }

  // Получить переписку с конкретным пользователем
  @Get("conversation/:userId")
  getConversation(@Request() req, @Param("userId") userId: string) {
    return this.messagesService.getConversation(req.user.id, parseInt(userId));
  }

  // Отметить сообщения как прочитанные
  @Patch("mark-read/:userId")
  markAsRead(@Request() req, @Param("userId") userId: string) {
    return this.messagesService.markAsRead(req.user.id, parseInt(userId));
  }

  // Получить количество непрочитанных
  @Get("unread-count")
  getUnreadCount(@Request() req) {
    return this.messagesService.getUnreadCount(req.user.id);
  }
}
