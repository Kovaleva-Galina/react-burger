
export const DELETE_SELECTED_FILLING = 'DELETE_SELECTED_FILLING';
export const UPDATE_SELECTED_FILLINGS = 'UPDATE_SELECTED_FILLINGS';
export const UPDATE_SELECTED_BUNS = 'UPDATE_SELECTED_BUNS';
export const ADD_SELECTED_FILLING = 'ADD_SELECTED_FILLING';

export const deleteSelectedFilling = (payload) => ({type:DELETE_SELECTED_FILLING, payload});
export const updateSelectedFillings =(payload) => ({type: UPDATE_SELECTED_FILLINGS, payload});
export const updateSelectedBuns = (payload) => ({type: UPDATE_SELECTED_BUNS, payload});
export const addSelectedFilling =(payload) => ({type: ADD_SELECTED_FILLING, payload})
