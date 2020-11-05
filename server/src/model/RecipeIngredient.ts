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
  @ManyToOne(() => Recipe, (recipe) => recipe.recipeIngredient)
  public recipe!: Recipe;

  @Column()
  public IngredientId!: number;
  @ManyToOne(() => Ingredient, (ingredient) => ingredient.recipeIngredient)
  public ingredient!: Ingredient;

  @Column()
  public MeasureId!: number;
  @ManyToOne(() => Measure, (measure) => measure.recipeIngredient)
  public measure!: Measure;

  @Column()
  public amount!: number;
}
