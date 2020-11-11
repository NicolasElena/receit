import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Recipe } from './Recipe';
import { Ingredient } from './Ingredient';
import { Measure } from './Measure';

@Entity('RecipeIngredient')
export class RecipeIngredient {
  @PrimaryGeneratedColumn('increment')
  public RecipeIngredientId!: number;

  @Column()
  public amount!: number;

  @Column()
  public recipeId!: number;

  @Column()
  public ingredientId!: number;

  @Column()
  public measureId!: number;

  @ManyToOne(() => Recipe, (recipe) => recipe.recipeIngredient)
  public recipe!: Recipe;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.recipeIngredient, {
    cascade: ['insert'],
  })
  public ingredient!: Ingredient;

  @ManyToOne(() => Measure, (measure) => measure.recipeIngredient, {
    cascade: ['insert'],
  })
  public measure!: Measure;
}
