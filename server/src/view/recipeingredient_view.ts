import { RecipeIngredient } from '../model/RecipeIngredient';
import ingredient from './ingredient_view';
import measure from './measure_view';

export default {
  render(recipeIngredient: RecipeIngredient) {
    return {
      name: ingredient.render(recipeIngredient.ingredient),
      measure: measure.render(recipeIngredient.measure),
      amount: recipeIngredient.amount,
    };
  },

  renderMany(recipeIngredient: RecipeIngredient[]) {
    return recipeIngredient.map((recipeIngredient) =>
      this.render(recipeIngredient)
    );
  },
};
