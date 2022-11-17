import type { Statistic } from './Statistic'

/**
 * https://arxiv.org/pdf/1909.10140.pdf
 * @param samples pairs of samples from two distributions
 * @returns Chatterjee's correlation coefficient
 */
export const Correlation = function () {
	return (samples => {
		const //
			sum = samples
				// sort by y
				.sort(([a], [b]) => a - b)
				// rank of y
				.map(([x], rank) => [x, rank] as [number, number])
				// sort by x
				.sort(([c], [d]) => c - d)
				// rank of y sorted by x
				.map((_, i, ranks) => {
					if (i === 0) return null as unknown as [number, number]

					const //
						[, rank] = ranks[i] as [number, number],
						[, old] = ranks[i - 1] as [number, number]

					return [rank, old] as [number, number]
				})
				.slice(1)
				// sum of differences
				.reduce((sum, [rank, old]) => sum + Math.abs(rank - old), 0),
			{ length } = samples

		return 1 - (3 * sum) / (length * length - 1)
	}) as Correlation
} as unknown as Correlation

/**
 * Probability of observing the effect after intervention
 */
export interface Correlation {
	/**
	 * Creates a new causal probability function
	 * @param samples - intervention, mediation, and effect observations
	 */
	new (): Statistic<Correlation>

	/**
	 * Probability of observing the effect after intervention
	 * @param events - intervention, mediation, and effect factuals
	 * @returns ℙ effect <- cause
	 */
	(samples: [x: number, y: number][]): number
}
