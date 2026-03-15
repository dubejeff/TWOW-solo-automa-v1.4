import { schoolsById } from '@/Enumerates/schools'
import { SchoolSpecialAttackHandlers } from './SchoolSpecialAttackHandlers'

export const AutomaSpecialAttacksHandler = {
  POTION1DAMAGE(ctx) {
    if (!ctx.usePotion()) return

    ctx.engine.logSpecial(`${ctx.attacker.name} uses 1 potion to deal +1 damage.`)

    ctx.addDamage(1)
  },

  POTION2DAMAGE(ctx) {
    if (!ctx.usePotion()) return

    ctx.engine.logSpecial(`${ctx.attacker.name} uses 1 potion to deal +2 damage.`)

    ctx.addDamage(2)
  },

  DAMAGENORESOLVE(ctx) {
    ctx.engine.logSpecial(`${ctx.attacker.name} loses 1 life.`)

    ctx.loseLife()
  },

  POTIONATTACK(ctx) {
    if (!ctx.usePotion()) return

    ctx.engine.logSpecial(`${ctx.attacker.name} uses 1 potion to attack again.`)

    ctx.attackAgain()
  },

  BOMB2DAMAGEDAMAGENORESOLVE(ctx) {
    if (!ctx.useBomb()) return

    ctx.engine.logSpecial(`${ctx.attacker.name} uses 1 bomb to deal +2 damage and loses 1 life.`)

    ctx.loseLife()

    ctx.addDamage(2)
  },

  POTIONHEAL1(ctx) {

    if (ctx.attacker.challengeDeck.length < 1) return

    if (!ctx.usePotion()) return

    ctx.engine.logSpecial(`${ctx.attacker.name} heals 1 life.`)

    ctx.heal(1)
  },

  BOMBATTACK(ctx) {
    if (!ctx.useBomb()) return

    ctx.engine.logSpecial(`${ctx.attacker.name} uses 1 bomb to attack again.`)

    ctx.attackAgain()
  },

  POTIONSHIELDDAMAGE(ctx) {
    if (ctx.attacker.shield <= 0 || !ctx.usePotion()) return

    ctx.engine.logSpecial(
      `${ctx.attacker.name} converts shield into ${ctx.attacker.shield} damage.`,
    )

    ctx.addDamage(ctx.attacker.shield)
  },

  HEAL2(ctx) {
    const attackerLifePool = ctx.attacker.challengeDeck.length
    let h = 2
    if (attackerLifePool < h) h -= attackerLifePool

    ctx.engine.logSpecial(`${ctx.attacker.name} heals ${h} life.`)

    ctx.heal(h)
  },

  ATTACK(ctx) {
    ctx.engine.logSpecial(`${ctx.attacker.name} attacks again.`)
    ctx.attackAgain()
  },

  SPECIAL1(ctx) {
    AutomaSpecialAttacksHandler.resolveSchoolSpecial('SPECIAL1', ctx)
  },

  SPECIAL2(ctx) {
    AutomaSpecialAttacksHandler.resolveSchoolSpecial('SPECIAL2', ctx)
  },

  SPECIAL3(ctx) {
    AutomaSpecialAttacksHandler.resolveSchoolSpecial('SPECIAL3', ctx)
  },

  SPECIALSK1(ctx) {
    const table = {
      1: { damage: 1, shield: 1 },
      2: { damage: 2, shield: 1 },
      3: { damage: 1, shield: 2 },
    }

    const rule = table[ctx.attacker.level] ?? { damage: 1, shield: 3 }

    ctx.addDamage(rule.damage)
    ctx.applyShield(rule.shield)
  },

  SPECIALSK2(ctx) {
    const level = ctx.attacker.level
    ctx.addDamage(level + 1)
  },

  resolveSchoolSpecial(specialName, ctx) {
    const school = schoolsById[ctx.attacker.school]
    if (!school) return

    const specialData = school[specialName.toLowerCase()]
    if (!specialData) return

    ctx.addDamage(specialData.attack)

    if (specialData.shield > 0) {
      ctx.applyShield(specialData.shield)
    }

    for (const special of specialData.specials) {
      const handler = SchoolSpecialAttackHandlers[special]

      if (!handler) {
        console.warn(`Missing handler for special ${special}`)
        continue
      }

      handler(ctx)
    }
  },
}
