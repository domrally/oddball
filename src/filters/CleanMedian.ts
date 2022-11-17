import Tree from 'functional-red-black-tree'
import type { Filter } from './Filter'

/**
 * Moving median filter
 * @param amount - 0 to 1
 * @returns denoised signal
 */
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

		return median
	}) as CleanMedian
} as unknown as CleanMedian

/**
 * Probability of observing the effect after intervention
 */
export interface CleanMedian {
	/**
	 * Creates a new causal probability function
	 * @param samples - intervention, mediation, and effect observations
	 */
	new (window: number): Filter<CleanMedian>

	/**
	 * Probability of observing the effect after intervention
	 * @param events - intervention, mediation, and effect factuals
	 * @returns ℙ effect <- cause
	 */
	(sample?: number): number
}
