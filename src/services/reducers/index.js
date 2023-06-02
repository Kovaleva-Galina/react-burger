import {legacy_createStore as createStore, combineReducers, applyMiddleware} from 'redux';
import { ingredientsReducer } from './ingredients';
import { burgerConstructorReducer } from './burger-constructor';
import { detailsIngredientReducer } from './detail-ingredient';
import { composeWithDevTools } from "redux-devtools-extension";
import { orderNumberReducer } from './order';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  detailIngredient: detailsIngredientReducer,
  orderNumber: orderNumberReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
