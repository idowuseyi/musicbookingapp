import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Booking } from '../../booking/entities/booking.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.payments, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Booking, (booking) => booking.payments, {
    onDelete: 'CASCADE',
  })
  booking: Booking;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'varchar', length: 50 })
  status: string; // Pending, Completed, Failed

  @Column({ type: 'varchar', length: 100 })
  paymentMethod: string; // Card, PayPal, Crypto

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
