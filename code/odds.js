var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Odds_favor, _Odds_against;
export class Odds {
    constructor(favor, against) {
        _Odds_favor.set(this, void 0);
        _Odds_against.set(this, void 0);
        __classPrivateFieldSet(this, _Odds_favor, favor, "f");
        __classPrivateFieldSet(this, _Odds_against, against, "f");
    }
    static BayesRule(prior, likelihood) {
        return __classPrivateFieldGet(prior, _Odds_favor, "f") * __classPrivateFieldGet(likelihood, _Odds_favor, "f") / (__classPrivateFieldGet(prior, _Odds_against, "f") * __classPrivateFieldGet(likelihood, _Odds_against, "f"));
    }
    static OddsRatio(numerator, denominator) {
        return __classPrivateFieldGet(numerator, _Odds_favor, "f") * __classPrivateFieldGet(denominator, _Odds_against, "f") / (__classPrivateFieldGet(numerator, _Odds_against, "f") * __classPrivateFieldGet(denominator, _Odds_favor, "f"));
    }
}
_Odds_favor = new WeakMap(), _Odds_against = new WeakMap();
