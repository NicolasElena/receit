import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Recipe } from './Recipe';
import { UserImage } from './UserImage';

import bcrypt from 'bcryptjs';

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

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

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
