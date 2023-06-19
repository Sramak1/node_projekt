import { IsNotEmpty } from 'class-validator';

export class CreateVoteDto {
  @IsNotEmpty()
  value: boolean;
}
