import type { Probability } from './Probability'

/**
 * Probability of observing the effect in a given subset
 */
export interface Conditional<T = any> {
	/**
	 * Creates a new conditional probability function
	 * @param samples - condition and effect observations
	 */
	new <T>(samples: T[][]): Probability<T, Conditional<T>>

	/**
	 * Probability of observing the effect in a given subset
	 * @param events - condition and effect factuals
	 * @returns ℙ effect | subset
	 */
	(...events: T[]): number
}

export const Conditional = function (samples: [][]) {
	return ((...events) => {
		// CONDITIONAL PROBABILITY
		// https://en.wikipedia.org/wiki/Conditional_probability

		const // conditioned subset
			subset = samples.filter(sample =>
				sample.slice(0, -1).every((condition, i) => condition === events[i])
			),
			// size of the affected subset
			pop = events.pop()

		return pop
			? subset.filter(sample => pop === sample.slice(-2, -1)?.[0]).length /
					(subset.length | 1)
			: subset.length / samples.length
	}) as Conditional
} as unknown as Conditional
