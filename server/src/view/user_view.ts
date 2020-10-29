import { User } from '../model/User';
import recipes from './recipe_view';

export default {
  render(user: User) {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      recipes: recipes.renderMany(user.recipes),
    };
  },
  renderMany(user: User[]) {
    return user.map((user) => this.render(user));
  },
};
