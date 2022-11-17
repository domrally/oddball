import type { Probability } from './Probability'

export interface Conditional<T = any> {
	/**
	 * ℙ effect | subset
	 * Probability of observing the effect in a given subset
	 * @param samples - condition and effect observations
	 */
	new <T>(
		samples: [interventions: T, ...mediators: T[], outcomes: T][]
	): Probability<Conditional, T>
}

export const Conditional = function (samples: [][]) {
	return ((causes, effects) => {
		// CONDITIONAL PROBABILITY
		// https://en.wikipedia.org/wiki/Conditional_probability

		const // conditioned subset
			{ length } = causes,
			subset = samples.filter(sample =>
				sample.slice(0, length).every((x, i) => x === causes[i])
			)

		// affected subset
		return effects
			? subset.filter(sample =>
					sample.slice(length, 0).every((x, i) => x === effects[i])
			  ).length /
					(subset.length | 1)
			: subset.length / samples.length
	}) as Probability<Conditional>
} as unknown as Conditional
