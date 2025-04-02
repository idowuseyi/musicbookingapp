import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString,
} from 'class-validator';

export class CreateEventDto {
  @ApiProperty({ example: 'AfroBeats Night', description: 'Event name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Lagos, Nigeria', description: 'Event location' })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({
    example: '2025-08-20',
    description: 'Event date (YYYY-MM-DD)',
  })
  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @ApiPropertyOptional({
    example: 'A night of non-stop AfroBeats music!',
    description: 'Event description',
  })
  @IsString()
  @IsOptional()
  description?: string;
}

export class UpdateEventDto {
  @ApiPropertyOptional({
    example: 'AfroBeats Night',
    description: 'Updated event name',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    example: 'Lagos, Nigeria',
    description: 'Updated event location',
  })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiPropertyOptional({
    example: '2025-08-22',
    description: 'Updated event date',
  })
  @IsDateString()
  @IsOptional()
  date?: Date;

  @ApiPropertyOptional({
    example: 'A thrilling night with top AfroBeats artists.',
    description: 'Updated event description',
  })
  @IsString()
  @IsOptional()
  description?: string;
}

export class EventResponseDto {
  @ApiProperty({ example: 1, description: 'Event ID' })
  id: number;

  @ApiProperty({ example: 'AfroBeats Night', description: 'Event name' })
  name: string;

  @ApiProperty({ example: 'Lagos, Nigeria', description: 'Event location' })
  location: string;

  @ApiProperty({ example: '2025-08-20', description: 'Event date' })
  date: Date;

  @ApiProperty({
    example: 'A night of non-stop AfroBeats music!',
    description: 'Event description',
  })
  description: string;
}
