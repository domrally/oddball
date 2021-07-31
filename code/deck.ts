const shuffle = (...array: any[]) => {
    for (let i = array.length; i > 0;) {
        const random = sampleInt32()
        const j = mod(random, i--);
        [array[i], array[j]] = [array[j], array[i]]
    }
    return array
}