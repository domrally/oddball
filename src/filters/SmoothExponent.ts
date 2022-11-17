import type { Filter } from './Filter'

/**
 * Exponential moving average low pass filter
 * @param amount - 0 to 1
 * @returns smoothed signal
 */
export const SmoothExponent = function (amount: number) {
	let out = 0

	return (sample => {
		if (sample !== undefined) {
			out *= 1 - amount
			out += sample * amount
		}

		return out
	}) as SmoothExponent
} as unknown as SmoothExponent

/**
 * Probability of observing the effect after intervention
 */
export interface SmoothExponent {
	/**
	 * Creates a new causal probability function
	 * @param samples - intervention, mediation, and effect observations
	 */
	new (window: number): Filter<SmoothExponent>

	/**
	 * Probability of observing the effect after intervention
	 * @param events - intervention, mediation, and effect factuals
	 * @returns ℙ effect <- cause
	 */
	(sample?: number): number
}
