import { IsNotEmpty } from 'class-validator';

export class UpdateVoteDto {
  @IsNotEmpty()
  value: boolean;
}
