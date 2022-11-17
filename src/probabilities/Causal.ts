import { Conditional } from './Conditional'
import type { Probability } from './Probability'

export const Causal = function <T>(samples: T[][]) {
	return ((...events) => {
		// FRONT DOOR ADJUSTMENT
		// https://www.ams.org/journals/notices/201907/rnoti-p1093.pdf

		let causal = 0,
			effect = events.pop(),
			conditional = new Conditional(samples),
			mediations = new Set(samples.map(sample => sample.slice(0, -1).pop())),
			interventions = new Set(samples.map(sample => sample.slice(0, -2)))

		// sum over mediation effects
		for (const mediation of mediations) {
			// sum over interventions counterfactual to the hypothesis
			let counterfactual = 0
			for (const intervention of interventions) {
				counterfactual +=
					// marginal probability of observing counterfactual intervention
					conditional(...intervention, null as T) *
					// probability of observing non causal effects
					conditional(...intervention, mediation as T, effect)
			}
			// probability of observing causal mediation
			const mediator = conditional(...events, mediation as T)

			causal += mediator * counterfactual
		}
		return causal
	}) as Causal
} as unknown as Causal

/**
 * Probability of observing the effect after intervention
 */
export interface Causal<T = any> {
	/**
	 * Creates a new causal probability function
	 * @param samples - intervention, mediation, and effect observations
	 */
	new <T>(samples: T[][]): Probability<T, Causal<T>>

	/**
	 * Probability of observing the effect after intervention
	 * @param events - intervention, mediation, and effect factuals
	 * @returns ℙ effect <- cause
	 */
	(...events: T[]): number
}
