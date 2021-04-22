import { DaffCategoryFilterType } from '../category-filter-type';

/**
 * A request used to toggle the applied status of a {@link DaffCategoryFilterEqual}.
 */
export interface DaffCategoryFilterEqualToggleRequest {
	type: DaffCategoryFilterType.Equal;
	name: string;
	value: string;
}