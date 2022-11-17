/**
 * Chance of observation
 */
export type Probability<
	T,
	P extends {
		new (_: T[][]): Probability<T, P>
		(..._: T[]): number
	}
> = P & {
	[key: PropertyKey]: any
}
