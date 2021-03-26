import { ID } from '@daffodil/core';

import { DaffExternalRouteType } from './route-type';

/**
 * A `DaffExternallyResolvableUrl` describes the relationship between a "type" of route
 * as determined by an external platform and a URI.
 *
 * ```ts
 * export const resolvableRoute: DaffExternallyResolvableUrl = {
 *  id: "id-of-resource",
 * 	url: "some/path/to-a-resource",
 * 	type: "RESOURCE_TYPE"
 * }
 * ```
 */
export interface DaffExternallyResolvableUrl {
  id: ID;
	url: string;
	type: DaffExternalRouteType;
}