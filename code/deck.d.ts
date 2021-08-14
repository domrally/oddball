export declare class Deck<T> extends Array<T> {
    #private;
    constructor(...cards: T[]);
    shuffle(): void;
    reshuffle(): void;
    draw(n: number): T[];
    pick(): T;
    discard(card: T): void;
}
