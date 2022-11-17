import { Conditional } from './Conditional'
import type { Probability } from './Probability'

export const Factor = function <T>(samples: T[][]) {
	const conditional = new Conditional(samples)

	return ((...events) => {
		const //
			odds = conditional(...events),
			against = conditional(...events),
			p = odds / (odds + 1),
			q = against / (against + 1)

		return p / q
	}) as Factor
} as unknown as Factor

/**
 * Odds likelihood of a given subset
 */
export interface Factor {
	/**
	 * Creates a new factor function
	 * @param samples - condition and effect observations
	 */
	new <T>(samples: T[][]): Probability<T, Factor>

	/**
	 * Odds likelihood of a given subset
	 * @param events - condition and effect factuals
	 * @returns ℙ effect | subset
	 */
	(...events: any[]): number
}
