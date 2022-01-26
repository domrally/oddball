import {a} from './constants.js';
// https://en.wikipedia.org/wiki/Error_function#Approximation_with_elementary_functions
//
//  • approximation is given by Sergei Winitzki
//    using his "global Padé approximations":
export const inverseErrorFunction = (x = 0) => {
  const {PI: π, log: ln, sign, sqrt} = Math,
    //
    //       2
    //      ────
    //       π𝑎
    two_πa = 2 / (π * a),
    //
    //        ln 1 - 𝑥²
    ln_1_xx = ln(1 - x * x),
    //
    //    2         ln 1-𝑥²
    //   ────    + ─────────
    //    π𝑎           2
    sum = two_πa + ln_1_xx / 2,
    //
    //  ┌───────────────────────────────
    //  │╭ 2      ln 1-𝑥² ╮²   ln 1-𝑥²
    // ┐││──── + ─────────│ - ─────────
    // └┤╰ π𝑎        2    ╯       𝑎
    inner = sqrt(sum * sum - ln_1_xx / a);
  //
  //                  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //                  ┃  ┌───────────────────────────────
  //                  ┃  │╭ 2      ln 1-𝑥² ╮²   ln 1-𝑥²      2      ln 1-𝑥²
  // erf⁻¹ 𝑥 ≈ sgn 𝑥 ┓┃ ┐││──── + ─────────│ - ─────────  - ──── + ─────────
  //                 ┗┫ └┤╰ π𝑎        2    ╯       𝑎         π𝑎        2
  return sign(x) * sqrt(inner - sum);
};
