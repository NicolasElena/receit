import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { RecipeIngredient } from './RecipeIngredient';

@Entity('Ingredients')
export class Ingredient {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @OneToMany(
    () => RecipeIngredient,
    (recipeIngredient) => recipeIngredient.ingredient,
    {
      cascade: ['insert', 'update'],
    }
  )
  public recipeIngredient!: RecipeIngredient[];
}
