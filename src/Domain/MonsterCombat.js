import { MonsterFights } from '@/Enumerates/MonsterFight'
import { shuffle } from '@/utils/array'
import { MonsterAttacksHandler } from './MonsterAttacksHandler'
import { useGameStore } from '@/stores/game'

export class MonsterCombat {
  constructor(monster, engine) {
    this.player = monster
    this.challengeDeck = []
    this.challengeDiscard = []

    /**
     * Prepare the monster challenge deck
     */
    this.challengeDeck.push(
      ...(this.useMonsterSpecialAttack ? MonsterFights : MonsterFights.slice(0, 20)),
    )
    this.challengeDeck = shuffle(this.challengeDeck)
    const toRemove = this.challengeDeck.length - this.player.life
    this.challengeDiscard.push(...this.challengeDeck.splice(0, toRemove))

    this.engine = engine
  }

  get type() {
    return 'Monster'
  }

  isAttackingAgain() {
    return false
  }

  lowerAttackerCombat(id) {
    const attacker = this.engine.fighters[0]
    if (attacker.player.combat === 5) return
    if (attacker.player.combat === 1) return

    attacker.player.combat--
    this.engine.logPassive('Combat', id)
  }

  lowerAttackerDefense(id) {
    const attacker = this.engine.fighters[0]
    if (attacker.player.combat === 5) return
    if (attacker.player.combat === 1) return

    attacker.player.combat--
    this.engine.logPassive('Alchemy', id)
  }

  lowerAttackerAlchemy(id) {
    const attacker = this.engine.fighters[0]
    if (attacker.player.combat === 5) return
    if (attacker.player.combat === 1) return

    attacker.player.combat--
    this.engine.logPassive('Alchemy', id)
  }

  resolveAttack() {
    let attackCard = this.challengeDeck.shift()
    let attackType = Math.random() > 0.5 ? attackCard.charge : attackCard.bite

    const attack = MonsterAttacksHandler[attackType]

    if (attack) {
      const ctx = {
        attacker: this.engine.fighters[0],
        defender: this,
        cardId: attackCard.id,

        lowerAttackerCombat: (id) => this.lowerAttackerCombat(id),
        lowerAttackerDefense: (id) => this.lowerAttackerDefense(id),
        lowerAttackerAlchemy: (id) => this.lowerAttackerAlchemy(id),
      }
      const damage = attack(ctx)
      return {
        id: attackCard.id,
        damage,
      }
    }
    return {
      id: attackCard.id,
      damage: Number(attackType),
    }
  }

  resolveDefense() {
    let defenseCard = this.challengeDeck.shift()

    const gameState = useGameStore()

    if (gameState.modules.includeMonsterWeaknessTokens) {
      /**
       * TODO
       * let defenseType = defenseCard.charge
       * activate.passive
       */
    }

    return {
      id: defenseCard.id,
      counterDamage: 0,
    }
  }

  isAlive() {
    return this.challengeDeck.length > 0
  }

  getChallengeDeck() {
    return this.challengeDeck
  }

  setLifePool(lifePoolSize) {
    this.challengeDeck = []
    for (let i = 0; i < lifePoolSize; i++) {
      this.challengeDeck.push(i)
    }
  }
}
