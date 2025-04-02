import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsString, IsIn } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({ example: 1, description: 'Booking ID to pay for' })
  @IsInt()
  bookingId: number;

  @ApiProperty({ example: 50.0, description: 'Payment amount' })
  @IsNumber()
  amount: number;

  @ApiProperty({
    example: 'card',
    description: 'Payment method (card, PayPal, crypto)',
  })
  @IsString()
  @IsIn(['card', 'paypal', 'crypto'])
  paymentMethod: string;
}

export class PaymentResponseDto {
  @ApiProperty({ example: 1, description: 'Payment ID' })
  id: number;

  @ApiProperty({ example: 1, description: 'Booking ID' })
  bookingId: number;

  @ApiProperty({ example: 50.0, description: 'Amount paid' })
  amount: number;

  @ApiProperty({ example: 'Completed', description: 'Payment status' })
  status: string;

  @ApiProperty({ example: 'card', description: 'Payment method' })
  paymentMethod: string;

  @ApiProperty({
    example: '2025-07-15T12:00:00Z',
    description: 'Payment timestamp',
  })
  createdAt: Date;
}
