import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Event } from '../../event/entities/event.entity';
import { Payment } from '../../payment/entities/payment.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.bookings, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Event, (event) => event.bookings, { onDelete: 'CASCADE' })
  event: Event;

  @OneToMany(() => Payment, (payment) => payment.booking)
  payments: Payment[];

  @Column({ type: 'int', default: 1 })
  tickets: number;

  @Column({ type: 'boolean', default: false })
  isPaid: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  bookedAt: Date;
}
