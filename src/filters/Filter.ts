/**
 * Algorithm for changing the online signal
 */
export type Filter<
	F extends {
		new (_: number): Filter<F>
	}
> = F & {
	/**
	 * Add next sample point or return the current filtered value
	 * @param sample - amplitude of the signal at a discrete point in time
	 * @returns filtered signal
	 */
	(sample?: number): number[]
}
