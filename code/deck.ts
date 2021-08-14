import { Die } from './die.js'
export class Deck<T> extends Array<T> {
    #dice: Die<number>[]
    #cards: T[]
    constructor(...cards: T[]) {
        super(...cards)
        this.#cards = cards
        this.#dice = cards.slice(0, -1).map((_, i) => {
            const faces = new Array(cards.length - i)
            const pips = faces.map<[number, number]>((_, j) => [i + j, 1])
            return new Die(pips)
        })
    }
    // To shuffle an array a of n elements(indices 0..n - 1):
    // random integer such that i ≤ j < n
    shuffle() {
        for (let i = 0; i < this.#cards.length - 1; i++) {
            const j = this.#dice[i].roll();
            [this.#cards[i], this.#cards[j]] = [this.#cards[j], this.#cards[i]]
        }
    }
    reshuffle() {
        for (let i = 0; i < this.#cards.length - 1; i++) {
            const j = this.#dice[i].reroll();
            [this.#cards[i], this.#cards[j]] = [this.#cards[j], this.#cards[i]]
        }
    }
    draw(n: number) {
        return this.#cards.splice(-n)
    }
    pick() {
        const index = this.#dice[0].roll()
        const [card] = this.#cards.splice(index, 1)
        return card
    }
    #pile: T[] = []
    discard(card: T) {
        const a = new Array(this.#pile.length + 1)
        const d = a.map<[number, number]>((_, i) => [i, 1])
        const die = new Die<number>(d)
        const j = die.roll()
        let c = card
        if (j < this.#pile.length) {
            c = this.#pile[j]
            this.#pile[j] = card
        }
        this.#pile.push(c)
    }
}