import { User } from '../model/User';
import recipes from './recipe_view';
import userImage from './user_image_view';

export default {
  render(user: User) {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      recipes: recipes.renderMany(user.recipes),
      image: userImage.render(user.image),
    };
  },
  renderMany(user: User[]) {
    return user.map((user) => this.render(user));
  },
  renderOnRecipes(user: User) {
    return {
      id: user.id,
      firstName: user.firstName,
    };
  },
};
