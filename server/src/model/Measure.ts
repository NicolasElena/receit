import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { RecipeIngredient } from './RecipeIngredient';

@Entity('Measures')
export class Measure {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @OneToMany(
    () => RecipeIngredient,
    (recipeIngredient) => recipeIngredient.measure
  )
  public recipeIngredient!: RecipeIngredient[];
}
