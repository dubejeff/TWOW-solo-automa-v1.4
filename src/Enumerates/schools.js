export const schools = [
  {
    id: 1,
    name: 'Bear',
    icon: 'School_Bear_Icon.png',
    witcherPortrait: 'Portrait_Bear_School.png',
    startingLocation: 10,
    special1: {
      attack: 2,
      shield: 0,
      specials: [ 'MAXSHIELD' ]
    },
    special2: {
      attack: 2,
      shield: 3,
      specials: []
    },
    special3: {
      attack: 0,
      shield: 0,
      specials: [ 'IGNOREALLDAMAGE' ]
    },
    blueMutagen: {
      attack: 0,
      shield: 1,
      specials: []
    },
    redMutagen: {
      attack: 0,
      shield: 1,
      specials: []
    },
    greenMutagen: {
      attack: 0,
      shield: 1,
      specials: []
    },
  },
  {
    id: 2,
    name: 'Cat',
    icon: 'School_Cat_Icon.png',
    witcherPortrait: 'Portrait_Cat_School.png',
    startingLocation: 17,
    special1: {
      attack: 1,
      shield: 1,
      specials: [ 'ATTACK', 'HEAL1']
    },
    special2: {
      attack: 2,
      shield: 1,
      specials: [ 'ATTACK']
    },
    special3: {
      attack: 1,
      shield: 2,
      specials: [ 'ATTACK' ]
    },
    blueMutagen: {
      attack: 2,
      shield: 0,
      specials: []
    },
    redMutagen: {
      attack: 1,
      shield: 0,
      specials: []
    },
    greenMutagen: {
      attack: 0,
      shield: 1,
      specials: []
    },
  },
  {
    id: 3,
    name: 'Ciri',
    icon: 'School_Ciri_Icon.png',
    witcherPortrait: 'Portrait_Ciri_School.png',
    startingLocation: 3,
    special1: {
      attack: 4,
      shield: 0,
      specials: [ 'ATTACK' ]
    },
    special2: {
      attack: 2,
      shield: 0,
      specials: [ 'IGNOREPASSIVE']
    },
    special3: {
      attack: 7,
      shield: 0,
      specials: []
    },
    blueMutagen: {
      attack: 0,
      shield: 0,
      specials: [ 'HEAL1']
    },
    redMutagen: {
      attack: 1,
      shield: 0,
      specials: []
    },
    greenMutagen: {
      attack: 0,
      shield: 1,
      specials: []
    },
  },
  {
    id: 4,
    name: 'Griffin',
    icon: 'School_Griffin_Icon.png',
    witcherPortrait: 'Portrait_Griffin_School.png',
    startingLocation: 1,
    special1: {
      attack: 2,
      shield: 1,
      specials: [ 'HEAL2' ]
    },
    special2: {
      attack: 3,
      shield: 0,
      specials: [ 'HEAL2' ]
    },
    special3: {
      attack: 3,
      shield: 0,
      specials: [ 'HEAL3' ]
    },
    blueMutagen: {
      attack: 0,
      shield: 0,
      specials: [ 'HEAL1' ]
    },
    redMutagen: {
      attack: 1,
      shield: 0,
      specials: []
    },
    greenMutagen: {
      attack: 0,
      shield: 0,
      specials: [ 'HEAL1']
    },
  },
  {
    id: 5,
    name: 'Manticor',
    icon: 'School_Manticor_Icon.png',
    witcherPortrait: 'Portrait_Manticor_School.png',
    startingLocation: 0,
    special1: {
      attack: 2,
      shield: 1,
      specials: [ 'POTION' ]
    },
    special2: {
      attack: 2,
      shield: 1,
      specials: [ 'POTION', 'POTION' ]
    },
    special3: {
      attack: 0,
      shield: 2,
      specials: [ 'POTION5DAMAGE' ]
    },
    blueMutagen: {
      attack: 0,
      shield: 0,
      specials: [ 'POTION' ]
    },
    redMutagen: {
      attack: 1,
      shield: 0,
      specials: []
    },
    greenMutagen: {
      attack: 0,
      shield: 0,
      specials: [ 'POTION']
    },
  },
  {
    id: 6,
    name: 'Viper',
    icon: 'School_Viper_Icon.png',
    witcherPortrait: 'Portrait_Viper_School.png',
    startingLocation: 15,
    special1: {
      attack: 2,
      shield: 0,
      specials: [ 'TWODAMAGENEXTATTACK' ]
    },
    special2: {
      attack: 3,
      shield: 0,
      specials: [ 'ATTACK' ]
    },
    special3: {
      attack: 5,
      shield: 0,
      specials: []
    },
    blueMutagen: {
      attack: 1,
      shield: 0,
      specials: []
    },
    redMutagen: {
      attack: 2,
      shield: 0,
      specials: []
    },
    greenMutagen: {
      attack: 1,
      shield: 0,
      specials: []
    },
  },
  {
    id: 7,
    name: 'Wolf',
    icon: 'School_Wolf_Icon.png',
    witcherPortrait: 'Portrait_Wolf_School.png',
    startingLocation: 13,
    special1: {
      attack: 3,
      shield: 2,
      specials: []
    },
    special2: {
      attack: 4,
      shield: 1,
      specials: []
    },
    special3: {
      attack: 3,
      shield: 1,
      specials: [ 'HEAL1']
    },
    blueMutagen: {
      attack: 1,
      shield: 0,
      specials: []
    },
    redMutagen: {
      attack: 0,
      shield: 1,
      specials: []
    },
    greenMutagen: {
      attack: 0,
      shield: 0,
      specials: [ 'HEAL1']
    },
  },
]

export const schoolsById = Object.fromEntries(
  schools.map(s => [s.id, s])
)
