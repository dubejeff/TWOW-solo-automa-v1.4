import { defineStore } from 'pinia'
import { shuffle } from '@/utils/array'
import { schools } from '@/Enumerates/schools'
import { locations } from '@/Enumerates/locations'
import { MONSTER_DECKS } from '@/Enumerates/Monsters'
import { forestTrailTokens, mountainTrailTokens, waterTrailTokens } from '@/Enumerates/trailTokens'
import { CombatEngine20 } from '@/Domain/combat20'
import { statHandlers } from '@/Domain/statLogic'
import { createHumanPlayer, createAutomaPlayer } from '@/factories/player.factory'
import {
  buildLocations,
  resolveTarget,
  isAutoCombat,
  normalizeAction,
  initTurnOrder,
  initDecks,
  nextAction,
  setAutomaNextLocation,
  setMeditate,
  setWitcherFight,
  setMonsterFight,
  setExplore,
  decideNextAutomaPhase2Action,
  confirmAutomaLevel,
} from '@/Domain/gameHelpers'

const TROPHY_PRIORITY = ['combat', 'defense', 'alchemy', 'specialty']

function getMaxTrophiesPerType(playerCount) {
  return playerCount <= 3 ? 1 : 2
}

export const useGameStore = defineStore('game', {
  state: () => ({
    setup: {
      difficulty: 'Easy',
      playerCount: 1,
      lvl1Monsters: [],
      lvl2Monsters: [],
      lvl3Monsters: [],
      forestTrail: [],
      mountainTrail: [],
      waterTrail: [],
    },
    modules: {
      includeMutagens: false,
      includeBombs: false,
      includeMonsterWeaknessTokens: false,
      includeLostMount: false,
    },
    expansions: {
      includeSkellige: false,
      includeLegendaryHunt: false,
    },
    gamePlay: {
      currentRound: 0,
      currentPlayer: 0,
      turnOrder: [],
      locations: [],
      closedTavernLocation: null,
      trophies: {
        combat: [],
        defense: [],
        alchemy: [],
        specialty: [],
      },
      gameWinner: null,
      endGame: false,
    },
    players: [],
    currentFight: {
      engine: null,
      combatLog: [],
      result: {},
      resolved: false,
      nextMonster: null,
      nextTrailLocation: null,
    },
  }),

  getters: {
    selectedIds: (state) => state.players.map((p) => p.school).filter((id) => id != null),

    isSelectionComplete: (state) => state.players.every((p) => p.school != null),

    activePlayer(state) {
      return state.gamePlay.turnOrder[state.gamePlay.currentPlayer]
    },

    currentPlayer(state) {
      const playerId = state.gamePlay.turnOrder[state.gamePlay.currentPlayer]

      return state.players.find((p) => p.id === playerId)
    },

    isCurrentPlayerHuman() {
      return this.currentPlayer.type === 'Human'
    },

    isCurrentPlayerAutoma() {
      return this.currentPlayer.type === 'Automa'
    },

    isCurrentPlayerInSchoolLocation() {
      const currentLocation = this.currentPlayer.currentLocation
      return schools.some((s) => s.startingLocation === currentLocation)
    },

    isCurrentPlayerInClosedTavernLocation() {
      const location = this.locations.find((l) => l.isTavernClosed === true)
      return this.currentPlayer.nextLocation === location.id
    },
  },

  actions: {
    // =================================
    // Inititalisation des joueurs
    // =================================
    initGame(humanPlayerName) {
      this.players = []

      this.players.push(createHumanPlayer(humanPlayerName))

      for (let i = 1; i < this.setup.playerCount; i++) {
        this.players.push(createAutomaPlayer(i))
      }

      this.gamePlay.locations = buildLocations(locations)

      this.initMonsters()
    },

    // =================================
    // Initialisation des monstres
    // =================================
    initMonsters() {
      const isTwoPlayers = this.setup.playerCount == 2

      const monsterLvl1Count = isTwoPlayers ? 2 : 3
      const monsterLvl2Count = 3 - monsterLvl1Count

      this.setup.lvl1Monsters = shuffle([...MONSTER_DECKS.LEVEL_1])
      this.setup.lvl2Monsters = shuffle([...MONSTER_DECKS.LEVEL_2])
      this.setup.lvl3Monsters = shuffle([...MONSTER_DECKS.LEVEL_3])

      this.setup.forestTrail = shuffle([...forestTrailTokens])
      this.setup.mountainTrail = shuffle([...mountainTrailTokens])
      this.setup.waterTrail = shuffle([...waterTrailTokens])

      const trailTokens = shuffle(['forestTrail', 'mountainTrail', 'waterTrail'])
      // Shufffle for location. 1 = Forest, 2 = Water, 3 = Mountain

      for (let i = 0; i < monsterLvl1Count; i++) {
        this.newMonster('lvl1Monsters', trailTokens[i])
      }
      for (let i = 0; i < monsterLvl2Count; i++) {
        this.newMonster('lvl2Monsters', trailTokens[i + monsterLvl1Count])
      }
    },

    newMonster(lvlMonster, trail) {
      const monster = this.setup[lvlMonster].shift()
      const assignMonster = (trailDeck, monster) => {
        const trailToken = trailDeck.shift()

        const location = this.gamePlay.locations.find((l) => l.id === trailToken.id)

        if (!location) {
          console.warn(`Location not found for id ${trailToken.id}`)
          return
        }

        location.monster = monster
        location.trailToken = trailToken
      }
      assignMonster(this.setup[trail], monster)
    },

    /* =========================
       GAME ACTIONS
    ========================= */

    selectSchool(playerId, schoolId) {
      const player = this.players.find((p) => p.id === playerId)
      if (!player) return
      player.school = schoolId
      const school = schools.find((s) => s.id === schoolId)
      player.currentLocation = school.startingLocation
      player.nextLocation = school.startingLocation
    },

    startGame() {
      initTurnOrder(this.players, this.gamePlay)
      initDecks(
        this.players,
        this.setup.difficulty,
        this.setup.includeSkellige,
        this.setup.includeLegendaryHunt,
      )

      this.applyCurrentPlayerActions()
      setAutomaNextLocation(this.currentPlayer)
    },

    // Méthode pour passer au joueur suivant
    nextTurn() {
      this.gamePlay.currentPlayer =
        (this.gamePlay.currentPlayer + 1) % this.gamePlay.turnOrder.length
      if (this.gamePlay.currentPlayer == 0) {
        this.gamePlay.currentRound++
      }

      nextAction(this.currentPlayer)
      this.applyCurrentPlayerActions()
      setAutomaNextLocation(this.currentPlayer)
    },

    preparePhase2() {
      this.currentPlayer.currentLocation = this.currentPlayer.nextLocation

      if (this.isCurrentPlayerHuman) return

      const location = this.gamePlay.locations.find(
        (l) => l.id === this.currentPlayer.currentLocation,
      )
      const monsterId = location ? location.monster : null
      const witcherId = this.getWitcherAtSameLocation()

      const decision = decideNextAutomaPhase2Action({
        currentPlayer: this.currentPlayer,
        hasWitcherHere: witcherId != null,
        hasMonsterHere: monsterId != null,
        trophies: this.gamePlay.trophies,
        playerCount: this.setup.playerCount,
      })

      switch (decision.type) {
        case 'Meditate':
          setMeditate(this.currentPlayer, decision.trophyType)
          break

        case 'FightWitcher':
          setWitcherFight(this.currentPlayer, witcherId)
          this.startFight(false, witcherId)
          break

        case 'FightMonster':
          setMonsterFight(this.currentPlayer, monsterId)
          this.startFight(true, monsterId)
          break

        default:
          setExplore(this.currentPlayer)
      }
    },

    getStat(indexType) {
      let indx = -1
      const stats = [
        this.currentPlayer.combat,
        this.currentPlayer.defense,
        this.currentPlayer.alchemy,
        this.currentPlayer.specialty,
      ]

      if (indexType === 'Lowest') {
        let min = stats[0]
        indx = 0
        for (let i = 1; i < stats.length; i++) {
          if (stats[i] < min) {
            min = stats[i]
            indx = i
          }
        }

        if (min === 5) {
          indx = -1
        }
      }

      if (indexType === 'Highest') {
        let max = -Infinity
        for (let i = 0; i < stats.length; i++) {
          if (stats[i] === 5) continue
          if (stats[i] > max) {
            max = stats[i]
            indx = i
          }
        }

        if (max === 5) {
          indx = -1
        }
      }

      return indx
    },

    increaseStat(player, stat, max) {
      if (player[stat] < max) {
        player[stat]++
      }
    },

    handleTrailAction(player) {
      const location = locations.find((l) => l.id === player.currentLocation)

      // Cannot have 2x same TrailToken
      if (this.currentPlayer.trailTokens.includes(location.type)) return

      const trailMap = {
        forest: {
          pool: this.setup.forestTrail,
          tokens: forestTrailTokens,
        },
        mountain: {
          pool: this.setup.mountainTrail,
          tokens: mountainTrailTokens,
        },
        water: {
          pool: this.setup.waterTrail,
          tokens: waterTrailTokens,
        },
      }

      const hasToken = player.trailTokens.some((t) => t.type === location.type)

      if (!hasToken) {
        const config = trailMap[location.type] ?? trailMap.water
        const token = config.pool.shift()
        if (token) player.trailTokens.push(token)
      }
    },

    applyStatByIndex(player, indx) {
      const effects = [
        () => player.combat++,
        () => {
          player.defense++
          player.shield++
        },
        () => player.alchemy++,
        () => player.specialty++,
      ]

      effects[indx]?.()
    },

    applyCurrentPlayerActions() {
      if (this.currentPlayer.type === 'Human') return

      for (const rawAction of this.currentPlayer.currentAction.actions) {
        const action = normalizeAction(rawAction)

        if (action === 'Trail') {
          this.handleTrailAction(this.currentPlayer)
          continue
        }

        const handler = statHandlers[action]

        if (handler) {
          handler(this.currentPlayer)
          continue
        }

        const indx = this.getStat(action)

        if (indx > -1) {
          this.applyStatByIndex(this.currentPlayer, indx)
        }
      }

      confirmAutomaLevel(this.currentPlayer)
    },

    getAvailableTrophies() {
      const maxTrophiesPerType = getMaxTrophiesPerType(this.setup.playerCount)
      let availableTrophies = []
      for (const stat of TROPHY_PRIORITY) {
        if (this.gamePlay.trophies[stat].length < maxTrophiesPerType) {
          availableTrophies.push(stat)
        }
      }

      return availableTrophies
    },

    getAvailableTrophy() {
      const maxTrophiesPerType = getMaxTrophiesPerType(this.setup.playerCount)
      for (const stat of TROPHY_PRIORITY) {
        if (this.currentPlayer[stat] === 5 || this.currentPlayer.type === 'Human') {
          if (this.gamePlay.trophies[stat].length < maxTrophiesPerType) {
            return stat
          }
        }
      }

      return null
    },

    getWitcherAtSameLocation() {
      let level = 6
      let oppenentId = null
      for (let i = 0; i < this.players.length; i++) {
        if (this.players[i].id != this.currentPlayer.id) {
          if (this.players[i].currentLocation === this.currentPlayer.nextLocation) {
            if (this.players[i].level < level) {
              level = this.players[i].level
              oppenentId = this.players[i].id
            }
          }
        }
      }
      return oppenentId
    },

    getWitcherAtSameLocationRewrite() {
      return this.players
        .filter(
          (player) =>
            player.id !== this.currentPlayer.id &&
            player.currentLocation === this.currentPlayer.nextLocation,
        )
        .map((player) => ({
          id: player.id,
          name: player.name,
          level: player.level,
        }))
        .sort((a, b) => {
          if (a.level !== b.level) return a.level - b.level
          if (a.type === 'Human' && b.type !== 'Human') return -1
          if (b.type === 'Human' && a.type !== 'Human') return 1
          return 0
        })
    },

    startFight(isMonster, id) {
      if (this.currentFight.engine) return

      const attacker = this.currentPlayer

      const target = resolveTarget(this.players, isMonster, id)

      const engine = new CombatEngine20()

      engine.startFight(attacker, target, isMonster)

      this.currentFight.engine = engine
      this.currentFight.combatLog = engine.combatLog
      this.currentFight.resolved = false

      if (this.currentPlayer.type === 'Human' && isMonster) return

      if (isAutoCombat(attacker, target, isMonster)) {
        // check for trail token
        engine.autoCombat()
        this.finalizeFightOutcomes(engine)
      } else {
        engine.nextStep()
      }
    },

    returnAllTrailTokensCorrespondingLocation() {
      const currentOPlayerLocation = this.currentPlayer.currentLocation
      const location = this.gamePlay.locations.find((l) => l.id === currentOPlayerLocation)
      const trailToken = location.trailToken

      // Init location
      location.trailToken = null
      location.monster = null

      // Return Location token
      const trailTokenType = trailToken.type + 'Trail'
      this.setup[trailTokenType].push(trailToken)

      // Return corresponding Trail tokens
      for (let i = 0; i < this.players.length; i++) {
        const index = this.players[i].trailTokens.findIndex((t) => t.type === trailToken.type)
        if (index !== -1) {
          const movedTrailToken = this.players[i].trailTokens.splice(index, 1)[0]
          this.setup[trailTokenType].push(movedTrailToken)
        }
      }

      this.setup[trailTokenType] = shuffle([...this.setup[trailTokenType]])
    },

    getTrailTokenType() {
      const currentPlayerLocation = this.currentPlayer.nextLocation
      const location = locations.find((l) => l.id === currentPlayerLocation)

      if (location.type === 'forest') {
        return 'forestTrail'
      }
      if (location.type === 'mountain') {
        return 'mountainTrail'
      }
      if (location.type === 'water') {
        return 'waterTrail'
      }

      return null
    },

    spawnMonster(sameLevel, monster) {
      if (!monster) return

      let lvlMonster = 'lvl2Monsters'
      if (monster.player.level === 1 && sameLevel) {
        lvlMonster = 'lvl1Monsters'
      } else if (monster.player.level >= 2 && !sameLevel) {
        lvlMonster = 'lvl3Monsters'
      }

      this.returnAllTrailTokensCorrespondingLocation()
      this.currentFight.nextMonster = this.setup[lvlMonster].shift()
      const trailTokenType = this.getTrailTokenType()
      this.currentFight.nextTrailLocation = this.setup[trailTokenType].shift()
    },

    currentPlayerDrawTrailToken() {
      if (this.isCurrentPlayerHuman) return

      this.handleTrailAction(this.currentPlayer)
    },

    handleMonsterVictory(monster) {
      if (monster.challengeDeck.length === 1) {
        /** Driving the monster away
         *
         * Not manage
         * +2 Gold
         * +1 0-cost Action card
         *
         */
        this.spawnMonster(true, monster)
      } else {
        /**
         * Complete Defeat
         *
         * Not manage
         * +1 0-cost Action card
         *
         */
        this.currentPlayerDrawTrailToken()
      }
    },

    closeTavernCurrentLocation() {
      for (let i = 0; i < this.gamePlay.locations.length; i++) {
        const location = this.gamePlay.locations[i]
        const currentPlayerLocation = this.currentPlayer.currentLocation

        location.isTavernClosed = location.id === currentPlayerLocation ? true : false
      }
    },

    gainTrophy() {
      this.gamePlay.endGame = this.currentPlayer.trophies.length === 0

      if (this.gamePlay.endGame) return

      const trophy = this.currentPlayer.trophies.pop()

      // The human doesn't use challengeDeck
      if (this.currentPlayer.type === 'Human') return

      // The automa add a lvl 3 card
      this.currentPlayer.challengeDeck.push(trophy)
    },

    handlePlayerVictory(winner, loser) {
      /**
       * Not manage
       * +1, +2, +3 Gold (vs Player only)
       * +2 Gold (vs Monster only)
       * Suffer Fatigue
       *
       */
      this.gainTrophy()

      if (loser.player.type === 'Automa' || loser.player.type === 'Human') {
        /**
         * Not manage - Defending Player
         * +1 0-cost Action card
         *
         */
        // Fight between Witchers is closing the Tavern Location
        return this.closeTavernCurrentLocation()
      }

      // Player is defeating the Monster
      this.spawnMonster(false, loser)
    },

    raiseShield(player) {
      if (player.type !== 'Automa') {
        return
      }

      player.shield = player.defense
    },

    finalizeFightOutcomes(engine) {
      const result = engine.getResult()

      this.currentFight.result = result
      this.currentFight.resolved = true
      const { winner, loser } = result

      this.raiseShield(winner.player)
      this.raiseShield(loser.player)

      if (winner.player.type === 'Monster') {
        return this.handleMonsterVictory(winner)
      }

      if (winner.player.id !== this.currentPlayer.id) {
        /**
         * Not manage - Witcher defeat
         * +2 Gold (vs Monster only)
         * +0 0-cost Action Card
         *
         * Not manage - Witcher defender Win
         * +1, +2, +3 Gold
         *
         */
        return
      }

      return this.handlePlayerVictory(winner, loser)
    },

    endFight() {
      if (this.currentFight.nextTrailLocation !== null) {
        const trailToken = this.currentFight.nextTrailLocation
        const location = this.gamePlay.locations.find((l) => l.id === trailToken.id)

        if (!location) {
          console.warn(`Location not found for id ${trailToken.id}`)
          return
        }

        location.monster = this.currentFight.nextMonster
        location.trailToken = this.currentFight.nextTrailLocation
      }

      this.currentFight.engine = null
      this.currentFight.combatLog = []
      this.currentFight.result = null
      this.currentFight.resolved = false
      this.currentFight.nextMonster = null
      this.currentFight.nextTrailLocation = null
    },

    validatePhase2() {
      if (this.currentFight.engine !== null) this.endFight()
    },

    setTrophy(trophy) {
      // only human can setTrophy
      if (this.currentPlayer.type !== 'Human') return

      this.gamePlay.trophies[trophy].push(this.currentPlayer.id)

      this.gainTrophy()
    },

    // Human fight
    humanNextStrike(damage) {
      const engine = this.currentFight.engine
      if (!engine) return console.warn('Combat engine is missing')

      if (damage > 0) {
        engine.resolveHumanAttack(damage)
      }

      if (!engine.isFinished()) {
        engine.resolveStepUntilHumanInteraction()
      }

      if (engine.isFinished()) this.finalizeFightOutcomes(engine)
    },

    humanDefense(damage) {
      const engine = this.currentFight.engine
      if (!engine) return console.warn('Combat engine is missing')

      engine.resolveHumanDefenseStep(damage)

      if (!engine.isFinished()) {
        engine.resolveStepUntilHumanInteraction()
      }

      if (engine.isFinished()) this.finalizeFightOutcomes(engine)
    },

    humanKnockedOut() {
      const engine = this.currentFight.engine
      if (!engine) return console.warn('Combat engine is missing')

      engine.resolveHumanKnockedOut()

      this.finalizeFightOutcomes(engine)
    },

    humanDefeatTheMonster() {
      const engine = this.currentFight.engine
      if (!engine) return console.warn('Combat engine is missing')

      engine.resolveMonsteLifePool(0)

      this.finalizeFightOutcomes(engine)
    },

    humanDrivesTheMonsterAway() {
      const engine = this.currentFight.engine
      if (!engine) return console.warn('Combat engine is missing')

      engine.resolveHumanKnockedOut()
      engine.resolveMonsteLifePool(1)

      this.finalizeFightOutcomes(engine)
    },

    resetGame() {
      this.$reset()
    }
  },
})
