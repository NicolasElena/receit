export interface Recipe {
  user: string;
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
