import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Recipe } from './Recipe';
import { Ingredient } from './Ingredient';
import { Measure } from './Measure';

@Entity()
export class RecipeIngredient {
  @PrimaryGeneratedColumn()
  public RecipeIngredientId!: number;

  @Column()
  public RecipeId!: number;

  @Column()
  public IngredientId!: number;

  @Column()
  public MeasureId!: number;

  @Column()
  public amount!: number;

  @ManyToOne(() => Recipe, (recipe) => recipe.recipeIngredient)
  public recipe!: Recipe;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.recipeIngredient)
  public ingredient!: Ingredient;

  @ManyToOne(() => Measure, (measure) => measure.recipeIngredient)
  public measure!: Measure;
}
