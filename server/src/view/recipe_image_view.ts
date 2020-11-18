import { RecipeImage } from '../model/RecipeImage';

export default {
  render(image: RecipeImage) {
    return {
      id: image.id,
      url: `http://localhost:3333/uploads/${image.path}`,
    };
  },

  renderMany(images: RecipeImage[]) {
    return images.map((image) => this.render(image));
  },
};
