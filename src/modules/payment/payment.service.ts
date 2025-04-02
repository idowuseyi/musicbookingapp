import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { CreatePaymentDto, PaymentResponseDto } from './dtos/payment.dto';
import { Booking } from '../booking/entities/booking.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment) private paymentRepository: Repository<Payment>,
    @InjectRepository(Booking) private bookingRepository: Repository<Booking>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(
    userId: number,
    createPaymentDto: CreatePaymentDto,
  ): Promise<PaymentResponseDto> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new BadRequestException('User not found');

    const booking = await this.bookingRepository.findOne({
      where: { id: createPaymentDto.bookingId },
      relations: ['user'],
    });
    if (!booking) throw new NotFoundException('Booking not found');

    if (booking.user.id !== userId)
      throw new BadRequestException('You can only pay for your own bookings');

    const newPayment = this.paymentRepository.create({
      user,
      booking,
      amount: createPaymentDto.amount,
      paymentMethod: createPaymentDto.paymentMethod,
      status: 'Completed', // Assume successful transaction for now
    });

    await this.paymentRepository.save(newPayment);

    // Mark booking as paid
    booking.isPaid = true;
    await this.bookingRepository.save(booking);

    return {
      id: newPayment.id,
      bookingId: booking.id,
      amount: newPayment.amount,
      status: newPayment.status,
      paymentMethod: newPayment.paymentMethod,
      createdAt: newPayment.createdAt,
    };
  }

  async findAll(): Promise<PaymentResponseDto[]> {
    const payments = await this.paymentRepository.find({
      relations: ['booking', 'user'],
    });
    return payments.map((payment) => ({
      id: payment.id,
      bookingId: payment.booking.id,
      amount: payment.amount,
      status: payment.status,
      paymentMethod: payment.paymentMethod,
      createdAt: payment.createdAt,
    }));
  }

  async findOne(id: number): Promise<PaymentResponseDto> {
    const payment = await this.paymentRepository.findOne({
      where: { id },
      relations: ['booking', 'user'],
    });
    if (!payment) throw new NotFoundException('Payment not found');

    return {
      id: payment.id,
      bookingId: payment.booking.id,
      amount: payment.amount,
      status: payment.status,
      paymentMethod: payment.paymentMethod,
      createdAt: payment.createdAt,
    };
  }
}
