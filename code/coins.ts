export class Coin {
  // generate one bit of cryptographic pseudo-randomness
  #getRandomBit() {
    const bits = new Uint32Array(1);
    const [bit] = crypto.getRandomValues(bits);
    return !!(bit % 2);
  }
  // flip the coin by unbiasing the entropy
  // https://en.wikipedia.org/wiki/Fair_coin#Fair_results_from_a_biased_coin
  // von Neumann, John(1951)."Various techniques used in connection with random digits". National Bureau of Standards Applied Math Series. 12: 36.
  toss() {
    let bit;
    do {
      bit = this.#getRandomBit();
    } while (bit === this.#getRandomBit());
    return bit;
  }
}
