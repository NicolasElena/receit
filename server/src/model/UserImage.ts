import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { User } from './User';

@Entity('userImages')
export class UserImage {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  path: string;

  @OneToOne(() => User, (user) => user.image)
  user: User;
}
