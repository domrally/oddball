export class Dice {
}


// const s = shuffle(1, 2, 3, 4, 5)

    // A: 1, 1, 3, 5, 5, 6
    // B: 2, 3, 3, 4, 4, 5
    // C: 1, 2, 2, 4, 6, 6
    // orange beats blue, blue beats yellow, and yellow beats orange
    // bird        water, water      rock,      rock          bird
// (1,2,9,14,15,16)(3,4,5,10,17,18)(6,7,8,11,12,13)
// (1,2,11,12,13,18)(3,4,5,14,15,16)(6,7,8,9,10,17)
// (1,6,7,8,17,18)(2,9,10,11,12,13)(3,4,5,14,15,16)
// (1,6,11,12,13,14)(2,3,4,15,16,17)(5,7,8,9,10,18)
// (1,7,10,12,13,14)(2,3,4,15,16,17)(5,6,8,9,11,18)
// (1,7,11,12,13,14)(2,3,4,15,16,17)(5,6,8,9,10,18)
// (1,8,9,12,13,14)(2,3,4,15,16,17)(5,6,7,10,11,18)
// (1,8,10,11,13,14)(2,3,4,15,16,17)(5,6,7,9,12,18)
// (1,8,10,12,13,14)(2,3,4,15,16,17)(5,6,7,9,11,18)
// (1,8,11,12,13,14)(2,3,4,15,16,17)(5,6,7,9,10,18)
// (1,9,10,11,12,14)(2,3,4,15,16,17)(5,6,7,8,13,18)
// (1,9,10,11,13,14)(2,3,4,15,16,17)(5,6,7,8,12,18)
// (1,9,10,12,13,14)(2,3,4,15,16,17)(5,6,7,8,11,18)
// (1,9,11,12,13,14)(2,3,4,15,16,17)(5,6,7,8,10,18)
// (1,10,11,12,13,14)(2,3,4,15,16,17)(5,6,7,8,9,18)

const rock = {
    color: 'yellow',
    mascot: 'rock',
    pips: [1,2,9,14,15,16],
    letter: 'C'
}
const paper = {
    color: 'blue',
    mascot: 'water',
    pips: [3,4,5,10,17,18],
    letter: 'B'
}
const scissors = {
    color: 'orange',
    mascot: 'bird',
    pips: [6,7,8,11,12,13],
    letter: 'A'
}
// incentivised by game theory
const attack = {
    pips: [5,6,7,8,9,18]
}
// incentivised by slightly transitive defense
const defend = {
    pips: [1,10,11,12,13,14]
}
// incentivised by ability to heal yourself and/heal others/and or maybe steal small health from another player
const grab_heal_steal = {
    pips: [2,3,4,15,16,17]
}
// on their turn, a player may attack or grab_heal_steal
// the affected player may then counter if they have an appropriate card and the right conditions
// the counter of opportunity can be the advantagious card to the opponents action
// but then some of the time that gives the opponent the advantage upon reaction. So you may select a move that does not help you but protects against opponent's primary action
// Then primary action. you either roll and compare or roll a second time, add to the 1st dice, then compare again
// you must have a card that permits you to use a given dice as an action or reaction
const totals: [rock: number, paper: number, scissors: number] = [0, 0, 0]
const counts: [rock: number, paper: number, scissors: number] = [0, 1, 0]
for(let i = 0; i < 10000; i++) {
    const a = rock.pips
    const b = paper.pips
    const c = scissors.pips
    let x = 0, y = 0, z = 0

    for(let j = 0; j < 100; j++) {
        const xx = sampleArray(...a)
        x += xx
        y += sampleArray(...b)
        const zz = sampleArray(...c)
        z += zz
        // if (xx > zz) {
        //     counts[0]++
        // } else if (zz > xx) {
        //     counts[2]++
        // } else {
        //     counts[1]++
        // }
    }
    if (x > z) {
        counts[0]++
        let delta = x - z
        totals[0] += delta
    } else if (z > x) {
        counts[2]++
        let delta = z - x
        totals[2] += delta
    } else {
        counts[1]++
    }
    // if (y > z) {
    //     counts[1]++
    //     totals[1] += y - z
    // } else if (z > y) {
    //     counts[2]++
    //     totals[2] += z - y
    // }
    // if (y > x) {
    //     counts[1]++
    //     totals[1] += y - x
    // } else if (x > y) {
    //     counts[0]++
    //     totals[0] += x - y
    // }
}
console.log(counts.map(c => c / (counts[0] + counts[1] + counts[2])))
// console.log(totals)