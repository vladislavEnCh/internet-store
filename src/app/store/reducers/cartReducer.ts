import {
  createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
  props,
} from '@ngrx/store';

export enum actionTypesAuth {
  TOTAL_PRICE = '[CART] totalPrice',
}

export const totalPrice = createAction(
  actionTypesAuth.TOTAL_PRICE,
  props<{ totalPrice: number }>()
);

export const cart = 'cart';

export interface ICartState {
  totalPrice: number;
}
export const initialState: ICartState = {
  totalPrice: 0,
};

export const cartReducer = createReducer(
  initialState,
  on(totalPrice, (state, { totalPrice }) => {
    return { ...state, totalPrice: totalPrice };
  })
);

export const featureSelector = createFeatureSelector<ICartState>('cart');
export const totalPriceSelector = createSelector(
  featureSelector,
  (state) => state.totalPrice
);
