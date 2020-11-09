import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  JoinColumn,
  JoinTable,
} from 'typeorm';

import { User } from './User';
import { RecipeIngredient } from './RecipeIngredient';
import { Category } from './Category';
import { RecipeImage } from './RecipeImage';

@Entity('Recipes')
export class Recipe {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  prepare_method: string;

  @Column()
  public_flag: boolean;

  @OneToMany(
    () => RecipeIngredient,
    (recipeIngredient) => recipeIngredient.recipe,
    {
      cascade: ['insert', 'update'],
    }
  )
  public recipeIngredient!: RecipeIngredient[];

  @ManyToMany(() => Category, (category) => category.recipe, {
    cascade: ['insert', 'update'],
  })
  @JoinTable()
  categories: Category[];

  @ManyToOne(() => User, (user) => user.recipes, {
    cascade: ['insert', 'update'],
  })
  user: User;

  @OneToMany(() => RecipeImage, (image) => image.recipe, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'recipe_id' })
  images: RecipeImage[];
}
