/**
 * algorithm for changing the online signal
 */
export type Statistic<
	S extends {
		new (): Statistic<S>
		(_: [x: number, y: number][]): number
	}
> = S & {
	[key: PropertyKey]: any
}
