import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Recipe } from './Recipe';

@Entity('recipeImages')
export class RecipeImage {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  path: string;

  @ManyToOne(() => Recipe, (recipe) => recipe.images)
  @JoinColumn({ name: 'recipe_id' })
  recipe: Recipe;
}
