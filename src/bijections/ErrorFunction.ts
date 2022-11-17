/**
 *
 */
export interface ErrorFunction {
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

export const ErrorFunction = function (x = 0) {
	// https://en.wikipedia.org/wiki/Error_function#Approximation_with_elementary_functions
	// approximation is given by Sergei Winitzki using his "global Padé approximations"
	//                ┏━━━━━━━━━━━━━━━━━━━━━━━
	//                ┃      ╭     4/π + 𝑎𝑥²  ╮
	// erf 𝑥 ≈ sgn 𝑥 ┓┃ 1 -  │-𝑥² ─────────── │
	//               ┗┫     e╰      1 + 𝑎𝑥²   ╯
	const xx = x * x,
		axx = a * xx,
		denom = axx + 1,
		num = axx + 4 / π,
		square = 1 - exp((-xx * num) / denom)

	return sign(x) * sqrt(square)
} as ErrorFunction

ErrorFunction.inverse = function (x = 0) {
	//                  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
	//                  ┃  ┌───────────────────────────────
	//                  ┃  │╭ 2      ln 1-𝑥² ╮²   ln 1-𝑥²      2      ln 1-𝑥²
	// erf⁻¹ 𝑥 ≈ sgn 𝑥 ┓┃ ┐││──── + ─────────│ - ─────────  - ──── + ─────────
	//                 ┗┫ └┤╰ π𝑎        2    ╯       𝑎         π𝑎        2
	const two_πa = 2 / (π * a),
		ln_1_xx = ln(1 - x * x),
		sum = two_πa + ln_1_xx / 2,
		inner = sqrt(sum * sum - ln_1_xx / a)

	return sign(x) * sqrt(inner - sum)
}

const { exp, PI: π, log: ln, sign, sqrt } = Math,
	/**
	 * accurate in a neighborhood of 0 and ∞
	 * relative error less than 0.00035
	 *   8   (π - 3)
	 *  ───────────── ≈ 0.140012
	 *   3π  (4 - π)
	 */
	a = (8 * (π - 3)) / (3 * π * (4 - π))
