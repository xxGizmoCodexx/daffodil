import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  ofType,
} from '@ngrx/effects';
import {
  ROUTER_NAVIGATION,
  ROUTER_NAVIGATED,
  RouterNavigatedAction,
} from '@ngrx/router-store';
import { Action } from '@ngrx/store';
import {
  Observable,
  of,
  asyncScheduler,
  combineLatest,
} from 'rxjs';
import {
  switchMap,
  delay,
  map,
  tap,
} from 'rxjs/operators';

import {
  DaffBreakpoints,
  DaffSidebarModeEnum,
} from '@daffodil/design';

import * as SidebarActions from '../actions/sidebar.actions';
import { computeDeepestSidebarMode } from '../helpers/computeDeepestSidebarMode';


@Injectable()
export class DaffioSidebarRoutingModeEffects {
  constructor(
    private actions$: Actions,
    private breakpointsObserver: BreakpointObserver,
  ) { }


  changeModeWhenVisitingConfiguredRoute$ = createEffect(() => (): Observable<Action> => combineLatest(
    this.actions$.pipe<RouterNavigatedAction>(ofType(ROUTER_NAVIGATED)),
    this.breakpointsObserver.observe(DaffBreakpoints.TABLET),
  ).pipe(
    map(([action, state]) => {
      const mode = computeDeepestSidebarMode(action.payload.routerState.root);
      if(state.matches && mode){
        return new SidebarActions.SetSidebarState({ mode, open: mode === DaffSidebarModeEnum.SideFixed ? true : false });
      } else {
        return new SidebarActions.SetSidebarState({ mode: 'under', open: false });
      }
    }),
  ));
}
