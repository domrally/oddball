import Yallist from 'yallist'
import type { Filter } from './Filter'

/**
 * Moving average low pass filter
 * @param window - size of the filter window
 * @returns smoothed signal
 */
export const SmoothMean = function (window: number) {
	let mean = 0,
		samples = new Yallist(Array<number>(window).fill(0))

	const wodniw = 1 / window

	return (newest => {
		if (newest !== undefined) {
			const // scale newest sample
				newSample = newest * wodniw,
				// remove oldest sample
				oldSample = samples.shift() as number

			// add newest sample
			samples.push(newest)

			// update mean
			mean += newSample - oldSample
		}

		return mean
	}) as SmoothMean
} as unknown as SmoothMean

/**
 * Probability of observing the effect after intervention
 */
export interface SmoothMean {
	/**
	 * Creates a new causal probability function
	 * @param samples - intervention, mediation, and effect observations
	 */
	new (window: number): Filter<SmoothMean>

	/**
	 * Probability of observing the effect after intervention
	 * @param events - intervention, mediation, and effect factuals
	 * @returns ℙ effect <- cause
	 */
	(sample?: number): number
}
