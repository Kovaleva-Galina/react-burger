import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { burgerConstructorReducer } from './burger-constructor';
import { detailsIngredientReducer } from './detail-ingredient';
import { userProfileReducer } from './user-profile';
import { orderNumberReducer } from './order';
import { wsAllReducer } from './ws-all-reducer';
import { wsOrdersReducer } from './ws-orders-reducer';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  detailIngredient: detailsIngredientReducer,
  orderNumber: orderNumberReducer,
  userProfile: userProfileReducer,
  ordersAll: wsAllReducer,
  orders: wsOrdersReducer
})

