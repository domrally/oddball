// https://en.wikipedia.org/wiki/Error_function#Approximation_with_elementary_functions
const {PI: π} = Math;
//
// accurate in a neighborhood of 0 and ∞
// relative error less than 0.00035
//   8   (π - 3)
//  ───────────── ≈ 0.140012
//   3π  (4 - π)
export const a = (8 * (π - 3)) / (3 * π * (4 - π));
//
// alternate value reduces the maximum
// relative error to about 0.00013
export const aₐ = 0.147;
