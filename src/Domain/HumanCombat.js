export class HumanCombat {
  constructor(player, engine) {
    this.player = player
    this.engine = engine
    this.lifePool = 1
  }

  get type() {
    return 'Human'
  }

  isAttackingAgain() {
    return false
  }

  knockedOut() {
    this.lifePool = 0
  }

  isAlive() {
    return this.lifePool > 0 ? true : false
  }
}
