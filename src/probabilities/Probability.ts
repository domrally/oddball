/**
 * Chance of observation
 */
export type Probability<
	P extends {
		new (
			samples: [interventions: T, ...mediators: T[], outcomes: T][]
		): Probability<P, T>
	},
	T = any
> = P & {
	/**
	 *
	 */
	(causes: T[], effects?: T[]): number
}
