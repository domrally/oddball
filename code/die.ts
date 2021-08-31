import { Coin } from "./coins"

const phi = Math.sqrt(1.25) - .5
const sum = (numbers: number[]) => {
    const summer = (sum: number, value: number) => sum + value
    return numbers.reduce(summer)
}
const bit_length = (n: number) => n.toString(2).length

// https://arxiv.org/pdf/2003.03830.pdf
// https://github.com/probcomp/fast-loaded-dice-roller/blob/master/src/python/fldr.py
export class Die<T> {
    #sampler: {
        numberOfSides: number
        totalWeight: number
        bitLength: number
        unusedBits: number
        h: number[]
        H: number[][]
    }
    #phase = 0
    #pips: T[]
    constructor(faces: [pip: T, weight: number][]) {
        this.#pips = faces.map(s => s[0])
        const weights = faces.map(s => s[1])
        const numberOfSides = weights.length
        const totalWeight = sum(weights)
        const bitLength = bit_length(totalWeight - 1)
        const unusedBits = (1 << bitLength) - totalWeight
        const h = Array<number>(bitLength).fill(0)
        const H = Array<number[]>(numberOfSides + 1).fill(h).map(() => Array<number>(bitLength).fill(-1))
        for (let j = 0; j < bitLength; j++) {
            let d = 0
            for (let i = 0; i < numberOfSides; i++) {
                const w = (weights[i] >> ((bitLength - 1) - j)) & 1
                if (w <= 0) continue
                h[j]++
                H[d][j] = i
                d++
            }
            const w = (unusedBits >> ((bitLength - 1) - j)) & 1
            if (w <= 0) continue
            h[j]++
            H[d][j] = numberOfSides
        }
        this.#sampler = { numberOfSides, totalWeight, bitLength, unusedBits, h, H }
    }
    #roll() {
        const { numberOfSides, h, H } = this.#sampler
        if (numberOfSides === 1) return 0
        let d = 0
        let c = 0
        const coin = new Coin()
        while (true) {
            const b = coin.toss()
            d = 2 * d + (1 - b)
            if (d < h[c]) {
                const z = H[d][c]
                if (z < numberOfSides) {
                    return z
                } else {
                    d = 0
                    c = 0
                }
            } else {
                d = d - h[c]
                c = c + 1
            }
        }
    }
    // samples the dice faces with maximum entropy
    roll() {
        this.#phase = this.#roll()
        return this.#pips[this.#phase]
    }
    // samples the dice faces by minimizing discrepancy and maximizing entropy
    // https://en.wikipedia.org/wiki/Low-discrepancy_sequence#Random_numbers
    reroll() {
        const { numberOfSides: n } = this.#sampler
        const phylotaxis = phi * n
        const random = this.#roll()
        this.#phase += random + phylotaxis
        this.#phase %= n
        const index = Math.floor(this.#phase)
        return this.#pips[index]
    }
}