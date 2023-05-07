import {legacy_createStore as createStore, combineReducers, applyMiddleware} from 'redux';
import { ingredientsReducer  } from './ingredients';
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
