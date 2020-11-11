import { Recipe } from '../model/Recipe';
import categories from './category_view';
import recipeIngredient from './recipe_ingredient_view';
import user from './user_view';

export default {
  render(recipe: Recipe) {
    return {
      user: recipe.user,
      name: recipe.name,
      prepare_method: recipe.prepare_method,
      public_flag: recipe.public_flag,
      categories: categories.renderMany(recipe.categories),
      ingredients: recipeIngredient.renderMany(recipe.recipeIngredient),
    };
  },
  renderMany(recipe: Recipe[]) {
    return recipe.map((recipe) => this.render(recipe));
  },
};
