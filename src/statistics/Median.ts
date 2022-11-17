import type { Statistic } from './Statistic'

export interface Median {
	/**
	 *
	 */
	new (samples: [x: number, y?: number][]): Statistic<Median>
}
export const Median = function (samples: [x: number, y?: number][]) {
	return (() => {
		const [median] = samples.sort(([a], [b]) => a - b)[0] as [
			x: number,
			y?: number
		]

		return median
	}) as Statistic<Median>
} as unknown as Median
