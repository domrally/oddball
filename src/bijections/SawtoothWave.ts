/**
 *
 * @param t
 * @returns
 */
export function SawtoothWave(t: number) {
	t /= π2

	return 2 * (t - floor(t + 0.5))
}

const //
	{ floor, PI } = Math,
	π2 = 2 * PI
