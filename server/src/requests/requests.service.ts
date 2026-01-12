import { Injectable, Logger } from "@nestjs/common";
import axios from "axios";
import { CreateRequestDto } from "./dto/create-request.dto";

@Injectable()
export class RequestsService {
  private readonly logger = new Logger(RequestsService.name);
  private readonly botToken = process.env.TELEGRAM_BOT_TOKEN;
  private readonly chatId = process.env.TELEGRAM_CHAT_ID;

  async sendRequest(createRequestDto: CreateRequestDto) {
    if (!this.botToken || !this.chatId) {
      this.logger.warn(
        "Telegram Bot Token or Chat ID not configured. Skipping Telegram notification."
      );
      return {
        success: false,
        message:
          "Заявка получена, но уведомление в Telegram не отправлено (не настроен бот)",
      };
    }

    try {
      const message = this.formatMessage(createRequestDto);
      const url = `https://api.telegram.org/bot${this.botToken}/sendMessage`;

      await axios.post(url, {
        chat_id: this.chatId,
        text: message,
        parse_mode: "HTML",
      });

      this.logger.log(
        `Request sent to Telegram for service: ${createRequestDto.serviceName}`
      );

      return {
        success: true,
        message: "Заявка успешно отправлена",
      };
    } catch (error) {
      this.logger.error("Failed to send message to Telegram", error);
      throw error;
    }
  }

  private formatMessage(data: CreateRequestDto): string {
    let message = `<b>🔔 Новая заявка на услугу</b>\n\n`;
    message += `<b>Услуга:</b> ${data.serviceName}\n`;
    message += `<b>Имя:</b> ${data.name}\n`;
    message += `<b>Телефон:</b> ${data.phone}\n`;

    if (data.email) {
      message += `<b>Email:</b> ${data.email}\n`;
    }

    if (data.comment) {
      message += `\n<b>Комментарий:</b>\n${data.comment}`;
    }

    return message;
  }
}
