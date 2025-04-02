import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Event } from '../../event/entities/event.entity';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  stageName: string;

  @Column()
  genre: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  availability: string;

  @ManyToOne(() => User, (user) => user.artists, { onDelete: 'CASCADE' })
  user: User;

  @ManyToMany(() => Event, (event) => event.artists)
  @JoinTable()
  events: Event[];
}
