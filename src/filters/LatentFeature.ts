import type { Filter } from './Filter'

export interface LatentFeature {
	/**
	 * High pass filter with exponential falloff
	 * @param amount - 0 to 1
	 * @returns sharpened signal
	 */
	new (amount: number): Filter<LatentFeature>
}
export const LatentFeature = function (_amount: number) {
	let feature = 0

	// 1st the signal is delay embedded into n dimensions
	// the result is a diffeomorphism of the latent phase space

	// 2nd perform principal component analysis on the phase signal
	// this changes the basis to the latent feature space

	// 3rd return the requested principal component
	// this will extract the n-th most variable feature

	return (sample => {
		if (sample !== undefined) {
			feature = 0
		}

		return [feature]
	}) as Filter<LatentFeature>
} as unknown as LatentFeature
