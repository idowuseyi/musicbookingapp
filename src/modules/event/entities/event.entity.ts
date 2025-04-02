import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Artist } from '../../artist/entities/artist-profile.entity';
import { Booking } from '../../booking/entities/booking.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => User, (user) => user.events, { onDelete: 'CASCADE' })
  organizer: User;

  @ManyToMany(() => Artist, (artist) => artist.events)
  @JoinTable()
  artists: Artist[];

  @OneToMany(() => Booking, (booking) => booking.event)
  bookings: Booking[];
}
