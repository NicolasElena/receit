import { Recipe } from '../model/Recipe';
import categories from './category_view';
import recipeIngredient from './recipe_ingredient_view';
import recipeImage from './recipe_image_view';

export default {
  render(recipe: Recipe) {
    return {
      id: recipe.id,
      user_id: recipe.user.id,
      user: recipe.user.firstName,
      name: recipe.name,
      prepare_method: recipe.prepare_method,
      public_flag: recipe.public_flag,
      categories: categories.renderMany(recipe.categories),
      ingredients: recipeIngredient.renderMany(recipe.recipeIngredient),
      images: recipeImage.renderMany(recipe.images),
    };
  },
  renderMany(recipe: Recipe[]) {
    return recipe.map((recipe) => this.render(recipe));
  },
  renderOneUser(recipe: Recipe) {
    return {
      id: recipe.id,
      name: recipe.name,
      prepare_method: recipe.prepare_method,
      public_flag: recipe.public_flag,
      categories: categories.renderMany(recipe.categories),
      ingredients: recipeIngredient.renderMany(recipe.recipeIngredient),
      images: recipeImage.renderMany(recipe.images),
    };
  },
  renderManyOneUser(recipe: Recipe[]) {
    return recipe.map((recipe) => this.renderOneUser(recipe));
  },
};
