import Tree from 'functional-red-black-tree'
import type { Filter } from './Filter'

export interface CleanMedian {
	/**
	 * Moving median filter
	 * @param window - 0 to 1
	 * @returns denoised signal
	 */
	new (window: number): Filter<CleanMedian>
}
export const CleanMedian = function (window: number) {
	let oldest = 0,
		median: number,
		tree = Tree<number, number>()

	for (let i = 0; i < window; i++) {
		tree = tree.insert(0, i)
	}

	return (sample => {
		if (sample !== undefined) {
			// sort newest into list and remove oldest
			tree = tree.insert(sample, oldest++)
			oldest %= window

			// find median
			const index = Math.floor(window / 2)
			median = tree.at(index).key as number
		}

		return [median]
	}) as Filter<CleanMedian>
} as unknown as CleanMedian
