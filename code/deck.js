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
var _Deck_dice, _Deck_cards, _Deck_pile;
import { Die } from './die.js';
export class Deck extends Array {
    constructor(...cards) {
        super(...cards);
        _Deck_dice.set(this, void 0);
        _Deck_cards.set(this, void 0);
        _Deck_pile.set(this, []);
        __classPrivateFieldSet(this, _Deck_cards, cards, "f");
        __classPrivateFieldSet(this, _Deck_dice, cards.slice(0, -1).map((_, i) => {
            const faces = new Array(cards.length - i);
            const pips = faces.map((_, j) => [i + j, 1]);
            return new Die(pips);
        }), "f");
    }
    // To shuffle an array a of n elements(indices 0..n - 1):
    // random integer such that i ≤ j < n
    shuffle() {
        for (let i = 0; i < __classPrivateFieldGet(this, _Deck_cards, "f").length - 1; i++) {
            const j = __classPrivateFieldGet(this, _Deck_dice, "f")[i].roll();
            [__classPrivateFieldGet(this, _Deck_cards, "f")[i], __classPrivateFieldGet(this, _Deck_cards, "f")[j]] = [__classPrivateFieldGet(this, _Deck_cards, "f")[j], __classPrivateFieldGet(this, _Deck_cards, "f")[i]];
        }
    }
    reshuffle() {
        for (let i = 0; i < __classPrivateFieldGet(this, _Deck_cards, "f").length - 1; i++) {
            const j = __classPrivateFieldGet(this, _Deck_dice, "f")[i].reroll();
            [__classPrivateFieldGet(this, _Deck_cards, "f")[i], __classPrivateFieldGet(this, _Deck_cards, "f")[j]] = [__classPrivateFieldGet(this, _Deck_cards, "f")[j], __classPrivateFieldGet(this, _Deck_cards, "f")[i]];
        }
    }
    draw(n) {
        return __classPrivateFieldGet(this, _Deck_cards, "f").splice(-n);
    }
    pick() {
        const index = __classPrivateFieldGet(this, _Deck_dice, "f")[0].roll();
        const [card] = __classPrivateFieldGet(this, _Deck_cards, "f").splice(index, 1);
        return card;
    }
    discard(card) {
        const a = new Array(__classPrivateFieldGet(this, _Deck_pile, "f").length + 1);
        const d = a.map((_, i) => [i, 1]);
        const die = new Die(d);
        const j = die.roll();
        let c = card;
        if (j < __classPrivateFieldGet(this, _Deck_pile, "f").length) {
            c = __classPrivateFieldGet(this, _Deck_pile, "f")[j];
            __classPrivateFieldGet(this, _Deck_pile, "f")[j] = card;
        }
        __classPrivateFieldGet(this, _Deck_pile, "f").push(c);
    }
}
_Deck_dice = new WeakMap(), _Deck_cards = new WeakMap(), _Deck_pile = new WeakMap();
