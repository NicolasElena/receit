import { RecipeIngredient } from '../model/RecipeIngredient';

export default {
  render(recipeIngredient: RecipeIngredient) {
    return {
      ingredient: recipeIngredient.ingredient,
      measure: recipeIngredient.measure,
      amount: recipeIngredient.amount,
    };
  },

  renderMany(recipeIngredient: RecipeIngredient[]) {
    return recipeIngredient.map((recipeIngredient) =>
      this.render(recipeIngredient)
    );
  },
};
