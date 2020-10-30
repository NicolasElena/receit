import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
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

  @OneToOne(() => UserImage, (image) => image.user, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn()
  image: UserImage;

  @OneToMany(() => Recipe, (recipe) => recipe.user, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn()
  recipes: Recipe[];
}
