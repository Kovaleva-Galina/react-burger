export const UPDATE_DETAILS_INGREDIENT = 'UPDATE_DETAILS_INGREDIENT';
export const DELETE_DETAILS_INGREDIENT = 'DELETE_DETAILS_INGREDIENT';

export const updateDetailsIngredient = (payload) => ({ type: UPDATE_DETAILS_INGREDIENT, payload });
export const deleteDetailsIngredient = () => ({ type: DELETE_DETAILS_INGREDIENT });
