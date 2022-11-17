import type { Filter } from './Filter'

export interface SharpenExponent {
	/**
	 * High pass filter with exponential falloff
	 * @param amount - 0 to 1
	 * @returns sharpened signal
	 */
	new (amount: number): Filter<SharpenExponent>
}
export const SharpenExponent = function (amount: number) {
	let old = 0,
		sharp = 0,
		s = 1 - amount

	return (sample => {
		if (sample !== undefined) {
			// sharpen sample
			sharp += sample - old
			sharp *= s

			// save sample for next iteration
			old = sample
		}

		return [sharp]
	}) as Filter<SharpenExponent>
} as unknown as SharpenExponent
