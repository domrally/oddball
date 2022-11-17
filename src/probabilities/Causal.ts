import { Conditional } from './Conditional'
import type { Probability } from './Probability'

export interface Causal<T = any> {
	/**
	 * ℙ effect <- cause
	 * Probability of observing the effect after intervention
	 * @param samples - intervention, mediation, and outcome observations
	 */
	new <T>(
		samples: [interventions: T, ...mediators: T[], outcomes: T][]
	): Probability<Causal, T>
}

export const Causal = function <T>(
	samples: [interventions: T, ...mediators: T[], outcomes: T][]
) {
	return ((causes, effects) => {
		// FRONT DOOR ADJUSTMENT
		// https://www.ams.org/journals/notices/201907/rnoti-p1093.pdf

		let causal = 0,
			conditional = new Conditional(samples),
			mediations = new Set(samples.flatMap(sample => sample.slice(1, -1))),
			interventions = new Set(samples.flatMap(([sample]) => sample))

		// sum over mediation effects
		for (const mediation of mediations) {
			// sum over interventions counterfactual to the hypothesis
			let counterfactual = 0
			for (const intervention of interventions) {
				counterfactual +=
					// marginal probability of observing counterfactual intervention
					conditional([intervention]) *
					// probability of observing non causal effects
					conditional([intervention, mediation], effects)
			}
			// probability of observing causal mediation
			const mediator = conditional(causes, [mediation])

			causal += mediator * counterfactual
		}
		return causal
	}) as Probability<Causal>
} as unknown as Causal
