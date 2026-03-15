export function createHumanPlayer(name) {
  return {
    id: crypto.randomUUID(),
    name,
    school: null,
    type: 'Human',
    currentLocation: 0,
    nextLocation: 0,

    trophies: [1, 2, 3],

    trailTokens: [],

    phase2: {
      action: '',
      tropyType: '',
      monsterId: 0,
      witcherId: 0,
      skelligeEvent: '',
    },

    // Needed for human fight
    isAlive: true,
  }
}

export function createAutomaPlayer(index) {
  return {
    id: crypto.randomUUID(),
    name: `Automa ${index}`,
    school: null,
    type: 'Automa',

    currentLocation: 0,
    nextLocation: 0,
    currentAction: null,

    actionDeck: [],
    actionDiscard: [],
    challengeDeck: [],
    challengeDiscard: [],
    trophies: [],

    shield: 1,
    level: 1,
    combat: 1,
    defense: 1,
    alchemy: 1,
    specialty: 1,

    potions: 0,
    bombs: 0,
    trailTokens: [],

    phase2: {
      action: '',
      tropyType: '',
      monsterId: 0,
      witcherId: 0,
      skelligeEvent: '',
    },
  }
}
