export class Modular extends Number {

    constructor() {
        super()
        return new Proxy<Number>(5, {})
    }

    static readonly Modulo = (n: number, m: number) => (n % m + m) % m
}