enum Sides {
  Heads,
  Tails,
}
export class Coin {
  // generate one bit of cryptographic pseudo-randomness
  #entropy() {
    let entropy = new Uint32Array(1);
    entropy = crypto.getRandomValues(entropy);
    return entropy[0] % 2 ? Sides.Heads : Sides.Tails;
  }
  // flip the coin by unbiasing the entropy
  // https://en.wikipedia.org/wiki/Fair_coin#Fair_results_from_a_biased_coin
  // von Neumann, John(1951)."Various techniques used in connection with random digits". National Bureau of Standards Applied Math Series. 12: 36.
  toss() {
    let upside: Sides;
    do {
      upside = this.#entropy();
    } while (this.#entropy() === upside);
    return upside;
  }
}
