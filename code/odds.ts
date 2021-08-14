export class Odds {
    #favor: number
    #against: number
    constructor(favor: number, against: number) {
        this.#favor = favor
        this.#against = against
    }
    static BayesRule(prior: Odds, likelihood: Odds) {
        return prior.#favor * likelihood.#favor / (prior.#against * likelihood.#against)
    }
    static OddsRatio(numerator: Odds, denominator: Odds) {
        return numerator.#favor * denominator.#against / (numerator.#against * denominator.#favor)
    }
}