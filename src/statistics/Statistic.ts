/**
 * algorithm for changing the online signal
 */
export type Statistic<
	S extends {
		new (samples: [x: number, y: number][]): Statistic<S>
	}
> = S & {
	/**
	 *
	 */
	(): number
}
