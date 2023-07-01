import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { store } from '../store';
import { TBurgerConstructorsActions } from '../actions/burger-constructor';
import { TDetailIngredientActions } from '../actions/detail-ingredient';
import { TIngredientsActions } from '../actions/ingredients';
import { TOrderActions } from '../actions/order';
import { TUserActions } from '../actions/user-profile';
import { TWsAllActions } from '../actions/ws-all-actions';
import { TWsOrdersActions } from '../actions/ws-orders-actions';

type TApplicationActions =
| TBurgerConstructorsActions
| TDetailIngredientActions
| TIngredientsActions
| TOrderActions
| TUserActions
| TWsAllActions
| TWsOrdersActions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;
