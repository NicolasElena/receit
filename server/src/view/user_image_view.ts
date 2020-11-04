import { UserImage } from '../model/UserImage';

export default {
  render(image: UserImage) {
    return {
      id: image.id,
      url: `http://localhost:3333/uploads/${image.path}`,
    };
  },

  renderMany(images: UserImage[]) {
    return images.map((image) => this.render(image));
  },
};
