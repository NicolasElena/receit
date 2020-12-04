import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Recipe } from './Recipe';

@Entity('RecipeIngredient')
export class RecipeIngredient {
  @PrimaryGeneratedColumn('increment')
  public RecipeIngredientId!: number;

  @Column()
  public ingredient!: string;

  @Column()
  public amount!: number;

  @Column()
  public measure!: string;

  @ManyToOne(() => Recipe, (recipe) => recipe.recipeIngredient, {
    onDelete: 'CASCADE',
  })
  public recipe!: Recipe;
}
