import { Category } from '../model/Category';

export default {
  render(category: Category) {
    return {
      name: category.name,
    };
  },

  renderMany(category: Category[]) {
    return category.map((category) => this.render(category));
  },
};
