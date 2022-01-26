import {a} from '../modules/constants.js';
import { inverseErrorFunction } from '../modules/inverse-error-fucntion.js'
// https://en.wikipedia.org/wiki/Error_function#Approximation_with_elementary_functions
//
//  • approximation is given by Sergei Winitzki
//    using his "global Padé approximations":
type t = (x: number) => number;
export const errorFunction: t & { inverse: t } = (x = 0) => {
  const {PI: π, exp, sign, sqrt} = Math,
    //
    //   𝑥²
    xx = x * x,
    //
    //    𝑎   𝑥²
    axx = a * xx,
    //
    //      𝑎𝑥² + 1
    denom = axx + 1,
    //
    //    𝑎𝑥² + 4 ╱ π
    num = axx + 4 / π,
    //
    //              ╭       4/π + 𝑎𝑥²   ╮
    //       1 -    │ -𝑥² ───────────── │
    //           e  ╰        1 + 𝑎𝑥²    ╯
    square = 1 - exp((-xx * num) / denom);
  //
  //                ┏━━━━━━━━━━━━━━━━━━━━━━━
  //                ┃      ╭     4/π + 𝑎𝑥²  ╮
  // erf 𝑥 ≈ sgn 𝑥 ┓┃ 1 -  │-𝑥² ─────────── │
  //               ┗┫     e╰      1 + 𝑎𝑥²   ╯
  return sign(x) * sqrt(square);
};

errorFunction.inverse = inverseErrorFunction
