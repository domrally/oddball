export class Coin {
  // generate one bit of cryptographic pseudo-randomness
  #getRandomBoolean() {
    const integers = new Uint32Array(1);
    const [random] = crypto.getRandomValues(integers);
    return !!(random % 2);
  }
  // flip the coin fairly
  // https://en.wikipedia.org/wiki/Fair_coin#Fair_results_from_a_biased_coin
  // von Neumann, John(1951)."Various techniques used in connection with random digits". National Bureau of Standards Applied Math Series. 12: 36.
  toss() {
    let bit;
    do {
      bit = this.#getRandomBoolean();
    } while (bit === this.#getRandomBoolean());
    return bit;
  }
}
