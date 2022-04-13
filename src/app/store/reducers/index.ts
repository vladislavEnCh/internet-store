// import { authReducer, authState,  auth} from './authReducer';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { environment } from 'src/environments/environment';
import { cart, cartReducer } from './cartReducer';
// import { formBuilderReducer, FormBuilderState,formBuilder } from "./formBuilder";
// export interface State{
//     [formBuilder]:FormBuilderState,
//     [auth]:authState
// }
export const reducer: ActionReducerMap<any> = {
  // [formBuilder]:formBuilderReducer,
  [cart]: cartReducer,
};

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? []
  : [];
