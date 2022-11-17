import { Conditional } from '../src/index'

const conditional = new Conditional([['foo']])
console.log(conditional('foo', null as any))
