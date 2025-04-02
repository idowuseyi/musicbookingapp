import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import {
  CreateArtistDto,
  UpdateArtistDto,
  ArtistResponseDto,
} from './dtos/artist.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Artists')
@Controller('artists')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Req() req,
    @Body() createArtistDto: CreateArtistDto,
  ): Promise<ArtistResponseDto> {
    return this.artistService.create(req.user.id, createArtistDto);
  }

  @Get()
  async findAll(): Promise<ArtistResponseDto[]> {
    return this.artistService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ArtistResponseDto> {
    return this.artistService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Promise<ArtistResponseDto> {
    return this.artistService.update(id, updateArtistDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.artistService.remove(id);
  }
}
