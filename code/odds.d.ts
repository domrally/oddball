export declare class Odds {
    #private;
    constructor(favor: number, against: number);
    static BayesRule(prior: Odds, likelihood: Odds): number;
    static OddsRatio(numerator: Odds, denominator: Odds): number;
}
