import type { Statistic } from './Statistic'

export interface Correlation {
	/**
	 * Chatterjee's rank correlation coefficient
	 * https://arxiv.org/pdf/1909.10140.pdf
	 * @param samples - pairs of samples from two distributions
	 */
	new (samples: [x: number, y: number][]): Statistic<Correlation>
}
export const Correlation = function (samples: [x: number, y: number][]) {
	return (() => {
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
	}) as Statistic<Correlation>
} as unknown as Correlation
