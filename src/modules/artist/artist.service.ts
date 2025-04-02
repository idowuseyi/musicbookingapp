import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from './entities/artist-profile.entity';
import {
  CreateArtistDto,
  UpdateArtistDto,
  ArtistResponseDto,
} from './dtos/artist.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist) private artistRepository: Repository<Artist>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(
    userId: number,
    createArtistDto: CreateArtistDto,
  ): Promise<ArtistResponseDto> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new BadRequestException('User not found');

    const newArtist = this.artistRepository.create({
      ...createArtistDto,
      user,
    });
    await this.artistRepository.save(newArtist);

    return {
      id: newArtist.id,
      stageName: newArtist.stageName,
      genre: newArtist.genre,
      bio: newArtist.bio,
      availability: newArtist.availability,
    };
  }

  async findAll(): Promise<ArtistResponseDto[]> {
    const artists = await this.artistRepository.find({ relations: ['user'] });
    return artists.map((artist) => ({
      id: artist.id,
      stageName: artist.stageName,
      genre: artist.genre,
      bio: artist.bio,
      availability: artist.availability,
    }));
  }

  async findOne(id: number): Promise<ArtistResponseDto> {
    const artist = await this.artistRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!artist) throw new NotFoundException('Artist not found');

    return {
      id: artist.id,
      stageName: artist.stageName,
      genre: artist.genre,
      bio: artist.bio,
      availability: artist.availability,
    };
  }

  async update(
    id: number,
    updateArtistDto: UpdateArtistDto,
  ): Promise<ArtistResponseDto> {
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist) throw new NotFoundException('Artist not found');

    Object.assign(artist, updateArtistDto);
    await this.artistRepository.save(artist);

    return {
      id: artist.id,
      stageName: artist.stageName,
      genre: artist.genre,
      bio: artist.bio,
      availability: artist.availability,
    };
  }

  async remove(id: number) {
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist) throw new NotFoundException('Artist not found');

    await this.artistRepository.remove(artist);
    return { message: 'Artist deleted successfully' };
  }
}
