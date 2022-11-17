import { Causal } from '../src/index'

const WordEmotionsWord: any = [
		['a', 'happy', 'c'],
		['b', 'happy', 'c'],
		['a', 'happy', 'c'],
		['b', 'sad', 'a'],
		['b', 'happy', 'a'],
		['b', 'sad', 'c'],
		['c', 'happy', 'a'],
		['c', 'sad', 'b'],
		['c', 'happy', 'b'],
	],
	words = ['a', 'b', 'c'],
	causal = new Causal(WordEmotionsWord),
	map = new Map<[string, string], number>()

for (const before of words) {
	for (const after of words) {
		if (before === after) continue

		const p = causal([before], [after])

		console.log(`${before} -> ${after}: ${p}`)

		map.set([before, after], p)
	}
}
