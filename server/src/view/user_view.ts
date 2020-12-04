import UserController from '../controllers/UserController';
import { User } from '../model/User';
import recipes from './recipe_view';
import userImage from './user_image_view';

export default {
  render(user: User) {
    return {
      userId: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      image: userImage.render(user.image),
    };
  },
  renderMany(user: User[]) {
    return user.map((user) => this.render(user));
  },
  renderRecipes(user: User) {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      recipes: recipes.renderManyOneUser(user.recipes),
      image: userImage.render(user.image),
    };
  },
};
