import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateArtistDto {
  @ApiProperty({
    example: 'DJ Khaled',
    description: 'Stage name of the artist',
  })
  @IsString()
  @IsNotEmpty()
  stageName: string;

  @ApiProperty({ example: 'Hip-Hop', description: 'Genre of music' })
  @IsString()
  @IsNotEmpty()
  genre: string;

  @ApiPropertyOptional({
    example: 'Award-winning DJ and producer.',
    description: 'Biography of the artist',
  })
  @IsString()
  @IsOptional()
  bio?: string;

  @ApiPropertyOptional({
    example: 'Available on weekends',
    description: 'Availability for bookings',
  })
  @IsString()
  @IsOptional()
  availability?: string;
}

export class UpdateArtistDto {
  @ApiPropertyOptional({
    example: 'DJ Khaled',
    description: 'Updated stage name',
  })
  @IsString()
  @IsOptional()
  stageName?: string;

  @ApiPropertyOptional({ example: 'Hip-Hop', description: 'Updated genre' })
  @IsString()
  @IsOptional()
  genre?: string;

  @ApiPropertyOptional({
    example: 'Grammy Award-winning producer',
    description: 'Updated biography',
  })
  @IsString()
  @IsOptional()
  bio?: string;

  @ApiPropertyOptional({
    example: 'Available for summer tours',
    description: 'Updated availability',
  })
  @IsString()
  @IsOptional()
  availability?: string;
}

export class ArtistResponseDto {
  @ApiProperty({ example: 1, description: 'Artist ID' })
  id: number;

  @ApiProperty({ example: 'DJ Khaled', description: 'Stage name' })
  stageName: string;

  @ApiProperty({ example: 'Hip-Hop', description: 'Music genre' })
  genre: string;

  @ApiProperty({
    example: 'Award-winning DJ and producer.',
    description: 'Biography',
  })
  bio: string;

  @ApiProperty({
    example: 'Available on weekends',
    description: 'Availability for bookings',
  })
  availability: string;
}
