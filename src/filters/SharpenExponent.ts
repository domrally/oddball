import type { Filter } from './Filter'

/**
 * High pass filter with exponential falloff
 * @param amount - 0 to 1
 * @returns sharpened signal
 */
export const SharpenExponent = function (amount: number) {
	let old = 0,
		sharp = 0,
		s = 1 - amount

	return (sample => {
		if (sample !== undefined) {
			// sharpen sample
			sharp += sample - old
			sharp *= s

			// save sample for next iteration
			old = sample
		}

		return sharp
	}) as SharpenExponent
} as unknown as SharpenExponent

/**
 * Probability of observing the effect after intervention
 */
export interface SharpenExponent {
	/**
	 * Creates a new causal probability function
	 * @param samples - intervention, mediation, and effect observations
	 */
	new (window: number): Filter<SharpenExponent>

	/**
	 * Probability of observing the effect after intervention
	 * @param events - intervention, mediation, and effect factuals
	 * @returns ℙ effect <- cause
	 */
	(sample?: number): number
}
