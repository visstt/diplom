import { IsInt } from "class-validator";

export class MarkReadDto {
  @IsInt()
  userId: number;
}
