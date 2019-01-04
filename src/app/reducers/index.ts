import {
  Action,
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';

import {routerReducer} from '@ngrx/router-store';

import {storeFreeze} from 'ngrx-store-freeze';




export interface AppState{

}

export const initialAuthState: AppState = {
  

};

export const reducers: ActionReducerMap<AppState,Action> = {
  router: routerReducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [storeFreeze] : [];
