export declare class Die<T> {
    #private;
    constructor(faces: [pip: T, weight: number][]);
    roll(): T;
    reroll(): T;
}
