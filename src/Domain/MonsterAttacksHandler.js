export const MonsterAttacksHandler = {
  MonsterLvl: (ctx) => ctx.defender.player.level,

  MonsterLvlPlus2: (ctx) => ctx.defender.player.level+2,

  Combat: (ctx) => ctx.attacker.player.combat,

  Defense: (ctx) => ctx.attacker.player.defense,

  Specialty: (ctx) => ctx.attacker.player.specialty,

  Alchemy: (ctx) => ctx.attacker.player.alchemy,

  LowerCombatByMonsterLevelMinus1: (ctx) => {
    ctx.lowerAttackerCombat(ctx.cardId);
    return ctx.defender.player.level - 1
  },

  LowerDefenseByMonsterLevelMinus1: (ctx) => {
    ctx.lowerAttackerDefense(ctx.cardId);
    return ctx.defender.player.level - 1
  },

  LowerAlchemyByMonsterLevelMinus1: (ctx) => {
    ctx.lowerAttackerAlchemy(ctx.cardId);
    return ctx.defender.player.level - 1
  },

  Special1: (ctx) => {
    console.log(ctx)
    return 0
  },

  Special2: (ctx) => {
    console.log(ctx)
    return 0
  },

  Special3: (ctx) => {
    console.log(ctx)
    return 0
  },

  Special4: (ctx) => {
    console.log(ctx)
    return 0
  },
}
