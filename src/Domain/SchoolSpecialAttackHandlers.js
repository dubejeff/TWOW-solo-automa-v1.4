function heal(ctx, amount) {
  const pool = ctx.attacker.challengeDiscard.length
  if (pool === 0) return

  const h = Math.min(amount, pool)

  ctx.engine.logSpecial(`${ctx.attacker.name} heals ${h} life.`)
  ctx.heal(h)
}

export const SchoolSpecialAttackHandlers = {
  MAXSHIELD(ctx) {
    ctx.engine.logSpecial(`${ctx.attacker.name} raise shield to max level`)
    ctx.applyShield(ctx.attacker.defense)
  },

  IGNOREALLDAMAGE(ctx) {
    ctx.engine.logSpecial(
      `${ctx.attacker.name} ignore all damage received from opponent's next fifth turn`,
    )

    ctx.ignoreAllDamage()
  },

  ATTACK(ctx) {
    ctx.engine.logSpecial(`${ctx.attacker.name} attacks again.`)
    ctx.attackAgain()
  },

  HEAL1(ctx) {
    heal(ctx, 1)
  },

  HEAL2(ctx) {
    heal(ctx, 2)
  },

  HEAL3(ctx) {
    heal(ctx, 3)
  },

  IGNOREPASSIVE(ctx) {
    ctx.engine.logSpecial(
      `${ctx.attacker.name} ignore monster'S passive ability for the rest of the fight`,
    )

    ctx.ignorePassive()
  },

  POTION(ctx) {
    ctx.engine.logSpecial(`${ctx.attacker.name} gains 1 potion`)

    ctx.gainPotion()
  },

  POTION5DAMAGE(ctx) {
    if (!ctx.usePotion()) return

    ctx.engine.logSpecial(`${ctx.attacker.name} uses 1 potion to deal +5 damage.`)

    ctx.addDamage(5)
  },

  TWODAMAGENEXTATTACK(ctx) {
    ctx.engine.logSpecial(`${ctx.attacker.name} will deal 2 more damage next attack`)

    ctx.twoDamageNextAttack()
  },
}
