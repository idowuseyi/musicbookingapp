import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Artist } from '../../artist/entities/artist-profile.entity';
import { Event } from '../../event/entities/event.entity';
import { Booking } from '../../booking/entities/booking.entity';
import { Payment } from 'src/modules/payment/entities/payment.entity';

export enum UserRole {
  ARTIST = 'artist',
  ORGANIZER = 'organizer',
  ADMIN = 'admin',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  @Column({ nullable: true })
  otpExpiration: Date;

  @Column({ nullable: true })
  otp: number;

  @Column({ nullable: true, default: false })
  isVerified: boolean;

  @Column({ nullable: true, type: 'text' })
  name: string;

  // @OneToOne(() => ArtistProfile, (profile) => profile.user, { nullable: true })
  // artistProfile?: ArtistProfile;

  @OneToMany(() => Event, (event) => event.organizer)
  events: Event[];

  @OneToMany(() => Artist, (artist) => artist.user)
  artists: Artist[];

  @OneToMany(() => Payment, (payment) => payment.user)
  payments: Payment[];

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[];
}
