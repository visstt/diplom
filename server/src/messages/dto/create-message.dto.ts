import { IsString, IsNotEmpty, IsInt } from "class-validator";

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsInt()
  receiverId: number;
}
