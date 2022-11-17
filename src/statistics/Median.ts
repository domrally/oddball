import type { Statistic } from './Statistic'

/**
 * https://arxiv.org/pdf/1909.10140.pdf
 * @param samples pairs of samples from two distributions
 * @returns Chatterjee's correlation coefficient
 */
export const Median = function () {
	// return (samples => {
	// 	const median = samples
	// 			// sort by y
	// 			.sort(([a], [b]) => a - b)
	// 	return median
	// }) as Median
} as unknown as Median

/**
 * Probability of observing the effect after intervention
 */
export interface Median {
	/**
	 * Creates a new causal probability function
	 * @param samples - intervention, mediation, and effect observations
	 */
	new (): Statistic<Median>

	/**
	 * Probability of observing the effect after intervention
	 * @param events - intervention, mediation, and effect factuals
	 * @returns ℙ effect <- cause
	 */
	(samples: [x: number, y: number][]): number
}
