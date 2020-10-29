import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Recipe } from './Recipe';
import { UserImage } from './UserImage';

@Entity('Users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Recipe, (recipe) => recipe.user, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn()
  recipes: Recipe[];

  @OneToMany(() => UserImage, (image) => image.user, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'user_id' })
  image: UserImage;
}
