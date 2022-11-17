/**
 * algorithm for changing the online signal
 */
export type Bijection<
	B extends {
		new (_: number): Bijection<B>
		/**
		 *
		 */
		(x: number): number
		/**
		 *
		 * @param x
		 */
		inverse(x: number): number
	}
> = B & {
	[key: PropertyKey]: any
}
