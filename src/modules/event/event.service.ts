import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import {
  CreateEventDto,
  UpdateEventDto,
  EventResponseDto,
} from './dtos/event.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event) private eventRepository: Repository<Event>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(
    userId: number,
    createEventDto: CreateEventDto,
  ): Promise<EventResponseDto> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new BadRequestException('User not found');

    const newEvent = this.eventRepository.create({
      ...createEventDto,
      organizer: user,
    });
    await this.eventRepository.save(newEvent);

    return {
      id: newEvent.id,
      name: newEvent.name,
      location: newEvent.location,
      date: newEvent.date,
      description: newEvent.description,
    };
  }

  async findAll(): Promise<EventResponseDto[]> {
    const events = await this.eventRepository.find({
      relations: ['organizer'],
    });
    return events.map((event) => ({
      id: event.id,
      name: event.name,
      location: event.location,
      date: event.date,
      description: event.description,
    }));
  }

  async findOne(id: number): Promise<EventResponseDto> {
    const event = await this.eventRepository.findOne({
      where: { id },
      relations: ['organizer'],
    });
    if (!event) throw new NotFoundException('Event not found');

    return {
      id: event.id,
      name: event.name,
      location: event.location,
      date: event.date,
      description: event.description,
    };
  }

  async update(
    id: number,
    updateEventDto: UpdateEventDto,
  ): Promise<EventResponseDto> {
    const event = await this.eventRepository.findOne({ where: { id } });
    if (!event) throw new NotFoundException('Event not found');

    Object.assign(event, updateEventDto);
    await this.eventRepository.save(event);

    return {
      id: event.id,
      name: event.name,
      location: event.location,
      date: event.date,
      description: event.description,
    };
  }

  async remove(id: number) {
    const event = await this.eventRepository.findOne({ where: { id } });
    if (!event) throw new NotFoundException('Event not found');

    await this.eventRepository.remove(event);
    return { message: 'Event deleted successfully' };
  }
}
