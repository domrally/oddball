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
var _Die_instances, _Die_sampler, _Die_phase, _Die_pips, _Die_roll;
const phi = Math.sqrt(1.25) - .5;
const sum = (numbers) => {
    const summer = (sum, value) => sum + value;
    return numbers.reduce(summer);
};
const bit_length = (n) => n.toString(2).length;
const flip = () => crypto.getRandomValues(new Uint32Array(1))[0] % 2;
export class Die {
    constructor(faces) {
        _Die_instances.add(this);
        _Die_sampler.set(this, void 0);
        _Die_phase.set(this, 0);
        _Die_pips.set(this, void 0);
        __classPrivateFieldSet(this, _Die_pips, faces.map(s => s[0]), "f");
        const weights = faces.map(s => s[1]);
        const numberOfSides = weights.length;
        const totalWeight = sum(weights);
        const bitLength = bit_length(totalWeight - 1);
        const unusedBits = (1 << bitLength) - totalWeight;
        const h = Array(bitLength).fill(0);
        const H = Array(numberOfSides + 1).fill(h).map(() => Array(bitLength).fill(-1));
        for (let j = 0; j < bitLength; j++) {
            let d = 0;
            for (let i = 0; i < numberOfSides; i++) {
                const w = (weights[i] >> ((bitLength - 1) - j)) & 1;
                if (w <= 0)
                    continue;
                h[j]++;
                H[d][j] = i;
                d++;
            }
            const w = (unusedBits >> ((bitLength - 1) - j)) & 1;
            if (w <= 0)
                continue;
            h[j]++;
            H[d][j] = numberOfSides;
        }
        __classPrivateFieldSet(this, _Die_sampler, { numberOfSides, totalWeight, bitLength, unusedBits, h, H }, "f");
    }
    // samples the dice faces with maximum entropy
    roll() {
        __classPrivateFieldSet(this, _Die_phase, __classPrivateFieldGet(this, _Die_instances, "m", _Die_roll).call(this), "f");
        return __classPrivateFieldGet(this, _Die_pips, "f")[__classPrivateFieldGet(this, _Die_phase, "f")];
    }
    // samples the dice faces by minimizing discrepancy and maximizing entropy
    // https://en.wikipedia.org/wiki/Low-discrepancy_sequence#Random_numbers
    reroll() {
        const { numberOfSides: n } = __classPrivateFieldGet(this, _Die_sampler, "f");
        const phylotaxis = phi * n;
        const random = __classPrivateFieldGet(this, _Die_instances, "m", _Die_roll).call(this);
        __classPrivateFieldSet(this, _Die_phase, __classPrivateFieldGet(this, _Die_phase, "f") + (random + phylotaxis), "f");
        __classPrivateFieldSet(this, _Die_phase, __classPrivateFieldGet(this, _Die_phase, "f") % n, "f");
        const index = Math.floor(__classPrivateFieldGet(this, _Die_phase, "f"));
        return __classPrivateFieldGet(this, _Die_pips, "f")[index];
    }
}
_Die_sampler = new WeakMap(), _Die_phase = new WeakMap(), _Die_pips = new WeakMap(), _Die_instances = new WeakSet(), _Die_roll = function _Die_roll() {
    const { numberOfSides, h, H } = __classPrivateFieldGet(this, _Die_sampler, "f");
    if (numberOfSides === 1)
        return 0;
    let d = 0;
    let c = 0;
    while (true) {
        const b = flip();
        d = 2 * d + (1 - b);
        if (d < h[c]) {
            const z = H[d][c];
            if (z < numberOfSides) {
                return z;
            }
            else {
                d = 0;
                c = 0;
            }
        }
        else {
            d = d - h[c];
            c = c + 1;
        }
    }
};
