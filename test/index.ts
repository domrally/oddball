import { Causal } from '../src/index'

const causal = new Causal([
	['foo', 'bar', 'fur'],
	['bar', 'baz', 'mix'],
])
console.log(causal(['foo'], ['mix']))
