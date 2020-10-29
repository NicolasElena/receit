import { Ingredient } from '../model/Ingredient';

export default {
  render(ingredient: Ingredient) {
    return {
      name: ingredient.name,
    };
  },

  renderMany(ingredient: Ingredient[]) {
    return ingredient.map((ingredient) => this.render(ingredient));
  },
};
