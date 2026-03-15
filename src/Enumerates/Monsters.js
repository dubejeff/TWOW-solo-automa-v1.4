const EVENTS = {
  BEFORE_LIFE_POOL: 'beforeLifePool',
  AFTER_LIFE_POOL: 'afterLifePool',
  PLAYER_TURN_START: 'playerTurnStart',
  MONSTER_TURN_START: 'monsterTurnStart',
  DAMAGE_CALCULATION: 'damageCalculation',
  DAMAGE_RESOLUTION: 'damageResolution',
  TURN_END: 'turnEnd',
}

export const monsters = [
  {
    id: "monster_arachas",
    name: "Arachas",
    type: 'Monster',
    level: 1,
    life: 10,
    ability: [
      {
        id: "monster_arachas_ability_arachas_ability",
        rawText: "BEFORE THE PLAYER CREATES THEIR LIFE POOL, THEY DISCARD 1 CARD FROM THEIR DECK.",
        trigger: "beforeLifePool",
        target: "any",
        effect: [
          {
            type: "DISCARD_FROM_DECK",
            value: 1
          }
        ],
        debug: {
          source: 'ability',
          parseWarnings: [],
          normalized: true
        }
      }
    ],
    passive: [
      {
        id: "monster_arachas_passive_arachas_passive",
        rawText: "THE FIGHT ABILITY OF THE FIRST CARD IN THE PLAYER'S NEXT COMBO HAS TO DEAL AT LEAST 2 DAMAGE. OTHERWISE; THE PLAYER CANNOT PLAY A COMBO. IGNORE ANY FURTHER PASSIVE ATTACK DURING THIS FIGHT TURN.",
        trigger: "immediate",
        target: "any",
        effect: [
          {
            type: "UNPARSED_RULE"
          }
        ],
        debug: {
          source: 'passive',
          parseWarnings: [],
          normalized: true
        }
      }
    ],
    specialAttacks: {
      Special1: [
        {
          id: "monster_arachas_special_special1_arachas_special1",
          rawText: "THE PLAYER DISCARDS 2 RANDOM CARDS FROM THEIR HAND (EMPTY HAND: FROM THE TOP OF THEIR DECK).",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "UNPARSED_RULE"
            }
          ],
          debug: {
            source: 'Special1',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special2: [
        {
          id: "monster_arachas_special_special2_arachas_special2",
          rawText: "THE PLAYER TAKES 4 DAMAGE. DURING THE ENTIRE FIGHT: THE PLAYER MAY RAISE THEIR SHIELD LEVEL MAXIMUM BY 1 DURING EACH FIGHT TURN.",
          trigger: "persistent",
          target: "any",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 4
            }
          ],
          debug: {
            source: 'Special2',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special3: [
        {
          id: "monster_arachas_special_special3_arachas_special3",
          rawText: "THE PLAYER DISCARD 1 DODGE (GREEN) CARD FROM THEIR HAND. IF THEY CANNOT, THE PLAYER TAKES 2 DAMAGE, AND ARACHAS ATTACK AGAIN.",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 2
            },
            {
              type: "EXTRA_ATTACK"
            }
          ],
          debug: {
            source: 'Special3',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special4: [
        {
          id: "monster_arachas_special_special4_arachas_special4",
          rawText: "THE PLAYER TAKES 3 DAMAGE.\n(ONLY HUMAN) DURING THE PLAYER'S NEXT FIGHT TURN, THEY MAY ONL PLAY A COMBO OF 1 OR 2 CARDS.",
          trigger: "immediate",
          target: "human",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 3
            }
          ],
          debug: {
            source: 'Special4',
            parseWarnings: [],
            normalized: true
          }
        }
      ]
    }
  },
  {
    id: "monster_archespore",
    name: "Archespore",
    type: 'Monster',
    level: 1,
    life: 12,
    ability: [
      {
        id: "monster_archespore_ability_archespore_ability",
        rawText: "BEFORE THE PLAYER CREATES THEIR LIFE POOL, THEY DISCARD 1 CARD FROM THEIR DECK.",
        trigger: "beforeLifePool",
        target: "any",
        effect: [
          {
            type: "DISCARD_FROM_DECK",
            value: 1
          }
        ],
        debug: {
          source: 'ability',
          parseWarnings: [],
          normalized: true
        }
      }
    ],
    passive: [
      {
        id: "monster_archespore_passive_archespore_passive",
        rawText: "IF THIS FIGHT TURN PLAYER'S COMBO HAS NO OFFENSIVE (PURPLE) CARD, THE MONSTER IGNORES 2 OF THE FURTHER DAMAGE IN THIS PLAYER'S FIGHT TURN (IF ANY)",
        trigger: "immediate",
        target: "monster",
        effect: [
          {
            type: "UNPARSED_RULE"
          }
        ],
        debug: {
          source: 'passive',
          parseWarnings: [],
          normalized: true
        }
      }
    ],
    specialAttacks: {
      Special1: [
        {
          id: "monster_archespore_special_special1_archespore_special1",
          rawText: "THE PLAYER TAKES 1 DAMAGE.  DURING THE PLAYER'S NEXT FIGHT TURN: THE PLAYER LOWERS THEIR SHIELD BY 1 FOR EACH CARD IN THEIR COMBO.",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 1
            }
          ],
          debug: {
            source: 'Special1',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special2: [
        {
          id: "monster_archespore_special_special2_archespore_special2",
          rawText: "THE PLAYER TAKES 2 DAMAGE AND DISCARD 1 RANDOM CARD FROM THEIR HAND (EMPTY HAND: 1 CARD FROM THE TOP OF THEIR DECK).",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 2
            }
          ],
          debug: {
            source: 'Special2',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special3: [
        {
          id: "monster_archespore_special_special3_archespore_special3",
          rawText: "THE PLAYER DISCARDS 3 CARDS FROM THE TOP OF THEIR DECK. (EMPTY DECK: RANDOM CARD FROM THEIR HAND).",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "UNPARSED_RULE"
            }
          ],
          debug: {
            source: 'Special3',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special4: [
        {
          id: "monster_archespore_special_special4_archespore_special4",
          rawText: "THE PLAYER TAKES 3 DAMAGE.\nDURING STEP 3 OF PLAYER'S NEXT FIGHT TURN, THEY DRAW A MAXIMUM OF 1 CARD.",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 3
            }
          ],
          debug: {
            source: 'Special4',
            parseWarnings: [],
            normalized: true
          }
        }
      ]
    }
  },
  {
    id: "monster_barghest",
    name: "Barghest",
    type: 'Monster',
    level: 1,
    life: 11,
    ability: [
      {
        id: "monster_barghest_ability_barghest_ability",
        rawText: "BEFORE THE PLAYER CREATES THEIR LIFE POOL, THEY REDUCE THEIR SHIELD BY 1",
        trigger: "beforeLifePool",
        target: "any",
        effect: [
          {
            type: "UNPARSED_RULE"
          }
        ],
        debug: {
          source: 'ability',
          parseWarnings: [],
          normalized: true
        }
      }
    ],
    passive: [
      {
        id: "monster_barghest_passive_barghest_passive",
        rawText: "(ONLY HUMAN) DURING STEP 4 OF THIS FIGHT TURN, THE PLAYER DRAWS 2 CARD LESS",
        trigger: "immediate",
        target: "human",
        effect: [
          {
            type: "UNPARSED_RULE"
          }
        ],
        debug: {
          source: 'passive',
          parseWarnings: [],
          normalized: true
        }
      }
    ],
    specialAttacks: {
      Special1: [
        {
          id: "monster_barghest_special_special1_barghest_special1",
          rawText: "THE PLAYER TAKES 2 DAMAGE AND DISCARDS 1 POTION",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 2
            }
          ],
          debug: {
            source: 'Special1',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special2: [
        {
          id: "monster_barghest_special_special2_barghest_special2",
          rawText: "THE PLAYER DISCARDS ALL DEFENSIVE (YELLOW) AND OFFEJNSIVE SIGN (PURPLE) CARDS FROM THEIR HAND. IF THEY ARE NOT ABLE TO DISCARD AT LEAST 1, THEY TAKE 2 DAMAGE.",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "UNPARSED_RULE"
            }
          ],
          debug: {
            source: 'Special2',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special3: [
        {
          id: "monster_barghest_special_special3_barghest_special3",
          rawText: "THE PLAYER TAKES 4 DAMAGE AND DISCARDS 1 POTION.",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 4
            }
          ],
          debug: {
            source: 'Special3',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special4: [
        {
          id: "monster_barghest_special_special4_barghest_special4",
          rawText: "THE PLAYER TAKES 1 DAMAGE.\n(ONLY HUMAN) DURING STEP 4 OF PLAYER NEXT FIGHT TURN, THEY DRAW 0 CARDS.",
          trigger: "immediate",
          target: "human",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 1
            }
          ],
          debug: {
            source: 'Special4',
            parseWarnings: [],
            normalized: true
          }
        }
      ]
    }
  },
  {
    id: "monster_drowners_nest",
    name: "Drowners Nest",
    type: 'Monster',
    level: 1,
    life: 10,
    ability: [
      {
        id: "monster_drowners_nest_ability_drowners_nest_ability",
        rawText: "AFTER THE PLAYER CREATES THEIR LIFE POOL, THEY DISCARD ANY 1 CARD FROM THEIR DECK. AFTER, THEY SHUFFLE THEIR DECK.",
        trigger: "afterLifePool",
        target: "any",
        effect: [
          {
            type: "UNPARSED_RULE"
          }
        ],
        debug: {
          source: 'ability',
          parseWarnings: [],
          normalized: true
        }
      }
    ],
    passive: [
      {
        id: "monster_drowners_nest_passive_drowners_nest_passive",
        rawText: "THE PLAYER DISCARDS 1 POTION",
        trigger: "immediate",
        target: "any",
        effect: [
          {
            type: "UNPARSED_RULE"
          }
        ],
        debug: {
          source: 'passive',
          parseWarnings: [],
          normalized: true
        }
      }
    ],
    specialAttacks: {
      Special1: [
        {
          id: "monster_drowners_nest_special_special1_drowners_nest_special1",
          rawText: "THE PLAYER DISCARDS 1 RANDOM CARD FROM THEIR HAND (EMPTY HAND: FROM THE TOP OF THEIR DECK) (ONLY HUMAN) AND PLACES ANY 2 CARDS FROM THEIR HAND ON TOP OF THEIR DECK.",
          trigger: "immediate",
          target: "human",
          effect: [
            {
              type: "UNPARSED_RULE"
            }
          ],
          debug: {
            source: 'Special1',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special2: [
        {
          id: "monster_drowners_nest_special_special2_drowners_nest_special2",
          rawText: "THE PLAYER TAKES 2 DAMAGE. DROWNERS NEST IMMEDIATELY ATTACK AGAIN.",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 2
            },
            {
              type: "EXTRA_ATTACK"
            }
          ],
          debug: {
            source: 'Special2',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special3: [
        {
          id: "monster_drowners_nest_special_special3_drowners_nest_special3",
          rawText: "THE PLAYER DISCARDS 3 CARD FROM THE TOP OF THEIR DECK (EMPTY DECK: ANY CARDS FROM THEIR HAND).",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "UNPARSED_RULE"
            }
          ],
          debug: {
            source: 'Special3',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special4: [
        {
          id: "monster_drowners_nest_special_special4_drowners_nest_special4",
          rawText: "THE PLAYER TAKES 4 DAMAGE. DURING THE PLAYER'S NEXT FIGHT TURN, THE FIRST CARD IN THE COMBO HAS TO BE FAST ATTACK (BLUE) OR AN OFFENSIVE SIGN (PURPLE) CARD. OTHERWISE, THE PLAYER MAY ONLY PLAY A COMBO OF 1 CARD.",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 4
            }
          ],
          debug: {
            source: 'Special4',
            parseWarnings: [],
            normalized: true
          }
        }
      ]
    }
  },
  {
    id: "monster_ekimmara",
    name: "Ekimmara",
    type: 'Monster',
    level: 1,
    life: 12,
    ability: [
      {
        id: "monster_ekimmara_ability_ekimmara_ability",
        rawText: "AFTER THE PLAYER CREATES THEIR LIFE POOL, IF THEY DON'T HAVE THE TRAIL TOKEN FOR EKIMMARA, THEY DISCARD ANY 1 CARD FROM THEIR HAND",
        trigger: "afterLifePool",
        target: "any",
        effect: [
          {
            type: "UNPARSED_RULE"
          }
        ],
        debug: {
          source: 'ability',
          parseWarnings: [],
          normalized: true
        }
      }
    ],
    passive: [
      {
        id: "monster_ekimmara_passive_ekimmara_passive",
        rawText: "THE MONSTER IGNORES 2 OF THE FURTHER DAMAGE IN THIS PLAYER'S FIGHT TURN (IF ANY).",
        trigger: "immediate",
        target: "monster",
        effect: [
          {
            type: "UNPARSED_RULE"
          }
        ],
        debug: {
          source: 'passive',
          parseWarnings: [],
          normalized: true
        }
      }
    ],
    specialAttacks: {
      Special1: [
        {
          id: "monster_ekimmara_special_special1_ekimmara_special1",
          rawText: "THE PLAYER DISCARD 1 FAST ATTACK (BLUE) CARD FROM THEIR HAND. IF THEY ARE NOT ABLE TO DISCARD IT, THEY TAKE 3 DAMAGE.",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "UNPARSED_RULE"
            }
          ],
          debug: {
            source: 'Special1',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special2: [
        {
          id: "monster_ekimmara_special_special2_ekimmara_special2",
          rawText: "THE PLAYER DISCARDS 3 CARD FROM THE TOP OF THEIR DECK (EMPTY DECK: ANY CARDS FROM THEIR HAND).",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "UNPARSED_RULE"
            }
          ],
          debug: {
            source: 'Special2',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special3: [
        {
          id: "monster_ekimmara_special_special3_ekimmara_special3",
          rawText: "THE PLAYER DISCARD 2 RANDOM CARDS FROM THEIR HAND (EMPTY HAND: FROM THE TOP OF THEIR DECK)",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "UNPARSED_RULE"
            }
          ],
          debug: {
            source: 'Special3',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special4: [
        {
          id: "monster_ekimmara_special_special4_ekimmara_special4",
          rawText: "THE PLAYER ROLL A DIE: 1-2: THEY TAKE 2 DAMAGE, 3-4: THEY TAKE 3 DAMAGE, 5-6: THEY TAKE 4 DAMAGE.",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "UNPARSED_RULE"
            }
          ],
          debug: {
            source: 'Special4',
            parseWarnings: [],
            normalized: true
          }
        }
      ]
    }
  },
  {
    id: "monster_foglet",
    name: "Foglet",
    type: 'Monster',
    level: 1,
    life: 10,
    ability: [
      {
        id: "monster_foglet_ability_foglet_ability",
        rawText: "DURING THE MONSTER'S FIRST FIGHT TURN: PICK THE ATTACK TYPE THAT MAKES THE PLAYER DISCARD MORE CARDS FROM THEIR DECK OR HAND",
        trigger: "firstTurnOnly",
        target: "monster",
        effect: [
          {
            type: "UNPARSED_RULE"
          }
        ],
        debug: {
          source: 'ability',
          parseWarnings: [],
          normalized: true
        }
      }
    ],
    passive: [
      {
        id: "monster_foglet_passive_foglet_passive",
        rawText: "IF THIS FIGHT TURN PLAYER'S COMBO HAS NO OFFENSIVE (PURPLE) CARD, AFTER RESOLVING THE COMBO, THE MONSTER ADDS A RANDOM CARD FROM THE UNUSED MONSTER FIGHT CARDS ON TOP OF THEIR LIFE POOL DECK.",
        trigger: "immediate",
        target: "monster",
        effect: [
          {
            type: "UNPARSED_RULE"
          }
        ],
        debug: {
          source: 'passive',
          parseWarnings: [],
          normalized: true
        }
      }
    ],
    specialAttacks: {
      Special1: [
        {
          id: "monster_foglet_special_special1_foglet_special1",
          rawText: "THE PLAYER DISCARDS 3 CARDS FROM THE TOP OF THEIR DECK (EMPTY DECK: ANY CARDS FROM THEIR HAND).",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "UNPARSED_RULE"
            }
          ],
          debug: {
            source: 'Special1',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special2: [
        {
          id: "monster_foglet_special_special2_foglet_special2",
          rawText: "THE PLAYER TAKES 2 DAMAGE. DURING THE PLAYER'S NEXT FIGHT TURN, IGNORE SHIELD SYMBOLS IN THE PLAYER'S COMBO.",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 2
            }
          ],
          debug: {
            source: 'Special2',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special3: [
        {
          id: "monster_foglet_special_special3_foglet_special3",
          rawText: "THE PLAYER TAKES 3 DAMAGE. DURING THE PLAYER'S NEXT FIGHT TURN, IGNORE SHIELD SYMBOLS IN THE PLAYER'S COMBO",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 3
            }
          ],
          debug: {
            source: 'Special3',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special4: [
        {
          id: "monster_foglet_special_special4_foglet_special4",
          rawText: "THE PLAYER TAKES 2 DAMAGE AND FOGLET ATTACK AGAIN.",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 2
            },
            {
              type: "EXTRA_ATTACK"
            }
          ],
          debug: {
            source: 'Special4',
            parseWarnings: [],
            normalized: true
          }
        }
      ]
    }
  },
  {
    id: "monster_ghouls_nest",
    name: "Ghouls Nest",
    type: 'Monster',
    level: 1,
    life: 12,
    ability: [
      {
        id: "monster_ghouls_nest_ability_ghouls_nest_ability",
        rawText: "DURING THE PLAYER'S FIRST FIGHT TURN ONLY, THE MONSTER MAY ONLY DISCARD UP TO 2 CARDS (REGARDLESS OF HOW MUCH DAMAGE IS DEALT BY THE PLAYER).",
        trigger: "firstTurnOnly",
        target: "monster",
        effect: [
          {
            type: "UNPARSED_RULE"
          }
        ],
        debug: {
          source: 'ability',
          parseWarnings: [],
          normalized: true
        }
      }
    ],
    passive: [
      {
        id: "monster_ghouls_nest_passive_ghouls_nest_passive",
        rawText: "THE MONSTER IGNORES 1 OF THE FURTHER DAMAGE IN THIS PLAYER'S FIGHT TURN (IF ANY).",
        trigger: "immediate",
        target: "monster",
        effect: [
          {
            type: "UNPARSED_RULE"
          }
        ],
        debug: {
          source: 'passive',
          parseWarnings: [],
          normalized: true
        }
      }
    ],
    specialAttacks: {
      Special1: [
        {
          id: "monster_ghouls_nest_special_special1_ghouls_nest_special1",
          rawText: "THE PLAYER TAKES 2 DAMAGE. DURING THE PLAYER'S NEXT FIGHT TURN, THEY MAY ONLY PLAY A COMBO OF ONE CARD.",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 2
            }
          ],
          debug: {
            source: 'Special1',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special2: [
        {
          id: "monster_ghouls_nest_special_special2_ghouls_nest_special2",
          rawText: "THE PLAYER DISCARDS 1 DEFENSIVE SIGN (YELLOW) CARD FROM THEIR HAND. IF THEY ARE NOT ABLETO DISCARD IT, THEY TAKE 4 DAMAGE.",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "UNPARSED_RULE"
            }
          ],
          debug: {
            source: 'Special2',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special3: [
        {
          id: "monster_ghouls_nest_special_special3_ghouls_nest_special3",
          rawText: "THE PLAYER TAKES 3 DAMAGE. DURING THE PLAYER'S NEXT FIGHT TURN, THEY DEAL 2 DAMAGE LESS.",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 3
            }
          ],
          debug: {
            source: 'Special3',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special4: [
        {
          id: "monster_ghouls_nest_special_special4_ghouls_nest_special4",
          rawText: "IF THE PLAYER'S SHIELD LEVEL IS 0, THEY TAKE 4 DAMAGE. OTHERWISE, THE PLAYER TAKES 2 DAMAGE LESS.",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 2
            }
          ],
          debug: {
            source: 'Special4',
            parseWarnings: [],
            normalized: true
          }
        }
      ]
    }
  },
  {
    id: "monster_harpy",
    name: "Harpy",
    type: 'Monster',
    level: 1,
    life: 12,
    ability: [
      {
        id: "monster_harpy_ability_harpy_ability",
        rawText: "BEFORE THE PLAYER CREATES THEIR LIFE POOL, THEY DISCARD 1 CARD FROM THEIR DECK.",
        trigger: "beforeLifePool",
        target: "any",
        effect: [
          {
            type: "DISCARD_FROM_DECK",
            value: 1
          }
        ],
        debug: {
          source: 'ability',
          parseWarnings: [],
          normalized: true
        }
      }
    ],
    passive: [
      {
        id: "monster_harpy_passive_harpy_passive",
        rawText: "BEFORE STEP 4 OF PLAYER'S FT TURN, THE PLAYER TAKES DAMAGE EQUAL TO THE HALF OF FURTHER DAMAGE DEALT TO THE MONSTER IN THIS PLAYER'S FIGHT TURN (ROUNDED DOWN)",
        trigger: "immediate",
        target: "monster",
        effect: [
          {
            type: "UNPARSED_RULE"
          }
        ],
        debug: {
          source: 'passive',
          parseWarnings: [],
          normalized: true
        }
      }
    ],
    specialAttacks: {
      Special1: [
        {
          id: "monster_harpy_special_special1_harpy_special1",
          rawText: "THE PLAYER TAKES 2 DAMAGE. DURING STEP 4 OF PLAYER'S NEXT FIGHT TURN, THEY DRAW 2 CARDS LESS.",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 2
            }
          ],
          debug: {
            source: 'Special1',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special2: [
        {
          id: "monster_harpy_special_special2_harpy_special2",
          rawText: "THE PLAYER DISCARDS 1 DODGE (GREEN) CARD FROM THEIR HAND. IF THEY ARE NOT ABLE TO DISCARD IT, THEY LOWER THEIR SHIELD LEVEL TO 0 AND HARPY IMMEDIATELY PERFORMS ITS NEXT FIGHT TURN.",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "UNPARSED_RULE"
            }
          ],
          debug: {
            source: 'Special2',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special3: [
        {
          id: "monster_harpy_special_special3_harpy_special3",
          rawText: "THE PLAYER DISCARD 1 DODGE (GREEN) CARD FROM THEIR HAND. IF THEY CANNOT, THEY LOWER THEIR SHIELD LEVEL TO 0 AND TAKE 3 DAMAGE.",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "UNPARSED_RULE"
            }
          ],
          debug: {
            source: 'Special3',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special4: [
        {
          id: "monster_harpy_special_special4_harpy_special4",
          rawText: "THE PLAYER TRASHES 1 FROM FROM THE TOP OF THEIR DECK (EMPTY DECK: RANDOM CARD FROM THEIR HAND)",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "UNPARSED_RULE"
            }
          ],
          debug: {
            source: 'Special4',
            parseWarnings: [],
            normalized: true
          }
        }
      ]
    }
  },
  {
    id: "monster_nekkers_nest",
    name: "Nekkers Nest",
    type: 'Monster',
    level: 1,
    life: 11,
    ability: [
      {
        id: "monster_nekkers_nest_ability_nekkers_nest_ability",
        rawText: "BEFORE THE PLAYER CREATES THEIR LIFE POOL, THEY DISCARD 1 CARD FROM THEIR DECK.",
        trigger: "beforeLifePool",
        target: "any",
        effect: [
          {
            type: "DISCARD_FROM_DECK",
            value: 1
          }
        ],
        debug: {
          source: 'ability',
          parseWarnings: [],
          normalized: true
        }
      }
    ],
    passive: [
      {
        id: "monster_nekkers_nest_passive_nekkers_nest_passive",
        rawText: "DURING THE MONSTER'S NEXT FIGHT TURN: THE PLAYER CONTROLLING THE MONSTER PICKS ATTACK TYPE AFTER REVEALING THE MONSTER FIGHT CARD. (SOLO: THE PLAYER PICKS THE ATTACK DEALING MORE DAMAGE.)",
        trigger: "immediate",
        target: "monster",
        effect: [
          {
            type: "UNPARSED_RULE"
          }
        ],
        debug: {
          source: 'passive',
          parseWarnings: [],
          normalized: true
        }
      }
    ],
    specialAttacks: {
      Special1: [
        {
          id: "monster_nekkers_nest_special_special1_nekkers_nest_special1",
          rawText: "THE PLAYER TAKES 2 DAMAGE. (ONLY HUMAN) DURING STEP 4 OF PLAYER'S NEXT FIGHT TURN, THEY DRAW 1 CARD LESS.",
          trigger: "immediate",
          target: "human",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 2
            }
          ],
          debug: {
            source: 'Special1',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special2: [
        {
          id: "monster_nekkers_nest_special_special2_nekkers_nest_special2",
          rawText: "THE PLAYER DISCARD 1 DODGE (GREEN) CARD FROM THEIR HAND. IF THEY ARE NOT ABLE TO DISCARD IT, THEY TAKE 2 DAMAGE AND NEKKERS NEST ATTACK AGAIN.",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "EXTRA_ATTACK"
            }
          ],
          debug: {
            source: 'Special2',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special3: [
        {
          id: "monster_nekkers_nest_special_special3_nekkers_nest_special3",
          rawText: "THE PLAYER DISCARDS 3 CARDS FROM THE TOP OF THEIR DECK (EMPTY DECK: RANDOM CARDS FROM THEIR HAND).",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "UNPARSED_RULE"
            }
          ],
          debug: {
            source: 'Special3',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special4: [
        {
          id: "monster_nekkers_nest_special_special4_nekkers_nest_special4",
          rawText: "THE PLAYER TAKES 2 DAMAGE. DURING THE PLAYER'S NEXT FIGHT TURN, THEY DEAL 2 DAMAGE LESS.",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 2
            }
          ],
          debug: {
            source: 'Special4',
            parseWarnings: [],
            normalized: true
          }
        }
      ]
    }
  },
  {
    id: "monster_rotfiend",
    name: "Rotfiend",
    type: 'Monster',
    level: 1,
    life: 11,
    ability: [
      {
        id: "monster_rotfiend_ability_rotfiend_ability",
        rawText: "BEFORE THE PLAYER CREATES THEIR LIFE POOL, THEY DISCARD 1 CARD FROM THEIR DECK.",
        trigger: "beforeLifePool",
        target: "any",
        effect: [
          {
            type: "DISCARD_FROM_DECK",
            value: 1
          }
        ],
        debug: {
          source: 'ability',
          parseWarnings: [],
          normalized: true
        }
      }
    ],
    passive: [
      {
        id: "monster_rotfiend_passive_rotfiend_passive",
        rawText: "THE PLAYER LOWERS THE LEVEL OF ANY ATTRIBUTE BY 1. THE PLAYER PLACES 1 DIE ON THE ROTFIEND'S CARD (IF THERE IS NO ONE ALREADY)",
        trigger: "immediate",
        target: "any",
        effect: [
          {
            type: "UNPARSED_RULE"
          }
        ],
        debug: {
          source: 'passive',
          parseWarnings: [],
          normalized: true
        }
      }
    ],
    specialAttacks: {
      Special1: [
        {
          id: "monster_rotfiend_special_special1_rotfiend_special1",
          rawText: "THE MONSTER TAKES 1 DAMAGE AND THE PLAYER TAKES 5 DAMAGE. (7 DAMAGE, IF THERE IS A DIE PLACED ON THE ROTFIEND'S CARD).",
          trigger: "immediate",
          target: "monster",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 1
            }
          ],
          debug: {
            source: 'Special1',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special2: [
        {
          id: "monster_rotfiend_special_special2_rotfiend_special2",
          rawText: "THE MONSTER TAKES 2 DAMAGE, AND THE PLAYER DISCARD 5 CARDS FROM THEIR HAND (6, IF THERE IS A DIE PLACED ON THE ROTFIEND'S CARD. EMPTY HAND: FROM THE TOP OF THEIR DECK).",
          trigger: "immediate",
          target: "monster",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 2
            }
          ],
          debug: {
            source: 'Special2',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special3: [
        {
          id: "monster_rotfiend_special_special3_rotfiend_special3",
          rawText: "THE PLAYER DISCARDS 1 DEFENSIVE SIGN (YELLOW) CARD FROM THEIR HAND. IF THEY ARE NOT ABLE TO DISCARD IT, THEY DISCARD ANY 3 CARDS FROM THEIR HAND (EMPTY HAND: FROM THE TOP OF THEIR DECK).",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "UNPARSED_RULE"
            }
          ],
          debug: {
            source: 'Special3',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special4: [
        {
          id: "monster_rotfiend_special_special4_rotfiend_special4",
          rawText: "DURING THE PLAYER'S NEXT FIGHT TURN, THEY MAY ONLY PLAY A COMBO OF 1 CARD. THE PLAYER PLACES 1 DIE ON THE ROTFIEND'S CARD (IF THERE IS NO ONE ALREADY)",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "UNPARSED_RULE"
            }
          ],
          debug: {
            source: 'Special4',
            parseWarnings: [],
            normalized: true
          }
        }
      ]
    }
  },
  {
    id: "monster_fiend",
    name: "Fiend",
    type: 'Monster',
    level: 2,
    life: 13,
    ability: [
      {
        id: "monster_fiend_ability_fiend_ability",
        rawText: "BEFORE THE PLAYER CREATES THEIR LIFE POOL, THEY DISCARD 1 CARD FROM THEIR DECK.",
        trigger: "beforeLifePool",
        target: "any",
        effect: [
          {
            type: "DISCARD_FROM_DECK",
            value: 1
          }
        ],
        debug: {
          source: 'ability',
          parseWarnings: [],
          normalized: true
        }
      }
    ],
    passive: [
      {
        id: "monster_fiend_passive_fiend_passive",
        rawText: "FIEND ADDS A RANDOM CARD FROM THE UNUSED MONSTER FIGHT CARDS ON THE BOTTOM OF THEIR LIFE POOL DECK.",
        trigger: "immediate",
        target: "monster",
        effect: [
          {
            type: "UNPARSED_RULE"
          }
        ],
        debug: {
          source: 'passive',
          parseWarnings: [],
          normalized: true
        }
      }
    ],
    specialAttacks: {
      Special1: [
        {
          id: "monster_fiend_special_special1_fiend_special1",
          rawText: "THE PLAYER TAKES 2 DAMAGE (ONLY HUMAN) AND PLACES 3 RANDOM CARDS FROM THEIR HAND BACK ON THE TOP OF THEIR DECK.",
          trigger: "immediate",
          target: "human",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 2
            }
          ],
          debug: {
            source: 'Special1',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special2: [
        {
          id: "monster_fiend_special_special2_fiend_special2",
          rawText: "THE PLAYER TAKES 3 DAMAGE (ONLY HUMAN) AND PLACES ALL CARDS FROM THEIR HAND BACK ON THE TOP OF THEIR DECK (IN A RANDOM ORDER)",
          trigger: "immediate",
          target: "human",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 3
            }
          ],
          debug: {
            source: 'Special2',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special3: [
        {
          id: "monster_fiend_special_special3_fiend_special3",
          rawText: "THE PLAYER DISCARD 1 DODGE (GREEN) CARD FROM THEIR HAND, IF THEY ARE NOT ABLE TO DISCARD IT, THEY TAKE 4 DAMAGE.",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "UNPARSED_RULE"
            }
          ],
          debug: {
            source: 'Special3',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special4: [
        {
          id: "monster_fiend_special_special4_fiend_special4",
          rawText: "THE PLAYER DISCARDS 1 FAST ATTACK (BLUE) CARD FROM THEIR HAND. IF THEY CANNOT, THEY LOWER THEIR SHIELD LEVEL TO 0. FIEND IMMEDIATTELY PERRORMS ITS NEXT FIGHT TURN.",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "UNPARSED_RULE"
            }
          ],
          debug: {
            source: 'Special4',
            parseWarnings: [],
            normalized: true
          }
        }
      ]
    }
  },
  {
    id: "monster_grave_hag",
    name: "Grave Hag",
    type: 'Monster',
    level: 2,
    life: 13,
    ability: [
      {
        id: "monster_grave_hag_ability_grave_hag_ability",
        rawText: "IF THE PLAYER TAKE ANY DAMAGE DURING THE MONSTER'S FIRST FIGHT TURN, FIRST THEY DISCARD CARDS FROM THEIR HAND. ANY EXCEEDING DAMAGE IS TAKEN FOLLOWING STANDARD RULES.",
        trigger: "firstTurnOnly",
        target: "monster",
        effect: [
          {
            type: "UNPARSED_RULE"
          }
        ],
        debug: {
          source: 'ability',
          parseWarnings: [],
          normalized: true
        }
      }
    ],
    passive: [
      {
        id: "monster_grave_hag_passive_grave_hag_passive",
        rawText: "BEFORE STEP 4 OF PLAYER'S FIGHT TURN, THE PLAYER LOWERS THEIR SHIELD LEVEL BY 2. IF THEIR SHIELD LEVEL IS 0 THEY DISCARD 1 RANDOM CARD FROM THEIR HAND INSTEAD.",
        trigger: "immediate",
        target: "any",
        effect: [
          {
            type: "UNPARSED_RULE"
          }
        ],
        debug: {
          source: 'passive',
          parseWarnings: [],
          normalized: true
        }
      }
    ],
    specialAttacks: {
      Special1: [
        {
          id: "monster_grave_hag_special_special1_grave_hag_special1",
          rawText: "THE PLAYER TAKES 3 DAMAGE. (ONLY HUMAN) DURING THE PLAYER NEXT FIGHT TURN, THEIR COMBAT LEVEL IS LOWERED TO 1.",
          trigger: "immediate",
          target: "human",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 3
            }
          ],
          debug: {
            source: 'Special1',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special2: [
        {
          id: "monster_grave_hag_special_special2_grave_hag_special2",
          rawText: "THE PLAYER TAKES DAMAGE EQUAL TO THE NUMBER OF CARDS IN HAND, OR THEY DISCARD HALF THEIR CARDS FROM THEIR HAND (ROUNDED DOWN). (ONLY AUTOMA) THE PLAYER TAKES 3 DAMAGE.",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 3
            }
          ],
          debug: {
            source: 'Special2',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special3: [
        {
          id: "monster_grave_hag_special_special3_grave_hag_special3",
          rawText: "THE PLAYER TAKES DAMAGE EQUAL TO THE NUMBER OF CARDS IN THEIR HAND, OR THEY DISCARD HALF THE CARDS FROM THEIR HAND (ROUNDED UP) (ONLY AUTOMA) THE PLAYER TAKES 3 DAMAGE.",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 3
            }
          ],
          debug: {
            source: 'Special3',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special4: [
        {
          id: "monster_grave_hag_special_special4_grave_hag_special4",
          rawText: "THE PLAYER DICARDS RANDOM CARDS FROM THEIR HAND IN THE NUMBER EQUAL TO THE NUMBER OF POTION THEY POSSESS (MIN 1)",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "UNPARSED_RULE"
            }
          ],
          debug: {
            source: 'Special4',
            parseWarnings: [],
            normalized: true
          }
        }
      ]
    }
  },
  {
    id: "monster_griffin",
    name: "Griffin",
    type: 'Monster',
    level: 2,
    life: 15,
    ability: [
      {
        id: "monster_griffin_ability_griffin_ability",
        rawText: "BEFORE THE PLAYER CREATES THEIR LIFE POOL, THEY DISCARD 1 CARD FROM THEIR DECK.",
        trigger: "beforeLifePool",
        target: "any",
        effect: [
          {
            type: "DISCARD_FROM_DECK",
            value: 1
          }
        ],
        debug: {
          source: 'ability',
          parseWarnings: [],
          normalized: true
        }
      }
    ],
    passive: [
      {
        id: "monster_griffin_passive_griffin_passive",
        rawText: "IF THIS FIGHT TURN PLAYER'S COMBO HAS NO OFFENSIVE SIGN (PURPLE) OR STRONG ATTACK (RED) CARD, THE MONSTER IGNORES 2 OF THE FURTHER DAMAGE IN THIS PLAYER'S FIGHT TURN (IF ANY).",
        trigger: "immediate",
        target: "monster",
        effect: [
          {
            type: "UNPARSED_RULE"
          }
        ],
        debug: {
          source: 'passive',
          parseWarnings: [],
          normalized: true
        }
      }
    ],
    specialAttacks: {
      Special1: [
        {
          id: "monster_griffin_special_special1_griffin_special1",
          rawText: "THE PLAYER TAKES 2 DAMAGE AND DISCARD 1 POTION.",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 2
            }
          ],
          debug: {
            source: 'Special1',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special2: [
        {
          id: "monster_griffin_special_special2_griffin_special2",
          rawText: "THE PLAYER TAKES 3 DAMAGE AND DISCARDS 2 POTIONS.",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 3
            }
          ],
          debug: {
            source: 'Special2',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special3: [
        {
          id: "monster_griffin_special_special3_griffin_special3",
          rawText: "THE PLAYER DISCARDS 1 OFFENSIVE SIGN (PURPLE) CARD FROM THEIR HAND. IF THEY ARE NOT ABLE TO DISCARD IT, THEY LOWER THEIR SHIELD LEVEL TO 0. GRIFFIN ATTACK AGAIN.",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "EXTRA_ATTACK"
            }
          ],
          debug: {
            source: 'Special3',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special4: [
        {
          id: "monster_griffin_special_special4_griffin_special4",
          rawText: "THE PLAYER TAKES 3 DAMAGE. DURING THE PLAYER'S NEXT FIGHT TURN, THEY MAY ONLY PLAY A COMBO OF 1 OR 2 CARDS.",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 3
            }
          ],
          debug: {
            source: 'Special4',
            parseWarnings: [],
            normalized: true
          }
        }
      ]
    }
  },
  {
    id: "monster_manticore",
    name: "Manticore",
    type: 'Monster',
    level: 2,
    life: 14,
    ability: [
      {
        id: "monster_manticore_ability_manticore_ability",
        rawText: "EACHTIME THE MONSTER DEALS ANY DAMAGE, IT IS LOWERED BY 1, AND THE PLAYER DISCARDS 1 RANDOM CARD FROM THEIR HAND.",
        trigger: "immediate",
        target: "monster",
        effect: [
          {
            type: "UNPARSED_RULE"
          }
        ],
        debug: {
          source: 'ability',
          parseWarnings: [],
          normalized: true
        }
      }
    ],
    passive: [
      {
        id: "monster_manticore_passive_manticore_passive",
        rawText: "THE MONSTER IGNORES 1 OF THE FURTHER DAMAGE IN THIS PLAYER'S FIGHT TURN. THE FIRST CARD IN THE PLAYER'S NEXT COMBO HAS TO BE A FAST ATTACK (BLUE) CARD. OTHERWISE, THE PLAYER MAY ONLY PLAY A COMBO OF 1 CARD.",
        trigger: "immediate",
        target: "monster",
        effect: [
          {
            type: "UNPARSED_RULE"
          }
        ],
        debug: {
          source: 'passive',
          parseWarnings: [],
          normalized: true
        }
      }
    ],
    specialAttacks: {
      Special1: [
        {
          id: "monster_manticore_special_special1_manticore_special1",
          rawText: "THE PLAYER TAKES 3 DAMAGE (ONLY HUMAN) AND LOSES 2 GOLD.",
          trigger: "immediate",
          target: "human",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 3
            }
          ],
          debug: {
            source: 'Special1',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special2: [
        {
          id: "monster_manticore_special_special2_manticore_special2",
          rawText: "THE PLAYER TAKES 2 DAMAGE AND DISCARDS 1 UNUSED POTION. IF THEY HAVE NO POTIONS, THEY TAKE 4 ADDITIONAL DAMAGE.",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 2
            }
          ],
          debug: {
            source: 'Special2',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special3: [
        {
          id: "monster_manticore_special_special3_manticore_special3",
          rawText: "THE PLAYER TAKES 3 DAMAGE. DURING THE PLAYER'S NEXT FIGHT TURN, THEY MAY ONLY PLAY A COMBO OF 1 OR 2 CARDS.",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 3
            }
          ],
          debug: {
            source: 'Special3',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special4: [
        {
          id: "monster_manticore_special_special4_manticore_special4",
          rawText: "THE PLAYER TAKES 2 DAMAGE. DURING THE ENTIRE FIGHT: PLAYER'S DEFENSE LEVEL IS LOWERED BY 2.",
          trigger: "persistent",
          target: "any",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 2
            }
          ],
          debug: {
            source: 'Special4',
            parseWarnings: [],
            normalized: true
          }
        }
      ]
    }
  },
  {
    id: "monster_nightwraith",
    name: "Nightwraith",
    type: 'Monster',
    level: 2,
    life: 14,
    ability: [
      {
        id: "monster_nightwraith_ability_nightwraith_ability",
        rawText: "BEFORE THE PLAYER CREATES THEIR LIFE POOL, THEY DISCARD 1 CARD FROM THEIR DECK.",
        trigger: "beforeLifePool",
        target: "any",
        effect: [
          {
            type: "DISCARD_FROM_DECK",
            value: 1
          }
        ],
        debug: {
          source: 'ability',
          parseWarnings: [],
          normalized: true
        }
      }
    ],
    passive: [
      {
        id: "monster_nightwraith_passive_nightwraith_passive",
        rawText: "IF THIS FIGHT TURN PLAYER'S COMBO HAS NO OFFENSIVE SIGN (PURPLE) CARDS, THE MONSTER IGNORES ALL OF THE FURTHER DAMAGE IN THIS PLAYER'S FIGHT TURN (IF ANY). (ONLY HUMAN) IF THE PLAYER ALREADY PLAYED THEIR COMBO, THEY TAKE THE LAST CARD FROM IT AND ADD IT TO THEIR HAND.",
        trigger: "immediate",
        target: "human",
        effect: [
          {
            type: "UNPARSED_RULE"
          }
        ],
        debug: {
          source: 'passive',
          parseWarnings: [],
          normalized: true
        }
      }
    ],
    specialAttacks: {
      Special1: [
        {
          id: "monster_nightwraith_special_special1_nightwraith_special1",
          rawText: "THE PLAYER TAKES 2 DAMAGE. THE NEXT PLAYER'S COMBO DEALS A MAXIMUM OF 1 DAMAGE.",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 2
            }
          ],
          debug: {
            source: 'Special1',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special2: [
        {
          id: "monster_nightwraith_special_special2_nightwraith_special2",
          rawText: "THE MONSTER PUTS 2 RANDOMLY CHOSEN CARDS FROM ITS DISCARD PILE ON THE TOP OF ITS LIFE POOL. THE PLAYER LOWERS THEIR SHIELD LEVEL BY 2.",
          trigger: "immediate",
          target: "monster",
          effect: [
            {
              type: "UNPARSED_RULE"
            }
          ],
          debug: {
            source: 'Special2',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special3: [
        {
          id: "monster_nightwraith_special_special3_nightwraith_special3",
          rawText: "THE MONSTER PUTS RANDOMLY CHOSEN CARDS FROM IT'S DISCARD PILE IN THE NUMBER EQUAL TO THE PLAYER'S SHIELD LEVELON THE TOP OF ITS LIFE POOL. THE PLAYER LOWERS THEIR SHIELD LEVEL TO 0.",
          trigger: "immediate",
          target: "monster",
          effect: [
            {
              type: "UNPARSED_RULE"
            }
          ],
          debug: {
            source: 'Special3',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special4: [
        {
          id: "monster_nightwraith_special_special4_nightwraith_special4",
          rawText: "THE PLAYER TAKES 3 DAMAGE. THE MONSTER ADDS 2 RANDOM CARDS FROM THE UNUSED MONSTER FIGHT CARDS ON TOP OF THEIR LIFE POOL DECK.",
          trigger: "immediate",
          target: "monster",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 3
            }
          ],
          debug: {
            source: 'Special4',
            parseWarnings: [],
            normalized: true
          }
        }
      ]
    }
  },
  {
    id: "monster_noonwraith",
    name: "Noonwraith",
    type: 'Monster',
    level: 2,
    life: 14,
    ability: [
      {
        id: "monster_noonwraith_ability_noonwraith_ability",
        rawText: "DURING EACH PLAYER'S FIGHT TURN, THEIR SHIELD LEVEL CAN ONLY BE RAISED BY 1 (IN TOTAL); THEY IGNORE ADDITIONAL SHIELD RAISES.",
        trigger: "immediate",
        target: "any",
        effect: [
          {
            type: "UNPARSED_RULE"
          }
        ],
        debug: {
          source: 'ability',
          parseWarnings: [],
          normalized: true
        }
      }
    ],
    passive: [
      {
        id: "monster_noonwraith_passive_noonwraith_passive",
        rawText: "THE PLAYER DISCARDS 1 OFFENSIVE SIGN (PURPLE) OR DEFENSIVE SIGN (YELLOW) CARD FROM THEIR HAND. IF THEY ARE NOT ABLE TO DISCARD IT, THEY DISCARD 1 CARD FROM THE TOP OF THEIR DECK (EMPTY DECK: ANY 1 CARD FROM THEIR HAND).",
        trigger: "immediate",
        target: "any",
        effect: [
          {
            type: "UNPARSED_RULE"
          }
        ],
        debug: {
          source: 'passive',
          parseWarnings: [],
          normalized: true
        }
      }
    ],
    specialAttacks: {
      Special1: [
        {
          id: "monster_noonwraith_special_special1_noonwraith_special1",
          rawText: "THE PLAYER TAKES 3 DAMAGE. DURING THE MONSTER'S NEXT FIGHT TURN: THE PLAYER CONTROLLING THE MONSTER PICKS THE ATTACK TYPE AFTER REVEALING THE MONSTER FIGHT CARD. (SOLO: THE PLAYER PICKS THE ATTACK DEALING MORE DAMAGE.)",
          trigger: "immediate",
          target: "monster",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 3
            }
          ],
          debug: {
            source: 'Special1',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special2: [
        {
          id: "monster_noonwraith_special_special2_noonwraith_special2",
          rawText: "THE PLAYER TAKES 3 DAMAGE. DURING STEP 4 OF PLAYER'S NEXT FIGHT TURN, THEY DRAW A MAXIMUM OF 1 CARD.",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 3
            }
          ],
          debug: {
            source: 'Special2',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special3: [
        {
          id: "monster_noonwraith_special_special3_noonwraith_special3",
          rawText: "THE PLAYER TAKES 2 DAMAGE, INCREASED BY THE NUMBER OF POTIONS THEY POSSESS.",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 2
            }
          ],
          debug: {
            source: 'Special3',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special4: [
        {
          id: "monster_noonwraith_special_special4_noonwraith_special4",
          rawText: "THE PLAYER TAKES 2 DAMAGE, DURING THE PLAYER'S NEXT FIGHT TURN: EACH STRONG ATTACK (RED) AND FAST ATTACK (BLUE) CARD DEALS 1 DAMAGE LESS.",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 2
            }
          ],
          debug: {
            source: 'Special4',
            parseWarnings: [],
            normalized: true
          }
        }
      ]
    }
  },
  {
    id: "monster_penitent",
    name: "Penitent",
    type: 'Monster',
    level: 2,
    life: 14,
    ability: [
      {
        id: "monster_penitent_ability_penitent_ability",
        rawText: "IF THE PLAYER DO NOT HAVE THE TRAIL TOKEN FOR PENITENT, THEY CANNOT DEAL ANY DAMAGE DURING THEIR FIRST FIGHT TURN.",
        trigger: "firstTurnOnly",
        target: "any",
        effect: [
          {
            type: "UNPARSED_RULE"
          }
        ],
        debug: {
          source: 'ability',
          parseWarnings: [],
          normalized: true
        }
      }
    ],
    passive: [
      {
        id: "monster_penitent_passive_penitent_passive",
        rawText: "(ONLY HUMAN) DURING THIS PLAYER'S NEXT FIGHT TURN, THEY IGNORE DRAWING MODIFIERS IN THEIR COMBO.",
        trigger: "immediate",
        target: "human",
        effect: [
          {
            type: "UNPARSED_RULE"
          }
        ],
        debug: {
          source: 'passive',
          parseWarnings: [],
          normalized: true
        }
      }
    ],
    specialAttacks: {
      Special1: [
        {
          id: "monster_penitent_special_special1_penitent_special1",
          rawText: "THE PLAYER TAKES 1 DAMAGE, INCRASED BY THE NUMBER OF THE PENITENT'S WEAKNESS TOKENS THEY POSSESS.",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 1
            }
          ],
          debug: {
            source: 'Special1',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special2: [
        {
          id: "monster_penitent_special_special2_penitent_special2",
          rawText: "THE MONSTER DRAWS 1 RANDOM CARD FROM THE PLAYER'S HAND (EMPTY HAND: FROM THE TOP OF THEIR DECK) AND DEALS DAMAGE EQUAL TO THE NUMBER OF DAMAGE SYMBOLS SHOWN IN THAT CARD'S FIGHT ABILITY SECTION. AFTER, THAT CARD IS DISCARDED.",
          trigger: "immediate",
          target: "monster",
          effect: [
            {
              type: "UNPARSED_RULE"
            }
          ],
          debug: {
            source: 'Special2',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special3: [
        {
          id: "monster_penitent_special_special3_penitent_special3",
          rawText: "THE PLAYER TAKES 3 DAMAGE AND DISCARDS 1 RANDOM CARD FROM THEIR HAND.",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 3
            }
          ],
          debug: {
            source: 'Special3',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special4: [
        {
          id: "monster_penitent_special_special4_penitent_special4",
          rawText: "THE PLAYER TAKES 3 DAMAGE. (ONLY HUMAN) DURING THE PLAYER'S NEXT FIGHT TURN, THEY MAY ONLY PLAY FAST ATTACK (BLUE) AND DEFENSIVE SIGN (YELLOW) CARDS IN THEIR COMBO. IF THE PLAYER HAS NONE OF THOSE THEY CANNOT PLAY THEIR COMBO.",
          trigger: "immediate",
          target: "human",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 3
            }
          ],
          debug: {
            source: 'Special4',
            parseWarnings: [],
            normalized: true
          }
        }
      ]
    }
  },
  {
    id: "monster_water_hag",
    name: "Water Hag",
    type: 'Monster',
    level: 2,
    life: 15,
    ability: [
      {
        id: "monster_water_hag_ability_water_hag_ability",
        rawText: "BEFORE THE PLAYER CREATES THEIR LIFE POOL, THEY DISCARD 1 CARD FROM THEIR DECK.",
        trigger: "beforeLifePool",
        target: "any",
        effect: [
          {
            type: "DISCARD_FROM_DECK",
            value: 1
          }
        ],
        debug: {
          source: 'ability',
          parseWarnings: [],
          normalized: true
        }
      }
    ],
    passive: [
      {
        id: "monster_water_hag_passive_water_hag_passive",
        rawText: "THE PLAYER DISCARDS 1 STRONG ATTACK (RED) CARD FROM THEIR HAND. (ONLY HUMAN) IF THEY ARE NOT ABLE TO DISCARD IT, THEY PLACE ANY 2 CARDS FROM THEIR HAND ON THE BOTTOM OF THEIR DECK.",
        trigger: "immediate",
        target: "human",
        effect: [
          {
            type: "UNPARSED_RULE"
          }
        ],
        debug: {
          source: 'passive',
          parseWarnings: [],
          normalized: true
        }
      }
    ],
    specialAttacks: {
      Special1: [
        {
          id: "monster_water_hag_special_special1_water_hag_special1",
          rawText: "THE PLAYER TAKES 2 DAMAGE. DURING THE PLAYER'S NEXT FIGHT TURN, THEY PLAY THE FIRST CARD IN COMBO RANDOMLY.",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 2
            }
          ],
          debug: {
            source: 'Special1',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special2: [
        {
          id: "monster_water_hag_special_special2_water_hag_special2",
          rawText: "THE PLAYER TAKES 3 DAMAGE. DURING THE NEXT PLAYER'S FIGHT TURN, IGNORE SHIELD SYMBOLS IN THE PLAYER'S COMBO.",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 3
            }
          ],
          debug: {
            source: 'Special2',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special3: [
        {
          id: "monster_water_hag_special_special3_water_hag_special3",
          rawText: "THE PLAYER TAKES 3 DAMAGE. IF THE NEXT PLAYER'S COMBO HAS NO DEFENSIVE SIGH (YELLOW) CARDS, IT DEALS 3 DAMAGE LESS.",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 3
            }
          ],
          debug: {
            source: 'Special3',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special4: [
        {
          id: "monster_water_hag_special_special4_water_hag_special4",
          rawText: "THE PLAYER TAKES 3 DAMAGE. (ONLY HUMAN) DURING STEP 4 OF PLAYER'S NEXT TURN, THEY DRAW 0 CARDS.",
          trigger: "immediate",
          target: "human",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 3
            }
          ],
          debug: {
            source: 'Special4',
            parseWarnings: [],
            normalized: true
          }
        }
      ]
    }
  },
  {
    id: "monster_weavess",
    name: "Weavess",
    type: 'Monster',
    level: 2,
    life: 14,
    ability: [
      {
        id: "monster_weavess_ability_weavess_ability",
        rawText: "BEFORE THE PLAYER CREATES THEIR LIFE POOL, THEIR DEFENSE LEVEL IS LOWERED BY 1. LOWER THEIR SHIELD LEVEL IF IT IS ABOVE THEIR MAXIMUM.",
        trigger: "beforeLifePool",
        target: "any",
        effect: [
          {
            type: "UNPARSED_RULE"
          }
        ],
        debug: {
          source: 'ability',
          parseWarnings: [],
          normalized: true
        }
      }
    ],
    passive: [
      {
        id: "monster_weavess_passive_weavess_passive",
        rawText: "(HUMAN ONLY) THE ACTIVE PLAYER SHOWS CARDS FROM THEIR HAND TO THE PLAYER CONTROLLING THE MONSTER, WHO DISCARDS ANY 1 CARD OF THE LOWEST COST FROM ACTIVE PLAYER'S HAND (EMPTY HAND: TOP CARD FROM THEIR DECK). (SOLO: THEY DISCARD ANY 1 CARD OF THE LOWEST COST FROM THEIR HAND.) (AUTOMA ONLY) DISCARD TOP CARD.",
        trigger: "immediate",
        target: "monster",
        effect: [
          {
            type: "UNPARSED_RULE"
          }
        ],
        debug: {
          source: 'passive',
          parseWarnings: [],
          normalized: true
        }
      }
    ],
    specialAttacks: {
      Special1: [
        {
          id: "monster_weavess_special_special1_weavess_special1",
          rawText: "THE MONSTER DRAWS 1 RANDOM CARD FROM THE PLAYER'S HAND (EMPTY HAND: FROM THE TOP OF THEIR DECK) AND DEALS DAMAGE EQUAL TO THE NUMBER OF ALL SYMBOLS SHOWN IN THIS CARD'S FIGHT ABILITY SECTION. AFTER, THIS CARD IS DISCARDED)",
          trigger: "immediate",
          target: "monster",
          effect: [
            {
              type: "UNPARSED_RULE"
            }
          ],
          debug: {
            source: 'Special1',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special2: [
        {
          id: "monster_weavess_special_special2_weavess_special2",
          rawText: "THE PLAYER TAKES 5 DAMAGE DECREASED BY THE NUMBER OF WEAVESS' WEAKNESS TOKENS THEY POSESS.",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 5
            }
          ],
          debug: {
            source: 'Special2',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special3: [
        {
          id: "monster_weavess_special_special3_weavess_special3",
          rawText: "THE PLAYER TAKES 1 DAMAGE (ONLY HUMAN) AND DISCARD ANY 1 HIGHEST0COST CARD FROM THEIR HAND.",
          trigger: "immediate",
          target: "human",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 1
            }
          ],
          debug: {
            source: 'Special3',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special4: [
        {
          id: "monster_weavess_special_special4_weavess_special4",
          rawText: "(ONLY AUTOMA) THE PLAYER TAKES 3 DAMAGE. (ONLY HUMAN) THE PLAYER TAKES 1 DAMAGE. THE PLAYER LOOK AT THE TOP 3 CARDS FROM THEIR DECK AND TRASHES 1 OF THEM (EMPTY DECK: ANY 1 CARD FROM THEIR HAND).",
          trigger: "immediate",
          target: "human",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 3
            }
          ],
          debug: {
            source: 'Special4',
            parseWarnings: [],
            normalized: true
          }
        }
      ]
    }
  },
  {
    id: "monster_werewolf",
    name: "Werewolf",
    type: 'Monster',
    level: 2,
    life: 14,
    ability: [
      {
        id: "monster_werewolf_ability_werewolf_ability",
        rawText: "BEFORE THE PLAYER CREATES THEIR LIFE POOL, THEY LOWER THEIR SHIELD LEVEL BY 2.",
        trigger: "beforeLifePool",
        target: "any",
        effect: [
          {
            type: "MODIFY_SHIELD",
            value: -2
          }
        ],
        debug: {
          source: 'ability',
          parseWarnings: [],
          normalized: true
        }
      }
    ],
    passive: [
      {
        id: "monster_werewolf_passive_werewolf_passive",
        rawText: "THE MONSTER IGNORES HALF OF THE FURTHER DAMAGE IN THIS PLAYER'S FIGHT TURN (ROUNDED UP)",
        trigger: "immediate",
        target: "monster",
        effect: [
          {
            type: "UNPARSED_RULE"
          }
        ],
        debug: {
          source: 'passive',
          parseWarnings: [],
          normalized: true
        }
      }
    ],
    specialAttacks: {
      Special1: [
        {
          id: "monster_werewolf_special_special1_werewolf_special1",
          rawText: "THE PLAYER DISCARDS 1 POTION, TAKES 2 DAMAGE (ONLY HUMAN) AND LOSES 1 GOLD",
          trigger: "immediate",
          target: "human",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 2
            }
          ],
          debug: {
            source: 'Special1',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special2: [
        {
          id: "monster_werewolf_special_special2_werewolf_special2",
          rawText: "THE PLAYER TAKES 3 DAMAGE. DURING THE PLAYER'S NEXT FIGHT TURN, THEY DEAL 2 DAMAGE LESS",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 3
            }
          ],
          debug: {
            source: 'Special2',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special3: [
        {
          id: "monster_werewolf_special_special3_werewolf_special3",
          rawText: "THE PLAYER TAKES 4 DAMAGE. (ONLY HUMAN) THE PLAYER MAY NOT PLAY ANY FAST ATTACK (BLUE) CARDS DURING THEIR NEXT FIGHT TURN",
          trigger: "immediate",
          target: "human",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 4
            }
          ],
          debug: {
            source: 'Special3',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special4: [
        {
          id: "monster_werewolf_special_special4_werewolf_special4",
          rawText: "(ONLY HUMAN) THE PLAYER TAKES DAMAGE EQUAL TRO THE NUMBER OF CARDS IN THEIR HAND. (ONLY AUTOMATE) THE PLAYER TAKES 3 DAMAGE.",
          trigger: "immediate",
          target: "human",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 3
            }
          ],
          debug: {
            source: 'Special4',
            parseWarnings: [],
            normalized: true
          }
        }
      ]
    }
  },
  {
    id: "monster_whispess",
    name: "Whispess",
    type: 'Monster',
    level: 2,
    life: 15,
    ability: [
      {
        id: "monster_whispess_ability_whispess_ability",
        rawText: "DURING THE ENTIRE FIGHT: EACH TIME THE PLAYER'S COMBO INCLUDES DEFENSIVE SIGN (YELLOW) CARD, THEY LOWER THEIR SHIELD LEVEL BY 2.",
        trigger: "persistent",
        target: "any",
        effect: [
          {
            type: "MODIFY_SHIELD",
            value: -2
          }
        ],
        debug: {
          source: 'ability',
          parseWarnings: [],
          normalized: true
        }
      }
    ],
    passive: [
      {
        id: "monster_whispess_passive_whispess_passive",
        rawText: "DURING THE MONSTER'S NEXT FIGHT TURN: THE PLAYER CONTROLLING THE MONSTER PICKS THE ATTACK TYPE AFTER REVEALING THE MONSTER FIGHT CARD. (SOLO: THE PLAYER PICKS THE ATTACK DEALING MORE DAMAGE)",
        trigger: "immediate",
        target: "monster",
        effect: [
          {
            type: "UNPARSED_RULE"
          }
        ],
        debug: {
          source: 'passive',
          parseWarnings: [],
          normalized: true
        }
      }
    ],
    specialAttacks: {
      Special1: [
        {
          id: "monster_whispess_special_special1_whispess_special1",
          rawText: "THE PLAYER TAKES 1 DAMAGE (ONLY HUMAN) AND LOSES 4 GOLD.",
          trigger: "immediate",
          target: "human",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 1
            }
          ],
          debug: {
            source: 'Special1',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special2: [
        {
          id: "monster_whispess_special_special2_whispess_special2",
          rawText: "(ONLY HUMAN) THE PLAYER IMMEDIATELY PLAYS A COMBO OF 3 CARDS, IGNORING DAMAGE SYMBOLS. IF THEY CANNOT, THEY TAKE 4 DAMAGE. (ONLY AUTOMATE) THE PLAYER TAKES 4 DAMAGE.",
          trigger: "immediate",
          target: "human",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 4
            }
          ],
          debug: {
            source: 'Special2',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special3: [
        {
          id: "monster_whispess_special_special3_whispess_special3",
          rawText: "THE PLAYER TAKES 3 DAMAGE (ONLY HUMAN) AND PLACES 2 RANDOMLY CHOSEN CARDS FROM THEIR HAND BACK ON TOP OF THEIR DECK.",
          trigger: "immediate",
          target: "human",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 3
            }
          ],
          debug: {
            source: 'Special3',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special4: [
        {
          id: "monster_whispess_special_special4_whispess_special4",
          rawText: "THE PLAYER TAKES 3 DAMAGE (ONLY HUMAN) AND PLACES 4 RANDOMLY CHOSEN CARDS FROM THEIR HAND BACK ON TOP OF THEIR DECK.",
          trigger: "immediate",
          target: "human",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 3
            }
          ],
          debug: {
            source: 'Special4',
            parseWarnings: [],
            normalized: true
          }
        }
      ]
    }
  },
  {
    id: "monster_wyvern",
    name: "Wyvern",
    type: 'Monster',
    level: 2,
    life: 15,
    ability: [
      {
        id: "monster_wyvern_ability_wyvern_ability",
        rawText: "AT THE END OF THE MONSTER'S FIRST FIGHT TURN, THE PLAYER DISCARD  1 RANDOM CARD FROM THEIR HAND.",
        trigger: "firstTurnOnly",
        target: "monster",
        effect: [
          {
            type: "UNPARSED_RULE"
          }
        ],
        debug: {
          source: 'ability',
          parseWarnings: [],
          normalized: true
        }
      }
    ],
    passive: [
      {
        id: "monster_wyvern_passive_wyvern_passive",
        rawText: "(ONLY HUMAN) THE PLAYER DISCARDS 1 CARD WITH THE MOST EXTENSIONS FROM THEIR HAND.",
        trigger: "immediate",
        target: "human",
        effect: [
          {
            type: "UNPARSED_RULE"
          }
        ],
        debug: {
          source: 'passive',
          parseWarnings: [],
          normalized: true
        }
      }
    ],
    specialAttacks: {
      Special1: [
        {
          id: "monster_wyvern_special_special1_wyvern_special1",
          rawText: "THE PLAYER DISCARDS 1 FAST ATTACK (BLUE) CARD FROM THEIR HAND. IF THEY ARE NOT ABLE TO DISCARD IT, THEY TAKE 4 DAMAGE.",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "UNPARSED_RULE"
            }
          ],
          debug: {
            source: 'Special1',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special2: [
        {
          id: "monster_wyvern_special_special2_wyvern_special2",
          rawText: "THE PLAYERTAKES 2 DAMAGE (ONLY HUMAN) AND TRASHES ANY 1 CARD FROM THEIR HAND.",
          trigger: "immediate",
          target: "human",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 2
            }
          ],
          debug: {
            source: 'Special2',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special3: [
        {
          id: "monster_wyvern_special_special3_wyvern_special3",
          rawText: "THE PLAYER TAKES 2 DAMAGE. (ONLY HUMAN) DURING THE PLAYER'S NEXT FIGHT TURN, THEY IGNORE DRAWING MODIFIERS IN THEIR COMBO.",
          trigger: "immediate",
          target: "human",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 2
            }
          ],
          debug: {
            source: 'Special3',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special4: [
        {
          id: "monster_wyvern_special_special4_wyvern_special4",
          rawText: "THE PLAYER TAKES 3 DAMAGE. (ONLY HUMAN) DURING THE PLAYER'S NEXT FIGHT TURN, THEY IGNORE ALL EXTENSION EFFECTS IN THEIR COMBO.",
          trigger: "immediate",
          target: "human",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 3
            }
          ],
          debug: {
            source: 'Special4',
            parseWarnings: [],
            normalized: true
          }
        }
      ]
    }
  },
  {
    id: "monster_brewess",
    name: "Brewess",
    type: 'Monster',
    level: 3,
    life: 17,
    ability: [
      {
        id: "monster_brewess_ability_brewess_ability",
        rawText: "DURING THE ENTIRE FIGHT: EACH TIME THE PLAYER'S COMBO INCLUDES DODGE (GREEN) OR DEFENSIVE (YELLOW) CARD, THE PLAYER DEALS 1 DAMAGE LESS.",
        trigger: "persistent",
        target: "any",
        effect: [
          {
            type: "UNPARSED_RULE"
          }
        ],
        debug: {
          source: 'ability',
          parseWarnings: [],
          normalized: true
        }
      }
    ],
    passive: [
      {
        id: "monster_brewess_passive_brewess_passive",
        rawText: "DURING THE MONSTER'S NEXT FIGHT TURN: THE MONSTER DEALS 2 MORE DAMAGE.",
        trigger: "immediate",
        target: "monster",
        effect: [
          {
            type: "UNPARSED_RULE"
          }
        ],
        debug: {
          source: 'passive',
          parseWarnings: [],
          normalized: true
        }
      }
    ],
    specialAttacks: {
      Special1: [
        {
          id: "monster_brewess_special_special1_brewess_special1",
          rawText: "THE PLAYER TAKES 2 DAMAGE (ONLY HUMAN) AND DISCARDS ALL DODGE (GREEN) AND DEFENSIVE SIGN (YELLOW) CARDS FROM THEIR HAND.",
          trigger: "immediate",
          target: "human",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 2
            }
          ],
          debug: {
            source: 'Special1',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special2: [
        {
          id: "monster_brewess_special_special2_brewess_special2",
          rawText: "THE PLAYER DISCARDS 3 CARDS FROM THEIR DECK.",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "UNPARSED_RULE"
            }
          ],
          debug: {
            source: 'Special2',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special3: [
        {
          id: "monster_brewess_special_special3_brewess_special3",
          rawText: "THE PLAYER TAKES 4 DAMAGE. (ONLY HUMAN) DURING THE PLAYER'S NEXT FIGHT TURN, IGNORE ALL EXTENSION EFFECTS IN COMBO.",
          trigger: "immediate",
          target: "human",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 4
            }
          ],
          debug: {
            source: 'Special3',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special4: [
        {
          id: "monster_brewess_special_special4_brewess_special4",
          rawText: "THE PLAYER TAKES 5 DAMAGE. (ONLY HUMAN) DURING THE PLAYER'S NEXT FIGHT TURN, IGNORE ALL EXTENSION EFFECTS IN COMBO.",
          trigger: "immediate",
          target: "human",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 5
            }
          ],
          debug: {
            source: 'Special4',
            parseWarnings: [],
            normalized: true
          }
        }
      ]
    }
  },
  {
    id: "monster_bruxa",
    name: "Bruxa",
    type: 'Monster',
    level: 3,
    life: 17,
    ability: [
      {
        id: "monster_bruxa_ability_bruxa_ability",
        rawText: "DURING EACH MONSTER's FIGHT TURN THAT THE MONSTER HAS ONLY 1 OR 2 CARDS IN THEIR DECK, ITS ATTACK DEALS 2 ADDITIONAL DAMAGE.",
        trigger: "immediate",
        target: "monster",
        effect: [
          {
            type: "UNPARSED_RULE"
          }
        ],
        debug: {
          source: 'ability',
          parseWarnings: [],
          normalized: true
        }
      }
    ],
    passive: [
      {
        id: "monster_bruxa_passive_bruxa_passive",
        rawText: "DRAW A RANDOM LEVEL 3 MONSTER LARGE CARD AND APPLY THE PASSIVE ATTACK OF THE DRAWN MONSTER.",
        trigger: "immediate",
        target: "monster",
        effect: [
          {
            type: "UNPARSED_RULE"
          }
        ],
        debug: {
          source: 'passive',
          parseWarnings: [],
          normalized: true
        }
      }
    ],
    specialAttacks: {
      Special1: [
        {
          id: "monster_bruxa_special_special1_bruxa_special1",
          rawText: "IF THE PLAYER'S SHIELD LEVEL IS 0, THEY TAKE 3 DAMAGE. OTHERWISE, THE PLAYER TAKES 5 DAMAGE.",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 5
            }
          ],
          debug: {
            source: 'Special1',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special2: [
        {
          id: "monster_bruxa_special_special2_bruxa_special2",
          rawText: "THE PLAYER TAKES 4 DAMAGE. THE PLAYER MAY NOT PLAY ANY STRONG ATTACK (RED) CARDS DURING NEXT FIGHT TURN.",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 4
            }
          ],
          debug: {
            source: 'Special2',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special3: [
        {
          id: "monster_bruxa_special_special3_bruxa_special3",
          rawText: "THE PLAYER DISCARDS 3 CARDS FROM THE TOP OF THEIR DECK (EMPTY DECK: ANY CARDS FROM THEIR HAND).",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "UNPARSED_RULE"
            }
          ],
          debug: {
            source: 'Special3',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special4: [
        {
          id: "monster_bruxa_special_special4_bruxa_special4",
          rawText: "THE PLAYER DISCARDS ANY 3 CARDS FROM THEIR HAND (EMPTY HAND: FROM TOP OF THEIR DECK). (ONLY HUMAN) THE PLAYER MAY NOT PLAY ANY DODGE (GREEN) CARDS DURING THEIR NEXT FIGHT TURN.",
          trigger: "immediate",
          target: "human",
          effect: [
            {
              type: "UNPARSED_RULE"
            }
          ],
          debug: {
            source: 'Special4',
            parseWarnings: [],
            normalized: true
          }
        }
      ]
    }
  },
  {
    id: "monster_glustyworp",
    name: "Glustyworp",
    type: 'Monster',
    level: 3,
    life: 18,
    ability: [
      {
        id: "monster_glustyworp_ability_glustyworp_ability",
        rawText: "DURING THE PLAYER'S FIRST FIGHT TURN ONLY, THEY CAN DEAL A MAXIMUM OF 1 DAMAGE.",
        trigger: "firstTurnOnly",
        target: "any",
        effect: [
          {
            type: "UNPARSED_RULE"
          }
        ],
        debug: {
          source: 'ability',
          parseWarnings: [],
          normalized: true
        }
      }
    ],
    passive: [
      {
        id: "monster_glustyworp_passive_glustyworp_passive",
        rawText: "THE MONSTER IGNORES ALL OF THE FURTHER DAMAGE IN THIS PLAYER'S FIGHT TURN (IF ANY). THE PLAYER DRAWS 2 POTION AND RESET THEIR POTIONS LIMIT.",
        trigger: "immediate",
        target: "monster",
        effect: [
          {
            type: "UNPARSED_RULE"
          }
        ],
        debug: {
          source: 'passive',
          parseWarnings: [],
          normalized: true
        }
      }
    ],
    specialAttacks: {
      Special1: [
        {
          id: "monster_glustyworp_special_special1_glustyworp_special1",
          rawText: "THE PLAYER DISCARDS 1 DEFENSIVE SIGH (YELLOW) CARD FROM THEIR HAND. IF THEY ARE NOT ABLE TO DISCARD IT, THEY TAK 5 DAMAGE. GLUSTYWORP ATTACK AGAIN.",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "EXTRA_ATTACK"
            }
          ],
          debug: {
            source: 'Special1',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special2: [
        {
          id: "monster_glustyworp_special_special2_glustyworp_special2",
          rawText: "THE PLAYER TAKES 4 DAMAGE. DURING THE PLAYER'S NEXT FIGHT TURN, IGNORE SHIELD SYMBOLS IN THE PLAYER'S COMBO.",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 4
            }
          ],
          debug: {
            source: 'Special2',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special3: [
        {
          id: "monster_glustyworp_special_special3_glustyworp_special3",
          rawText: "THE PLAYER LOWERS THEIR SHIELD LEVEL TO 0 AND DISCARD ANY 2 CARDS FROM THEIR HAND (EMPTY HAND: FROM THE TOP OF THEIR DECK).",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "UNPARSED_RULE"
            }
          ],
          debug: {
            source: 'Special3',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special4: [
        {
          id: "monster_glustyworp_special_special4_glustyworp_special4",
          rawText: "THE PLAYER TAKES 5 DAMAGEÉ (ONLY HUMAN) DURING STEP 4 OF PLAYER'S NEXT FIGHT TURN, THEY DRAW 2 CARDS LESS",
          trigger: "immediate",
          target: "human",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 5
            }
          ],
          debug: {
            source: 'Special4',
            parseWarnings: [],
            normalized: true
          }
        }
      ]
    }
  },
  {
    id: "monster_leshen",
    name: "Leshen",
    type: 'Monster',
    level: 3,
    life: 19,
    ability: [
      {
        id: "monster_leshen_ability_leshen_ability",
        rawText: "TEMPORARILY, DURING THIS FIGHT ONLY, THE PLAYER'S DEFENSE LEVEL IS LOWERED BY 1. LOWER THEIR SHIELD LEVEL IF IT IS ABOVE THEIR MAXIMUM.",
        trigger: "immediate",
        target: "any",
        effect: [
          {
            type: "UNPARSED_RULE"
          }
        ],
        debug: {
          source: 'ability',
          parseWarnings: [],
          normalized: true
        }
      }
    ],
    passive: [
      {
        id: "monster_leshen_passive_leshen_passive",
        rawText: "THE PLAYER TAKES DAMAGE EQUAL TO THE NUMBER OF DICE PLACED ON THE LESHEN'S CARD. IF 0, THE PLAYER TAKES 1 DAMAGE.",
        trigger: "immediate",
        target: "any",
        effect: [
          {
            type: "TAKE_DAMAGE",
            value: 1
          }
        ],
        debug: {
          source: 'passive',
          parseWarnings: [],
          normalized: true
        }
      }
    ],
    specialAttacks: {
      Special1: [
        {
          id: "monster_leshen_special_special1_leshen_special1",
          rawText: "THE PLAYER TAKES 3 DAMAGE. PLACE 2 DICE ON THE LESHEN'S CARD.",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 3
            }
          ],
          debug: {
            source: 'Special1',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special2: [
        {
          id: "monster_leshen_special_special2_leshen_special2",
          rawText: "DURING THE PLAYER'S NEXT FIGHT TURN, IGNORE DAMAGE SYMBOLS IN THE PLAYER'S COMBO. PLACE 1 DIE ON THE LESHEN'S CARD.",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "UNPARSED_RULE"
            }
          ],
          debug: {
            source: 'Special2',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special3: [
        {
          id: "monster_leshen_special_special3_leshen_special3",
          rawText: "(ONLY HUMAN) THE PLAYER TAKES DAMAGE EQUAL TO THE NUMBER OF DICE PLACED ON THE LESHEN'S CARD. DURING THE PLAYER'S NEXT FIGHT TURN, THE FIGHT ABILITY OF THE FIRST CARD IN THE COMBO HAS TO DEAL AT LEAST 2 DAAMGE. OTHERWISE, THE PLAYER CANNOT PLAY THEIR COMBO. (ONLY AUTOMATE) NEXT COMBO AT LEAST 2 DAMAGE, IF NOT SKIP ATTACK.",
          trigger: "immediate",
          target: "human",
          effect: [
            {
              type: "UNPARSED_RULE"
            }
          ],
          debug: {
            source: 'Special3',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special4: [
        {
          id: "monster_leshen_special_special4_leshen_special4",
          rawText: "IF THE PLAYER HAS THE TRAIL TOKEN FOR LESHEN AND AT LEAST 1 TRAIL TOKEN MORE, THEY TAKE 1 DAMAGE. OTHERWISE, THEY TAKE 4 DAMAGE. (ONLY HUMAN) DURING STEP 4 OF PLAYER'S NEXT FIGHT TURN, THEY DRAW 1 CARD LESS.",
          trigger: "immediate",
          target: "human",
          effect: [
            {
              type: "UNPARSED_RULE"
            }
          ],
          debug: {
            source: 'Special4',
            parseWarnings: [],
            normalized: true
          }
        }
      ]
    }
  },
  {
    id: "monster_striga",
    name: "Striga",
    type: 'Monster',
    level: 3,
    life: 18,
    ability: [
      {
        id: "monster_striga_ability_striga_ability",
        rawText: "BEFORE THE PLAYER CREATES THEIR LIFE POOL, THEY DISCARD 1 CARD FROM THEIR DECK.",
        trigger: "beforeLifePool",
        target: "any",
        effect: [
          {
            type: "DISCARD_FROM_DECK",
            value: 1
          }
        ],
        debug: {
          source: 'ability',
          parseWarnings: [],
          normalized: true
        }
      }
    ],
    passive: [
      {
        id: "monster_striga_passive_striga_passive",
        rawText: "THE MONSTER IGNORES ALL OF THE FURTHER DAMAGE IN THIS PLAYER'S FIGHTTURN (IF ANY). (ONLY HUMAN) IF THE PLAYER ALREADY PLAYED THEIR COMBO, THEY TAKE THE LAST CARD FROM IT AND ADD IT TO THEIR HAND.",
        trigger: "immediate",
        target: "human",
        effect: [
          {
            type: "UNPARSED_RULE"
          }
        ],
        debug: {
          source: 'passive',
          parseWarnings: [],
          normalized: true
        }
      }
    ],
    specialAttacks: {
      Special1: [
        {
          id: "monster_striga_special_special1_striga_special1",
          rawText: "THE PLAYER TAKES 4 DAMAGE. (ONLY HUMAN) DURING THE PLAYER'S NEXT FIGHT TURN, THEY APPLY ONLY EXTENSION EFFECTS IN THE COMBO.",
          trigger: "immediate",
          target: "human",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 4
            }
          ],
          debug: {
            source: 'Special1',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special2: [
        {
          id: "monster_striga_special_special2_striga_special2",
          rawText: "THE PLAYER LOWERS THEIR SHIELD LEVEL TO 0 (ONLY HUMAN) AND DISCARDS 2 RANDOM CARDS FROM THEIR HAND.",
          trigger: "immediate",
          target: "human",
          effect: [
            {
              type: "UNPARSED_RULE"
            }
          ],
          debug: {
            source: 'Special2',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special3: [
        {
          id: "monster_striga_special_special3_striga_special3",
          rawText: "(ONLY HUMAN) THE PLAYER TAKES DAMAGE EQUAL TO THE NUMBER OF CARDS IN THEIR HAND. (ONLY AUTOMATE) THE PLAYER TAKES 3 DAMAGE.",
          trigger: "immediate",
          target: "human",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 3
            }
          ],
          debug: {
            source: 'Special3',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special4: [
        {
          id: "monster_striga_special_special4_striga_special4",
          rawText: "THE PLAYER TAKES 3 DAMAGE AND DISCARDS 3 POTIONS.",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 3
            }
          ],
          debug: {
            source: 'Special4',
            parseWarnings: [],
            normalized: true
          }
        }
      ]
    }
  },
  {
    id: "monster_troll",
    name: "Troll",
    type: 'Monster',
    level: 3,
    life: 19,
    ability: [
      {
        id: "monster_troll_ability_troll_ability",
        rawText: "DURING THE MONSTER'S FIRT FIGHT TURN ONLY, THE MONSTER DEALS 3 ADDITIONAL DAMAGE",
        trigger: "immediate",
        target: "monster",
        effect: [
          {
            type: "UNPARSED_RULE"
          }
        ],
        debug: {
          source: 'ability',
          parseWarnings: [],
          normalized: true
        }
      }
    ],
    passive: [
      {
        id: "monster_troll_passive_troll_passive",
        rawText: "THE PLAYER CONTROLLING THE MONSTER PICKS 1 CARD FROM THE MONSTER FIGHT CARDS DISCARD PILE AND PLACES IT BACK ON THE TOP OF THE MONSTER'S LIFE POOL. (SOLO: DRAW 1 RANDOM DISCARDED MONSTER FIGHT CARD AND PLACE IT BACK ON TOP OF THE MONSTER'S LIFE POOL.)",
        trigger: "immediate",
        target: "monster",
        effect: [
          {
            type: "UNPARSED_RULE"
          }
        ],
        debug: {
          source: 'passive',
          parseWarnings: [],
          normalized: true
        }
      }
    ],
    specialAttacks: {
      Special1: [
        {
          id: "monster_troll_special_special1_troll_special1",
          rawText: "THE PLAYER TAKES 2 DAMAGE. DURING THE PLAYER'S NEXT FIGHT TURN, IGNORE SHIELD SYMBOLS IN THE PLAYER'S COMBO.",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 2
            }
          ],
          debug: {
            source: 'Special1',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special2: [
        {
          id: "monster_troll_special_special2_troll_special2",
          rawText: "THE PLAYER TAKES 2 DAMAGE.DURING THE PLAYER'S NEXT FIGHT TURN, THEY REVEAL 1 CARD FROM THE TOP OF THEIR DECK. THAT'S THE FIRST CARD IN THEIR COMBO (EMPTY DECK: THE PLAY THE FIRST CARD IN THEIR COMBO RANDOMLY).",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 2
            }
          ],
          debug: {
            source: 'Special2',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special3: [
        {
          id: "monster_troll_special_special3_troll_special3",
          rawText: "THE PLAYER TAKES 4 DAMAGE. (ONLY H UMAN) DURING STEP 4 OF PLAYER'S NEXT FIGHT TURN, THEY DRAW A MAXIMUM OF 1 CARD.",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 4
            }
          ],
          debug: {
            source: 'Special3',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special4: [
        {
          id: "monster_troll_special_special4_troll_special4",
          rawText: "THE PLAYER LOWERS THEIR SHIELD LEVEL TO 0 AND DISCARDS 2 RANDOM CARDS FROM THEIR HAND (EMPTY HAND: FROM THE TOP OF THEIR DECK).",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "UNPARSED_RULE"
            }
          ],
          debug: {
            source: 'Special4',
            parseWarnings: [],
            normalized: true
          }
        }
      ]
    }
  },
  {
    id: "monster_yghern",
    name: "Yghern",
    type: 'Monster',
    level: 3,
    life: 18,
    ability: [
      {
        id: "monster_yghern_ability_yghern_ability",
        rawText: "DURING THE ENTIRE FIGHT: EACH TIME THE PLAYER'S COMBO INCLUDES A FAST ATTACK (BLUE) CARD, THE PLAYER DEALS 1 DAMAGE LESS.",
        trigger: "persistent",
        target: "any",
        effect: [
          {
            type: "UNPARSED_RULE"
          }
        ],
        debug: {
          source: 'ability',
          parseWarnings: [],
          normalized: true
        }
      }
    ],
    passive: [
      {
        id: "monster_yghern_passive_yghern_passive",
        rawText: "IF THIS FIGHT TURN PLAYER'S COMBO HAS NO STRONG ATTACK (RD) CARDS, THE MONSTER IGNORES 2 OF THE FURTHER DAMAGE IN THIS PLAYER'S FIGHT TURN (IF ANY)",
        trigger: "immediate",
        target: "monster",
        effect: [
          {
            type: "UNPARSED_RULE"
          }
        ],
        debug: {
          source: 'passive',
          parseWarnings: [],
          normalized: true
        }
      }
    ],
    specialAttacks: {
      Special1: [
        {
          id: "monster_yghern_special_special1_yghern_special1",
          rawText: "THE PLAYERS TAKES 7 DAMAGE. THE PLAYER MAY DISCARD ANY UNUSED POTION TO DECREASE THE DAMAGE BY 1 OR DISCARD 2 UNUSED POTIONS, TO DECREASE THE DAMAGE BY 3.",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 7
            }
          ],
          debug: {
            source: 'Special1',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special2: [
        {
          id: "monster_yghern_special_special2_yghern_special2",
          rawText: "SPITTING ACIDTHE PLAYER DISCARDS 4 CARDS FROM THE TOP OF THEIR DECK (EMPTY DECK: ANY CARDS FROM THEIR HAND).",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "UNPARSED_RULE"
            }
          ],
          debug: {
            source: 'Special2',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special3: [
        {
          id: "monster_yghern_special_special3_yghern_special3",
          rawText: "THE PLAYER TAKES 3 DAMAGE. DURING THE PLAYER'S  NEXT FIGHT TURN, THEY MAY ONLY PLAY A COMBO OF 1 CARD.",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "TAKE_DAMAGE",
              value: 3
            }
          ],
          debug: {
            source: 'Special3',
            parseWarnings: [],
            normalized: true
          }
        }
      ],
      Special4: [
        {
          id: "monster_yghern_special_special4_yghern_special4",
          rawText: "THE PLAYER DISCARDS 1 DODGE (GREEN) CARD FROM THEIR HAND. IF THEY ARE NOT ABLE TO DISCARD IT, THEY TAKE 4 DAMAGE. YGHERN IMMEDIATELY PERFORMS ITS NEXT FIGHT TURN.",
          trigger: "immediate",
          target: "any",
          effect: [
            {
              type: "UNPARSED_RULE"
            }
          ],
          debug: {
            source: 'Special4',
            parseWarnings: [],
            normalized: true
          }
        }
      ]
    }
  }
]

export const MONSTER_DECKS = {
  LEVEL_1: [
    'monster_arachas',
    'monster_archespore',
    'monster_barghest',
    'monster_drowners_nest',
    'monster_ekimmara',
    'monster_foglet',
    'monster_ghouls_nest',
    "monster_harpy",
    "monster_nekkers_nest",
    "monster_rotfiend",
  ],
  LEVEL_2: [
    "monster_fiend",
    "monster_grave_hag",
    "monster_griffin",
    "monster_manticore",
    "monster_nightwraith",
    "monster_noonwraith",
    "monster_penitent",
    "monster_water_hag",
    "monster_weavess",
    "monster_werewolf",
    "monster_whispess",
    "monster_wyvern"
  ],
  LEVEL_3: [
    "monster_brewess",
    "monster_bruxa",
    "monster_glustyworp",
    "monster_leshen",
    "monster_striga",
    "monster_troll",
    "monster_yghern"
  ],
}

export const monstersById = Object.fromEntries(
  monsters.map(m => [m.id, m])
)
