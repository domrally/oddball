import type { Filter } from './Filter'

export interface SmoothExponent {
	/**
	 * Exponential moving average low pass filter
	 * @param amount - 0 to 1
	 * @returns smoothed signal
	 */
	new (amount: number): Filter<SmoothExponent>
}
export const SmoothExponent = function (amount: number) {
	let out = 0

	return (sample => {
		if (sample !== undefined) {
			out *= 1 - amount
			out += sample * amount
		}

		return [out]
	}) as Filter<SmoothExponent>
} as unknown as SmoothExponent
