export type TCountry = {
  readonly name: string;
  readonly code: string;
};

export type TIngredient = {
  readonly name: string;
  readonly type: string;
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly calories: number;
  readonly price: number;
  readonly image: string;
  readonly image_mobile: string;
  readonly image_large: string;
  readonly __v: number;
  readonly _id: string;
};

export type TUser = {
  readonly email: string;
  readonly name: string;
}

export type TForm = {
  name?: string,
  password: string,
  email: string,
  token?: string
}

export type TOrder = {
  readonly _id: string;
  readonly ingredients: string[];
  readonly status: string;
  readonly name: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly number: number;
}

export type TIngredientWithCount = {
  count: number;
  ingredient?: TIngredient;
}

export type TIngredientWithCountRequired = {
  count: number;
  ingredient: TIngredient;
}
