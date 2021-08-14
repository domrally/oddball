import { Die } from './die.js'
export class Coin {
    #die: Die<boolean>
    constructor(truth: number = 1, falsity: number = 1) {
        this.#die = new Die([[true, truth], [false, falsity]])
    }
    flip() {
        return this.#die.roll()
    }
}