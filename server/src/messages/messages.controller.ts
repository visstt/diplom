import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  UseGuards,
  Request,
  HttpStatus,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { MessagesService } from "./messages.service";
import { CreateMessageDto } from "./dto/create-message.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@ApiTags("messages")
@ApiBearerAuth("access-token")
@Controller("messages")
@UseGuards(JwtAuthGuard)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  // Отправить сообщение
  @Post()
  @ApiOperation({ summary: "Отправить сообщение" })
  @ApiBody({ type: CreateMessageDto })
  @ApiResponse({ status: HttpStatus.CREATED, description: "Сообщение отправлено" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Не авторизован" })
  create(@Request() req, @Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(req.user.id, createMessageDto);
  }

  // Получить чат пользователя с админом
  @Get("my-chat")
  @ApiOperation({ summary: "Получить свой чат с администратором" })
  @ApiResponse({ status: HttpStatus.OK, description: "История чата с администратором" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Не авторизован" })
  getUserChat(@Request() req) {
    return this.messagesService.getUserChat(req.user.id);
  }

  // Получить все чаты для админа
  @Get("admin/chats")
  @ApiOperation({ summary: "Получить все чаты (только для админа)" })
  @ApiResponse({ status: HttpStatus.OK, description: "Список чатов всех пользователей" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Не авторизован" })
  getAdminChats(@Request() req) {
    return this.messagesService.getAdminChats(req.user.id);
  }

  // Получить количество непрочитанных
  @Get("unread-count")
  @ApiOperation({ summary: "Получить количество непрочитанных сообщений" })
  @ApiResponse({ status: HttpStatus.OK, description: "Количество непрочитанных сообщений", schema: { example: { count: 3 } } })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Не авторизован" })
  getUnreadCount(@Request() req) {
    return this.messagesService.getUnreadCount(req.user.id);
  }

  // Получить переписку с конкретным пользователем
  @Get("conversation/:userId")
  @ApiOperation({ summary: "Получить переписку с конкретным пользователем" })
  @ApiParam({ name: "userId", description: "ID пользователя", example: 2 })
  @ApiResponse({ status: HttpStatus.OK, description: "Переписка с пользователем" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Не авторизован" })
  getConversation(@Request() req, @Param("userId") userId: string) {
    return this.messagesService.getConversation(req.user.id, parseInt(userId));
  }

  // Отметить сообщения как прочитанные
  @Patch("mark-read/:userId")
  @ApiOperation({ summary: "Отметить сообщения от пользователя как прочитанные" })
  @ApiParam({ name: "userId", description: "ID пользователя-отправителя", example: 2 })
  @ApiResponse({ status: HttpStatus.OK, description: "Сообщения отмечены как прочитанные" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Не авторизован" })
  markAsRead(@Request() req, @Param("userId") userId: string) {
    return this.messagesService.markAsRead(req.user.id, parseInt(userId));
  }
}
