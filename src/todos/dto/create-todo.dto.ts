import { ApiProperty } from "@nestjs/swagger";

export class CreateTodoDto {
  @ApiProperty()
  title: string;

  @ApiProperty() 
  id: number;
}
