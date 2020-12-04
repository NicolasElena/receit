export interface Recipe {
  id: number;
  user: string;
  user_id: number;
  name: string;
  prepare_method: string;
  public_flag: boolean;
  categories: [
    {
      name: string;
    }
  ];
  ingredients: [
    {
      ingredient: string;
      measure: string;
      amount: number;
    }
  ];
  images: [
    {
      url: string;
    }
  ];
}

export interface User {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  image: {
    id: number;
    url: string;
  };
}
