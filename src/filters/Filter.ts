/**
 * algorithm for changing the online signal
 */
export type Filter<
	F extends {
		new (_: number): Filter<F>
		(_?: number): number
	}
> = F & {
	[key: PropertyKey]: any
}
