import { MonsterFights } from '@/Enumerates/MonsterFight'
import { shuffle } from '@/utils/array'
import { useGameStore } from '@/stores/game'
import { schools } from '@/Enumerates/schools'
import { locations } from '@/Enumerates/locations'

export class CombatEngine {
  constructor() {
    this.attackingOrder = []
    this.combatLog = []
    this.automaSufferMaxDamageNextAttack = false
    this.monsterNextAttackDealMoreDamage = false
    this.automaSkipNextAttack = false
    this.useMonsterSpecialAttack = false
  }

  startFight(attacker, target, isMonster) {
    this.resetDeck(attacker)

    if (isMonster) {
      target = this.createMonsterSnapshot(target)
    } else {
      this.resetDeck(target)
    }

    this.attackingOrder = [attacker, target]
  }

  resetDeck(player) {
    if (player.type === 'Human') return
    player.challengeDeck.push(...player.challengeDiscard)
    player.challengeDeck = shuffle(player.challengeDeck)
    player.challengeDiscard = []
  }

  createMonsterSnapshot(monster) {
    console.log(monster)
    const target = {
      id: monster.id,
      name: monster.name,
      type: 'Monster',
      level: monster.level,
      life: monster.life,
      challengeDeck: [],
      challengeDiscard: [],
    }

    target.challengeDeck.push(
      ...(this.useMonsterSpecialAttack ? MonsterFights : MonsterFights.slice(0, 20)),
    )

    target.challengeDeck = shuffle(target.challengeDeck)

    const toRemove = target.challengeDeck.length - target.life

    target.challengeDiscard.push(...target.challengeDeck.splice(0, toRemove))

    return target
  }

  setCombatVariables(target) {
    const gameState = useGameStore()
    this.useMonsterSpecialAttack = gameState.setup.useMonsterSpecialAttack
    const currentPlayer = gameState.currentPlayer
    currentPlayer.value.challengeDeck.push(...currentPlayer.value.challengeDiscard)
    currentPlayer.value.challengeDeck = shuffle(currentPlayer.value.challengeDeck)
    currentPlayer.value.challengeDiscard = []

    const defender = {
      id: 'monster',
      name: target.name,
      type: 'Monster',
      level: target.level,
      life: target.life,
      challengeDeck: [],
      challengeDiscard: [],
    }

    defender.challengeDeck.push(
      ...(this.useMonsterSpecialAttack ? MonsterFights : MonsterFights.slice(0, 20)),
    )

    defender.challengeDeck = shuffle(defender.challengeDeck)

    const toRemove = defender.challengeDeck.length - defender.life
    defender.challengeDiscard.push(...defender.challengeDeck.splice(0, toRemove))

    this.attackingOrder = [currentPlayer, defender]
  }

  autoCombat() {
    const [attacker, defender] = this.attackingOrder
    const location = locations.find((l) => l.id === attacker.currentLocation)
    console.log(location.type)
    let indx = attacker.trailTokens.includes(location.type) ? 0 : 1

    console.log('Start of Fight')
    console.log('Automa Life Pool: ' + attacker.challengeDeck.length)
    console.log('Monster Life Pool: ' + defender.challengeDeck.length)

    while (attacker.challengeDeck.length > 0 && defender.challengeDeck.length > 0) {
      if (indx === 0) {
        this.resolveAutomaAttack(indx)
      } else {
        this.resolveMonsterAttack(indx)
      }

      if (attacker.challengeDeck.length === 0) {
        this.combatLog.push({
          align: 'left',
          type: 'knockdown',
          icon: '🌀',
          text: 'The Automa is knocked down.',
        })
      }

      if (defender.challengeDeck.length === 0) {
        this.combatLog.push({
          align: 'right',
          type: 'death',
          icon: '☠️',
          text: 'The monster is dead.',
        })
      }

      console.log('Combat Round')
      console.log('Automa Life Pool: ' + attacker.challengeDeck.length)
      console.log('Monster Life Pool: ' + defender.challengeDeck.length)

      indx = 1 - indx
    }
    console.log('End of Fight')
  }

  isFinished() {
    const [attacker, defender] = this.attackingOrder

    if (attacker.type === 'Human') return defender.challengeDeck.length === 0

    return attacker.challengeDeck.length === 0 || defender.challengeDeck.length === 0
  }

  getResult() {
    const [attacker, defender] = this.attackingOrder

    const attackerAlive = attacker.type === 'Human' ? attacker.isAlive : attacker.challengeDeck.length > 0

    const defenderAlive = defender.challengeDeck.length > 0

    let winner
    let loser
    if (attackerAlive || (!attackerAlive && !defenderAlive)) {
      winner = attacker
      loser = defender
    } else {
      winner = defender
      loser = attacker
    }
    return {
      winner,
      loser,
    }
  }

  resolveAutomaAttack(indx) {
    // Bot or Monster Attack
    const attacker = this.attackingOrder[indx]
    const challengeCard = attacker.challengeDeck.shift()

    if (!challengeCard) return

    attacker.challengeDiscard.push(challengeCard)

    let damage = challengeCard.attack
    let newAttack = false

    this.applyShield(attacker, challengeCard.shield)

    // Check if playing with Mutagen
    // Check Special
    const handler = this.specialHandlers[challengeCard.special]

    if (handler) {
      const result = handler.call(this, attacker, indx, damage)

      if (result?.damage !== undefined) damage = result.damage
      if (result?.newAttack !== undefined) newAttack = result.newAttack
    }
    this.logAttack(indx, damage, challengeCard.id)

    this.resolveDamage(indx, damage)

    return newAttack
  }

  applyShield(attacker, shieldValue) {
    attacker.shield += shieldValue
    if (attacker.shield > attacker.defense) {
      attacker.shield = attacker.defense
    }
  }

  specialHandlers = {
    POTION(attacker, indx) {
      // GET 1 POTION
      if (attacker.potions === 4) return

      attacker.potions++
      this.logSpecial(indx, 'The Automa get 1 potion')
    },

    POTION1DAMAGE(attacker, indx, damage) {
      if (attacker.potions <= 0) return
      attacker.potions--

      this.logSpecial(indx, 'The Automa uses 1 potion to deal +1 damage.')

      return { damage: damage + 1 }
    },

    POTION2DAMAGE(attacker, indx, damage) {
      if (attacker.potions <= 0) return
      attacker.potions--

      this.logSpecial(indx, 'The Automa uses 1 potion to deal +2 damage.')

      return { damage: damage + 2 }
    },

    POTION5DAMAGE(attacker, indx, damage) {
      if (attacker.potions <= 0) return
      attacker.potions--

      this.logSpecial(indx, 'The Automa uses 1 potion to deal +5 damage.')

      return { damage: damage + 5 }
    },

    DAMAGENORESOLVE(attacker, indx) {
      this.logSpecial(indx, 'The Automa loses 1 life.')

      const card = attacker.challengeDeck.shift()
      if (card) attacker.challengeDiscard.push(card)
    },

    POTIONATTACK(attacker, indx) {
      if (attacker.potions <= 0) return
      attacker.potions--

      this.logSpecial(indx, 'The Automa uses 1 potion to attack again.')

      return { newAttack: true }
    },

    BOMB2DAMAGEDAMAGENORESOLVE(attacker, indx, damage) {
      if (attacker.bombs <= 0) return
      attacker.bombs--

      this.logSpecial(indx, 'The Automa uses 1 bomb to deal +2 damage and loses 1 life.')

      const card = attacker.challengeDeck.shift()
      if (card) attacker.challengeDiscard.push(card)

      return { damage: damage + 2 }
    },

    HEAL1(attacker, indx) {
      this.logSpecial(indx, 'The Automa heals 1 life.')

      const card = attacker.challengeDiscard.pop()
      if (card) attacker.challengeDeck.push(card)
    },

    POTIONHEAL1(attacker, indx) {
      if (attacker.potions <= 0) return
      attacker.potions--

      this.logSpecial(indx, 'The Automa heals 1 life.')

      const card = attacker.challengeDiscard.pop()
      if (card) attacker.challengeDeck.push(card)
    },

    BOMBATTACK(attacker, indx) {
      if (attacker.bombs <= 0) return
      attacker.bombs--

      this.logSpecial(indx, 'The Automa uses 1 bomb to attack again.')

      return { newAttack: true }
    },

    POTIONSHIELDDAMAGE(attacker, indx) {
      if (attacker.potions <= 0 || attacker.shield <= 0) return
      attacker.potions--

      this.logSpecial(indx, `The Automa converts shield into ${attacker.shield} damage.`)

      return { damage: attacker.shield }
    },

    HEAL2(attacker, indx) {
      const card1 = attacker.challengeDiscard.pop()
      if (card1) attacker.challengeDeck.push(card1)

      const card2 = attacker.challengeDiscard.pop()
      if (card2) {
        attacker.challengeDeck.push(card2)
        this.logSpecial(indx, 'The Automa heals 2 life.')
      } else {
        this.logSpecial(indx, 'The Automa heals 1 life.')
      }
    },

    HEAL3(attacker, indx) {
      const discard = attacker.challengeDiscard
      const deck = attacker.challengeDeck

      if (discard.length === 0) return

      const card1 = discard.pop()
      if (card1) deck.push(card1)

      if (discard.length === 0) {
        this.logSpecial(indx, 'The Automa heals 1 life.')
        return
      }

      const card2 = discard.pop()
      if (card2) {
        deck.push(card2)
      }

      if (discard.length === 0) {
        this.logSpecial(indx, 'The Automa heals 2 life.')
        return
      }

      const card3 = discard.pop()
      if (card3) {
        deck.push(card3)
      }

      this.logSpecial(indx, 'The Automa heals 3 life.')
    },

    ATTACK(attacker, indx) {
      this.logSpecial(indx, 'The Automa attacks again.')

      return { newAttack: true }
    },

    POTION2SHIELD(attacker, indx) {
      if (attacker.potions <= 0) return
      attacker.potions--

      this.adjustShield(attacker, 2)

      this.logSpecial(indx, 'The Automa gains +2 shield.')
    },

    MAXSHIELD(attacker, indx) {
      this.adjustShield(attacker, attacker.defense)

      this.logSpecial(indx, 'The Automa gains max shield.')
    },

    SPECIAL1(attacker, indx, damage) {
      this.resolveSchoolSpecial('SPECIAL1', attacker, indx, damage)
    },

    SPECIAL2(attacker, indx, damage) {
      this.resolveSchoolSpecial('SPECIAL2', attacker, indx, damage)
    },

    SPECIAL3(attacker, indx, damage) {
      this.resolveSchoolSpecial('SPECIAL3', attacker, indx, damage)
    },

    SPECIALSK1(attacker, indx, damage) {
      switch (attacker.level) {
        case 1:
        case 3:
          this.adjustShield(attacker, 2)
          this.logSpecial(indx, 'Special Skill: +1 damage, +2 shield.')
          return { damage: damage + 1 }

        case 2:
          this.adjustShield(attacker, 2)
          this.logSpecial(indx, 'Special Skill: +2 damage, +2 shield.')
          return { damage: damage + 2 }

        default:
          this.adjustShield(attacker, 3)
          this.logSpecial(indx, 'Special Skill: +1 damage, +3 shield.')
          return { damage: damage + 1 }
      }
    },

    SPECIALSK2(attacker, indx, damage) {
      const bonus = attacker.level + 1

      this.logSpecial(indx, `Special Skill: +${bonus} damage.`)

      return { damage: damage + bonus }
    },
    // eslint-disable-next-line no-unused-vars
    NONE(attacker, indx) {
      // NOTHING HAPPEN
    },

    // eslint-disable-next-line no-unused-vars
    TWODAMAGENEXTATTACK(attacker, indx) {
      // TODO
    },
  }

  logAttack(indx, damage, cardId) {
    const attacker = this.attackingOrder[indx]

    this.combatLog.push({
      align: indx === 0 ? 'left' : 'right',
      type: 'attack',
      icon: '⚔️',
      text: `${attacker.name} strikes for ${damage} Damage. (${cardId})`,
    })
  }

  logSpecial(indx, text) {
    this.combatLog.push({
      align: indx === 0 ? 'left' : 'right',
      type: 'special',
      icon: '⚡',
      text: text,
    })
  }

  resolveDamage(indx, damage) {
    const defender = this.attackingOrder[1 - indx]

    if (defender.type === 'Monster') {
      this.resolveMonsterDefense(1, damage)
    } else if (defender.type === 'Automa') {
      this.resolveAutomaDefense(1 - indx, damage)
    }
  }

  resolveCounterDamage(indx, attacker, damage) {
        this.combatLog.push({
          align: indx === 0 ? 'left' : 'right',
          type: 'counterattack',
          icon: '⚔️',
          text: 'The Automa strikes back for ' + damage + ' counter Damage.',
        })
        if (attacker.type == 'Automa') {
          // Resolve Damage to Automa
          this.resolveAutomaDefense(1 - indx, damage)
        } else if (attacker.type == 'Human') {
          // Wait for Player Counter input
        } else {
          // Resolve Damage to Monster
          this.resolveMonsterDefense(1, damage)
        }
  }

  resolveAutomaDefense(indx, damage) {
    // Defender is an Automa
    const [attacker, defender] = this.attackingOrder
    if (defender.type == 'Automa') {
      // Use shield before taking damage
      let remainingDamage = damage
      if (remainingDamage > defender.shield) {
        remainingDamage -= defender.shield
        defender.shield = 0
      } else if (remainingDamage <= defender.shield) {
        defender.shield -= remainingDamage
        remainingDamage = 0
      }
      for (let i = 0; i < remainingDamage && defender.challengeDeck.length > 0; i++) {
        defender.challengeDiscard.push(defender.challengeDeck.shift())
        let card = defender.challengeDiscard.at(-1)
        if (card.counter == 'RAISESHIELDMAX') {
          defender.shield = defender.defense
          this.combatLog.push({
            align: indx === 0 ? 'left' : 'right',
            type: 'special',
            icon: '⚡',
            text: 'The Automa raise his shield to maximum. (' + card.id + ')',
          })
        } else if (card.counter == '2DAMAGE') {
          this.resolveCounterDamage(2)
          if (attacker.type === 'Human') {
            return
          }
        }
      }
    } else {
      console.log("FightSection.Vue : resolveAutomaDefense : It's not an Automa")
    }
  }

  resolveMonsterAttack(indx) {
    // todo flip a card to attack
    const [attacker, defender] = this.attackingOrder

    let attackCard = defender.challengeDeck.shift()
    let monsterDamage = Math.random() > 0.5 ? attackCard.charge : attackCard.bite
    if (monsterDamage == 'MonsterLvl') {
      monsterDamage = defender.level
    } else if (monsterDamage == 'MonsterLvlPlus2') {
      monsterDamage = defender.level + 2
    } else if (monsterDamage == 'Specialty') {
      monsterDamage = attacker.specialty
    } else if (monsterDamage == 'Combat') {
      monsterDamage = attacker.combat
    } else if (monsterDamage == 'Alchemy') {
      monsterDamage = attacker.alchemy
    } else if (monsterDamage == 'Defense') {
      monsterDamage = attacker.defense
    } else if (monsterDamage == 'LowerAlchemyByMonsterLevelMinus1') {
      console.log('todo 1 Lower Alchemy By Monsert Level - 1')
    } else if (monsterDamage == 'LowerCombatByMonsterLevelMinus1') {
      console.log('todo 1 Lower Combat By Monsert Level - 1')
    } else if (monsterDamage == 'LowerDefenseByMonsterLevelMinus1') {
      console.log('todo 1 Lower Defense By Monsert Level - 1')
    } else if (monsterDamage == 'Special1') {
      console.log('todo 1 Monster Special 1')
    } else if (monsterDamage == 'Special2') {
      console.log('todo 1 Monster Special 2')
    } else if (monsterDamage == 'Special3') {
      console.log('todo 1 Monster Special 3')
    } else if (monsterDamage == 'Special4') {
      console.log('todo 1 Monster Special 4')
    } else if (monsterDamage == undefined) {
      console.log(attackCard.id)
    }
    if (monsterDamage > 4) {
      this.combatLog.push({
        align: indx === 0 ? 'left' : 'right',
        type: 'attack',
        icon: '⚔️',
        text:
          defender.name +
          ' lands a heavy blow for ' +
          monsterDamage +
          ' Damage. (' +
          attackCard.id +
          ')',
      })
    } else if (monsterDamage > 0) {
      this.combatLog.push({
        align: indx === 0 ? 'left' : 'right',
        type: 'attack',
        icon: '⚔️',
        text: defender.name + ' strikes for ' + monsterDamage + ' Damage. (' + attackCard.id + ')',
      })
    }
    // VERIFIER SI LA TARGET EST AU AUTOMA OU UN HUMAIN
    this.resolveAutomaDefense(1 - indx, monsterDamage)
  }

  resolveMonsterDefense(damage, purpleAttack, redAttack) {
    // Defender is a Monster
    const defender = this.attackingOrder[1]
    for (let i = 0; i < damage; i++) {
      let card = defender.challengeDeck.shift()
      defender.challengeDiscard.push(card)
      // if playing with Special Attack module
      if (this.useMonsterSpecialAttack) {
        if (card.charge.includes('Passive')) {
          // Check Passive Ability
          switch (defender.name) {
            case 'Arachas':
              this.arachasPassiveAttack(1)
              break

            case 'Archespore':
            case 'Ekimara':
              // Ignore 2 further Damage
              i += 2
              this.combatLog.push({
                align: 'right',
                type: 'passive',
                icon: '✨',
                text: 'The monster ignore 2 of the further damage.',
              })
              break

            case 'Barghest':
            case 'Penitent':
            case 'Water Hag':
            case 'Wyvern':
              // Nothing Happen!
              break

            case 'Drowners Nest':
              this.discardPotion(0, 1)
              break

            case 'Foglet':
            case 'Fiend':
            case 'Troll':
              // Monster Heal 1
              this.combatLog.push({
                align:'right',
                type: 'passive',
                icon: '✨',
                text: 'The monster heal 1 life.',
              })
              break

            case 'Ghouls Nest':
            case 'Manticore':
              // Ignore 1 further Damage
              i += 1
              this.combatLog.push({
                align: 'right',
                type: 'passive',
                icon: '✨',
                text: 'The monster ignore 1 of the further damage.',
              })
              break

            case 'Harpy':
              // Suffer half the further Damage (rounded down)
              this.sufferHalfFurtherDamage(0, damage - i)
              break

            case 'Nekkers Nest':
            case 'Whispess':
              // During next Attack, Suffer the Attack dealing more Damage
              this.automaSufferMaxDamageNextAttack = true
              break

            case 'Rotfiend':
              // Place 1 die on the Rotfiend's card (if there is none already)
              break

            case 'Grave Hag':
              this.graveHagPassiveAttack(0)
              break

            case 'Griffin':
              // If the Attack is not Red and Purple, ignores 2 of the further Damage
              if (!purpleAttack && !redAttack) {
                i += 2
                this.combatLog.push({
                  align: 'right',
                  type: 'passive',
                  icon: '✨',
                  text: 'The monster ignore 2 of the further damage.',
                })
              }
              break

            case 'Nightwraith':
              // If the Attack is not Purple, ignores all further Damage
              if (!purpleAttack) {
                i = damage
                this.combatLog.push({
                  align: 'right',
                  type: 'passive',
                  icon: '✨',
                  text: 'The monster ignore all of the further damage.',
                })
              }
              break

            case 'Noonwraith':
            case 'Weavess':
              // Suffer 1 Damage
              this.resolveAutomaDefense(0, 1)
              break

            case 'Werewolf':
              // Ignore Half of the further Damage (rounded up)
              i = damage
              this.combatLog.push({
                align: 'right',
                type: 'passive',
                icon: '✨',
                text: 'The monster ignore half (rounded up) of the further damage.',
              })
              break

            case 'Brewess':
              // Next Monster Attack Brewess deal 2 more Damage
              this.monsterNextAttackDealMoreDamage = 2
              break

            case 'Bruxa':
              // Draw a random Level III Monster, and apply the Passive Attack
              break

            case 'Glustyworp':
              // Ignore all of the further Damage in this attack
              // Add 2 Potions (max 4)
              i = damage
              this.combatLog.push({
                align: 'right',
                type: 'passive',
                icon: '✨',
                text: 'The monster ignore all of the further damage.',
              })
              break

            case 'Leshen':
              // Suffer Damage équal to the number of dice placed (min 1)
              break

            case 'Striga':
              // Ignore all of the further Damage in this attack
              i = damage
              this.combatLog.push({
                align: 'right',
                type: 'passive',
                text: 'The monster ignore all of the further damage.',
              })
              break

            case 'Yghern':
              // If the Attack is not red, ignores all further Damage
              if (!redAttack) {
                i = damage
                this.combatLog.push({
                  align: 'right',
                  type: 'passive',
                  icon: '✨',
                  text: 'The monster ignore all of the further damage.',
                })
              }
              break
          }
        }
      }
    }
  }

  resolveHumanPlayerAttack(damage, purpleAttack, redAttack) {
    const defender = this.attackingOrder[1]

    this.logAttack(0, damage, null)

    const defense = {
      Monster: () => this.resolveMonsterDefense(damage, purpleAttack, redAttack),
      Automa: () => this.resolveAutomaDefense(1, damage),
    }

    defense[defender.type]?.()
  }

  defenderAttack() {
    const defender = this.attackingOrder[1]

    // Should not have been called if defender is dead
    if (defender.challengeDeck === 0) return

    const attack = {
      Monster: () => this.resolveMonsterAttack(1),
      Automa: () => this.resolveAutomaAttack(1),
    }

    attack[defender.type]?.()
  }

  adjustShield(player, adjusment) {
    player.shield += adjusment
    if (player.shield > player.defense) {
      player.shield = player.defense
    }
  }

  resolveSchoolSpecial(specialName, attacker, indx, damage) {
    const school = schools.find((s) => s.id === attacker.school)
    if (!school) return

    const specialKey = specialName.toLowerCase()
    const specialData = school[specialKey]
    if (!specialData) return

    let result = { damage: damage + specialData.attack }

    if (specialData.shield > 0) {
      this.adjustShield(attacker, specialData.shield)
      this.logSpecial(indx, `Gain +${specialData.shield} shield.`)
    }

    for (const special of specialData.specials) {
      const handler = this.specialHandlers[special]

      if (!handler) {
        console.warn(`Missing handler for special ${special}`)
      }

      const handlerResult = handler.call(this, attacker, indx, result.damage)

      if (handlerResult?.damage !== undefined) {
        result.damage = handlerResult.damage
      }

      if (handlerResult?.newAttack) {
        result.newAttack = true
      }
    }

    return result
  }

  arachasPassiveAttack(indx) {
    const automa = this.attackingOrder[indx]
    const card = automa.challengeDeck.shift()
    automa.challengeDiscard.push(card)
    if (card.attack < 2) {
      this.automaSkipNextAttack = true
    }
  }

  discardPotion(indx, potion) {
    const automa = this.attackingOrder[indx]
    automa.potion += potion
  }

  sufferHalfFurtherDamage(indx, remainingDamage) {
    let damage = Math.floor(remainingDamage / 2)
    this.resolveAutomaDefense(indx, damage)
  }

  graveHagPassiveAttack(indx) {
    // Lower Shield by 2, if Shield == 0 then suffer 1 Damage instead
    const automa = this.attackingOrder[indx]
    if (automa.shield == 0) {
      this.resolveAutomaDefense(indx, 1)
    } else {
      automa.shield -= 2
      if (automa.shield < 0) {
        automa.shield = 0
      }
    }
  }
}
