import { shuffle } from '@/utils/array'
import { AutomaCombat } from './AutomaCombat'
import { HumanCombat } from './HumanCombat'
import { MonsterCombat } from './MonsterCombat'
import { reactive } from 'vue'

const CombatState = {
  ATTACK: 'ATTACK',
  DEFENSE: 'DEFENSE',
  TURN_END: 'TURN_END',
  WAIT_HUMAN_ATTACK: 'WAIT_HUMAN_ATTACK',
  WAIT_HUMAN_DEFENSE: 'WAIT_HUMAN_DEFENSE',
  END: 'END',
}

export class CombatEngine20 {
  constructor() {
    this.fighters = []
    this.combatLog = reactive([])

    // TODO
    this.automaSufferMaxDamageNextAttack = false
    this.monsterNextAttackDealMoreDamage = false
    this.automaSkipNextAttack = false
    this.useMonsterSpecialAttack = false

    this.state = CombatState.ATTACK
    this.damageQueue = []
    this.turn = 0

    this.stateHandlers = {
      ATTACK: () => this.resolveAttackStep(),
      DEFENSE: () => this.resolveDefenseStep(),
      TURN_END: () => this.turnEndStep(),
    }
  }

  resetDeck(player) {
    if (player.type === 'Human') return
    player.challengeDeck.push(...player.challengeDiscard)
    player.challengeDeck = shuffle(player.challengeDeck)
    player.challengeDiscard = []
  }

  prepareDecks(fighter1, fighter2, isMonster) {
    this.resetDeck(fighter1)
    if (!isMonster) this.resetDeck(fighter2)
  }

  isAttackerStrikeFirst(attacker, defender) {
    if (attacker.player.type === 'Human') return true

    if (defender.player.type === 'Monster') {
      return attacker.hasTrailToken()
    }

    return true
  }

  createFighter(fighter, isMonster = false) {
    if (isMonster) {
      return new MonsterCombat(fighter, this)
    }

    if (fighter.type === 'Automa') {
      return new AutomaCombat(fighter, this)
    }

    return new HumanCombat(fighter, this)
  }

  setTurnOrder(attacker, defender) {
    this.fighters = this.isAttackerStrikeFirst(attacker, defender)
      ? [attacker, defender]
      : [defender, attacker]
  }

  initCombat() {
    this.turn = 0
    this.damageQueue = []
  }

  startFight(fighter1, fighter2, isMonster) {
    this.prepareDecks(fighter1, fighter2, isMonster)

    const attacker = this.createFighter(fighter1, false)
    const defender = this.createFighter(fighter2, isMonster)

    this.setTurnOrder(attacker, defender)

    this.initCombat()
  }

  autoCombat() {
    const attacker = this.fighters[0]
    const defender = this.fighters[1]
    while (attacker.isAlive() && defender.isAlive()) {
      this.nextStep()
    }
  }

  nextStep() {
    const handler = this.stateHandlers[this.state]

    if (!handler) return { state: 'END' }

    return handler()
  }

  resolveStepUntilHumanInteraction() {
    const defender = this.fighters[1]
    while (
      defender.isAlive() &&
      this.state !== CombatState.WAIT_HUMAN_ATTACK &&
      this.state !== CombatState.WAIT_HUMAN_DEFENSE
    ) {
      this.nextStep()
    }
  }

  resolveAttackStep() {
    const attacker = this.fighters[this.turn]

    if (attacker.type === 'Human') {
      this.state = CombatState.WAIT_HUMAN_ATTACK
      return { state: CombatState.WAIT_HUMAN_ATTACK }
    }

    this.logLifePool(attacker, this.turn)

    const result = attacker.resolveAttack()
    if (Number.isNaN(result.damage)) console.warn('Damage is not a number')
    this.logAttack(result.damage, result.id)
    this.damageQueue.push({
      target: 1 - this.turn,
      damage: result.damage,
    })

    this.state = CombatState.DEFENSE

    return { state: 'ATTACK_RESOLVED' }
  }

  resolveDefenseStep() {
    if (this.damageQueue.length === 0) {
      this.state = CombatState.TURN_END
      return { state: 'DEFENSE_END' }
    }

    const event = this.damageQueue[0]
    const defender = this.fighters[event.target]

    if (defender.type === 'Human') {
      this.state = CombatState.WAIT_HUMAN_DEFENSE
      return {
        state: CombatState.WAIT_HUMAN_DEFENSE,
        target: event.target,
      }
    }

    const result = defender.resolveDefense()

    event.damage--

    if (event.damage <= 0) {
      this.damageQueue.shift()
    }

    if (result.counterDamage > 0) {
      this.logCounterDamage(result.counterDamage, event.target)
      this.damageQueue.unshift({
        target: 1 - event.target,
        damage: result.counterDamage,
      })
    }

    return { state: 'DEFENSE_RESOLVED' }
  }

  turnEndStep() {
    // TODO ATTACK AGAIN
    const attacker = this.fighters[this.turn]

    if (!attacker.isAttackingAgain()) this.turn = 1 - this.turn

    this.state = CombatState.ATTACK

    return { state: 'TURN_END' }
  }

  resolveHumanAttack(damage) {
    this.logAttack(damage, null)
    this.damageQueue.push({
      target: 1 - this.turn,
      damage,
    })

    this.state = CombatState.DEFENSE

    return
  }

  resolveHumanCounterAttack(damage) {
    this.logCounterDamage(damage, this.turn)
    this.damageQueue.unshift({
      target: 1 - this.turn,
      damage,
    })

    this.state = CombatState.DEFENSE

    return
  }

  resolveHumanDefenseStep(counterDamage) {
    const event = this.damageQueue[0]

    event.damage = 0

    if (event.damage <= 0) {
      this.damageQueue.shift()
    }

    if (counterDamage > 0) {
      this.logCounterDamage(counterDamage, event.target)
      this.damageQueue.unshift({
        target: 1 - event.target,
        damage: counterDamage,
      })
    }

    this.state = CombatState.DEFENSE

    if (this.damageQueue.length === 0) {
      this.state = CombatState.TURN_END
      return { state: 'DEFENSE_END' }
    }

    return { state: 'DEFENSE_RESOLVED' }
  }

  resolveHumanKnockedOut() {
    const [attacker, defender] = this.fighters
    if (attacker.player.type === 'Human') attacker.knockedOut()
    if (defender.player.type === 'Human') defender.knockedOut()
    return { state: 'END' }
  }

  resolveMonsteLifePool(lifePoolSize) {
    const defender = this.fighters[1 - this.turn]
    defender.setLifePool(lifePoolSize)
    return { state: 'END' }
  }

  // loggers
  logAttack(damage, attackCardId) {
    const name = this.fighters[this.turn].player.name
    const card = `(${attackCardId})`
    if (damage > 4) {
      this.combatLog.push({
        align: this.turn,
        type: 'attack',
        icon: '⚔️',
        text: `${name} lands a heavy blow for ${damage} Damage. ${card}`,
      })
    } else if (damage > 0) {
      this.combatLog.push({
        align: this.turn,
        type: 'attack',
        icon: '⚔️',
        text: `${name} strike for ${damage} Damage. ${card}`,
      })
    }
  }

  logCounterDamage(damage, indx) {
    const name = this.fighters[indx].player.name
    this.combatLog.push({
      align: indx,
      type: 'counterattack',
      icon: '⚔️',
      text: `${name} counter strike for ${damage} Damage.`,
    })
  }

  logPassive(stat, attackCardId) {
    const name = this.fighters[1 - this.turn].player.name
    this.combatLog.push({
      align: 1 - this.turn,
      type: 'passive',
      icon: '✨',
      text: name + ' lowers their ' + stat + ' by 1 (' + attackCardId + ')',
    })
  }

  logSpecial(text) {
    this.combatLog.push({
      align: this.turn,
      type: 'special',
      icon: '⚡',
      text: text,
    })
  }

  logDeath(name, indx) {
    this.combatLog.push({
      align: indx,
      type: 'death',
      icon: '☠️',
      text: `${name} is dead`,
    })
  }

  logLifePool(combatant, indx) {
    if (combatant.player.type === 'Human') return
    const name = combatant.player.name
    const lifepool =
      combatant.player.type === 'Automa'
        ? combatant.player.challengeDeck.length
        : combatant.challengeDeck.length

    this.combatLog.push({
      align: indx,
      type: 'lifepool',
      icon: '❤️',
      text: `${name} Life Pool: ${lifepool}`,
    })
  }

  isFinished() {
    const [attacker, defender] = this.fighters

    if (attacker.isAlive() && defender.isAlive()) return false

    return true
  }

  logFighterResult(fighter, index) {
    if (!fighter.isAlive()) {
      this.logDeath(fighter.player.name, index)
    } else {
      this.logLifePool(fighter, index)
    }
  }

  logResult() {
    const [attacker, defender] = this.fighters

    this.logFighterResult(attacker, 0)
    this.logFighterResult(defender, 1)
  }

  getResult() {
    this.logResult()

    const [attacker, defender] = this.fighters

    const attackerAlive = attacker.isAlive()
    const defenderAlive = defender.isAlive()

    if (attackerAlive && !defenderAlive) return { winner: attacker, loser: defender }
    if (!attackerAlive && defenderAlive) return { winner: defender, loser: attacker }

    // égalité → attacker gagne
    return { winner: attacker, loser: defender }
  }
}
