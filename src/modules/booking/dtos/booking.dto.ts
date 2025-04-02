import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsBoolean, Min } from 'class-validator';

export class CreateBookingDto {
  @ApiProperty({ example: 1, description: 'Event ID to book' })
  @IsInt()
  eventId: number;

  @ApiProperty({ example: 2, description: 'Number of tickets' })
  @IsInt()
  @Min(1)
  tickets: number;
}

export class UpdateBookingDto {
  @ApiProperty({ example: true, description: 'Mark booking as paid' })
  @IsBoolean()
  isPaid: boolean;
}

export class BookingResponseDto {
  @ApiProperty({ example: 1, description: 'Booking ID' })
  id: number;

  @ApiProperty({ example: 1, description: 'Event ID' })
  eventId: number;

  @ApiProperty({ example: 3, description: 'Number of tickets' })
  tickets: number;

  @ApiProperty({ example: true, description: 'Payment status' })
  isPaid: boolean;

  @ApiProperty({
    example: '2025-07-15T12:00:00Z',
    description: 'Booking timestamp',
  })
  bookedAt: Date;
}
