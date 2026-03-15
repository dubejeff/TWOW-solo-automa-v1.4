import { AutomaSpecialAttacksHandler } from './AutomaSpecialAttackHandler'
import { locations } from '@/Enumerates/locations'

export class AutomaCombat {
  constructor(player, engine) {
    this.player = player
    this.engine = engine
    this.isIgnoringPassive = false //TODO
    this.isIgnoringAllDamage = false //TODO
    this.add2DamageNextAttack = false //TODO
    this.newAttack = false //TODO
  }

  get type() {
    return 'Automa'
  }

  hasTrailToken() {
    const location = locations.find(l => l.id === this.player.currentLocation)
    return this.player.trailTokens.some(t => t.type === location.type)
  }

  isAttackingAgain() {
    if (!this.newAttack) return false

    this.newAttack = false

    return true
  }

  applyShield(shieldValue) {
    const shield = this.player.shield
    const defense = this.player.defense
    if (shieldValue === 0) return
    if (shield === defense || defense - shield === 0) return

    const v = Math.min(shieldValue, defense - shield)
    this.engine.logSpecial(`${this.player.name} gains ${v} shield`)
    this.player.shield += v
  }

  gainPotion() {
    if (this.player.potions === 4) return
    this.player.potions++
  }

  usePotion() {
    if (this.player.potions <= 0) return false
    this.player.potions--
    return true
  }
  useBomb() {
    if (this.player.bombs <= 0) return false
    this.player.bombs--
    return true
  }

  loseLife() {
    if (this.player.challengeDeck.length === 0) return

    const card = this.player.challengeDeck.shift()
    if (card) this.player.challengeDiscard.push(card)
  }

  gainLife() {
    if (this.player.challengeDiscard.length === 0) return

    const card = this.player.challengeDiscard.pop()
    if (card) this.player.challengeDeck.push(card)
  }

  ignorePassive() {
    this.isIgnoringPassive = true
  }

  ignoreAllDamage() {
    this.isIgnoringAllDamage = true
  }

  twoDamageNextAttack() {
    this.add2DamageNextAttack = true
  }

  attackAgain() {
    this.newAttack = true
  }

  resolveAttack() {
    const card = this.player.challengeDeck.shift()

    if (!card) return 0

    this.player.challengeDiscard.push(card)

    let damage = card.attack

    this.applyShield(card.shield)

    // TODO MUTAGEN

    // special handling
    const handler = AutomaSpecialAttacksHandler[card.special]
    if (handler) {
      const ctx = {
        attacker: this.player,
        engine: this.engine,
        damage,

        addDamage: (d) => (ctx.damage += d),

        applyShield: (value) => this.applyShield(value),
        gainPotion: () => this.gainPotion(),
        usePotion: () => this.usePotion(),
        useBomb: () => this.useBomb(),
        loseLife: () => this.loseLife(),

        ignorePassive: () => this.ignorePassive(),
        ignoreAllDamage: () => this.ignoreAllDamage(),
        twoDamageNextAttack: () => this.twoDamageNextAttack(),
        attackAgain: () => this.attackAgain(),

        heal: (times) => {
          for (let i = 0; i < times; i++) {
            this.gainLife()
          }
        },
      }
      handler(ctx)

      damage = ctx.damage
    }

    return {
      id: card.id,
      damage,
    }
  }

  resolveDefense() {
    if (this.player.challengeDeck.length === 0) return 0
    if (this.isIgnoringAllDamage) return 0

    if (this.player.shield > 0) {
      this.player.shield--
      return 0
    }

    const card = this.player.challengeDeck.shift()
    this.player.challengeDiscard.push(card)

    if (card.counter === '2DAMAGE') {
      return {
        id: card.id,
        counterDamage: 2,
      }
    }

    return {
      id: card.id,
      counterDamage: 0,
    }
  }

  isAlive() {
    return this.player.challengeDeck.length > 0
  }

  getChallengeDeck() {
    return this.player.challengeDeck
  }
}
