import { IsIn, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateOrderDTO {
  @IsNumber({}, { message: 'Amount must be a number' })
  @Min(0.01, { message: 'Amount must be at least 0.01' })
  amount: number;

  @IsString({ message: 'Currency must be a string' })
  @IsNotEmpty({ message: 'Currency cannot be empty' })
  @IsIn(['BRL', 'USD', 'EUR'], { message: 'Currency not supported.' })
  currency: string;

  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description cannot be empty' })
  description: string;
}
