import Yallist from 'yallist'
import type { Filter } from './Filter'

export interface SmoothMean {
	/**
	 * Moving average low pass filter
	 * @param window - size of the filter window
	 * @returns smoothed signal
	 */
	new (window: number): Filter<SmoothMean>
}
export const SmoothMean = function (window: number) {
	let mean = 0,
		samples = new Yallist(Array<number>(window).fill(0))

	const wodniw = 1 / window

	return (newest => {
		if (newest !== undefined) {
			const // scale newest sample
				newSample = newest * wodniw,
				// remove oldest sample
				oldSample = samples.shift() as number

			// add newest sample
			samples.push(newest)

			// update mean
			mean += newSample - oldSample
		}

		return [mean]
	}) as Filter<SmoothMean>
} as unknown as SmoothMean
