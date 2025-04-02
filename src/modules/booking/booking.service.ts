import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import {
  CreateBookingDto,
  UpdateBookingDto,
  BookingResponseDto,
} from './dtos/booking.dto';
import { User } from '../user/entities/user.entity';
import { Event } from '../event/entities/event.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking) private bookingRepository: Repository<Booking>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Event) private eventRepository: Repository<Event>,
  ) {}

  async create(
    userId: number,
    createBookingDto: CreateBookingDto,
  ): Promise<BookingResponseDto> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new BadRequestException('User not found');

    const event = await this.eventRepository.findOne({
      where: { id: createBookingDto.eventId },
    });
    if (!event) throw new NotFoundException('Event not found');

    const newBooking = this.bookingRepository.create({
      user,
      event,
      tickets: createBookingDto.tickets,
    });

    await this.bookingRepository.save(newBooking);

    return {
      id: newBooking.id,
      eventId: event.id,
      tickets: newBooking.tickets,
      isPaid: newBooking.isPaid,
      bookedAt: newBooking.bookedAt,
    };
  }

  async findAll(): Promise<BookingResponseDto[]> {
    const bookings = await this.bookingRepository.find({
      relations: ['event', 'user'],
    });
    return bookings.map((booking) => ({
      id: booking.id,
      eventId: booking.event.id,
      tickets: booking.tickets,
      isPaid: booking.isPaid,
      bookedAt: booking.bookedAt,
    }));
  }

  async findOne(id: number): Promise<BookingResponseDto> {
    const booking = await this.bookingRepository.findOne({
      where: { id },
      relations: ['event', 'user'],
    });
    if (!booking) throw new NotFoundException('Booking not found');

    return {
      id: booking.id,
      eventId: booking.event.id,
      tickets: booking.tickets,
      isPaid: booking.isPaid,
      bookedAt: booking.bookedAt,
    };
  }

  async update(
    id: number,
    updateBookingDto: UpdateBookingDto,
  ): Promise<BookingResponseDto> {
    const booking = await this.bookingRepository.findOne({ where: { id } });
    if (!booking) throw new NotFoundException('Booking not found');

    Object.assign(booking, updateBookingDto);
    await this.bookingRepository.save(booking);

    return {
      id: booking.id,
      eventId: booking.event.id,
      tickets: booking.tickets,
      isPaid: booking.isPaid,
      bookedAt: booking.bookedAt,
    };
  }

  async remove(id: number) {
    const booking = await this.bookingRepository.findOne({ where: { id } });
    if (!booking) throw new NotFoundException('Booking not found');

    await this.bookingRepository.remove(booking);
    return { message: 'Booking deleted successfully' };
  }
}
