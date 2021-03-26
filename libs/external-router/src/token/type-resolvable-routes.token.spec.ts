import { TestBed } from '@angular/core/testing';

import { DaffTypeRoutePair } from '../model/type-route-pair';
import {
  DAFF_EXTERNAL_ROUTER_ROUTES_RESOLVABLE_BY_TYPE,
  daffProvideRouteResolvableByType,
} from './type-resolvable-routes.token';

describe('@daffodil/external-router | DAFF_EXTERNAL_ROUTER_ROUTES_RESOLVABLE_BY_TYPE', () => {
  let token: DaffTypeRoutePair[];

  it('should be an empty array by default', () => {
    TestBed.configureTestingModule({});
    token = TestBed.inject<DaffTypeRoutePair[]>(DAFF_EXTERNAL_ROUTER_ROUTES_RESOLVABLE_BY_TYPE);
    expect(token).toEqual([]);
  });

  it('allow you to provide a resolvable route type', () => {
    TestBed.configureTestingModule({
      providers: [
        daffProvideRouteResolvableByType('some-type', {
          redirectTo: 'somewhere',
        }),
      ],
    });

    token = TestBed.inject<DaffTypeRoutePair[]>(DAFF_EXTERNAL_ROUTER_ROUTES_RESOLVABLE_BY_TYPE);
    expect(token).toEqual([
      {
        type: 'some-type',
        route: {
          redirectTo: 'somewhere',
        },
      },
    ]);
  });
});