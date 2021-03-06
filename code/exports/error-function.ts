import {a} from '../modules/constants.js';
import {inverseErrorFunction} from '../modules/inverse-error-fucntion.js';
// https://en.wikipedia.org/wiki/Error_function#Approximation_with_elementary_functions
//
//  â¢ approximation is given by Sergei Winitzki
//    using his "global PadÃ© approximations":
type t = (x: number) => number;
export const errorFunction: t & {inverse: t} = (x = 0) => {
  const {PI: Ï, exp, sign, sqrt} = Math,
    //
    //   ð¥Â²
    xx = x * x,
    //
    //    ð   ð¥Â²
    axx = a * xx,
    //
    //      ðð¥Â² + 1
    denom = axx + 1,
    //
    //    ðð¥Â² + 4 â± Ï
    num = axx + 4 / Ï,
    //
    //              â­       4/Ï + ðð¥Â²   â®
    //       1 -    â -ð¥Â² âââââââââââââ â
    //           e  â°        1 + ðð¥Â²    â¯
    square = 1 - exp((-xx * num) / denom);
  //
  //                ââââââââââââââââââââââââ
  //                â      â­     4/Ï + ðð¥Â²  â®
  // erf ð¥ â sgn ð¥ ââ 1 -  â-ð¥Â² âââââââââââ â
  //               ââ«     eâ°      1 + ðð¥Â²   â¯
  return sign(x) * sqrt(square);
};

errorFunction.inverse = inverseErrorFunction;
