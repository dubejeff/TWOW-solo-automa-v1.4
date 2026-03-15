import { monsters } from '@/Enumerates/Monsters'
import { locations } from '@/Enumerates/locations'
import { shuffle } from '@/utils/array'
import { genericCards, specificCards, skelligeCards, legendaryHuntCards } from '@/Enumerates/cards'
import { getAutomaNextLocation } from './automaNextLocation'

const TROPHY_PRIORITY = ['combat', 'defense', 'alchemy', 'specialty']

export function buildLocations() {
  return locations.map((_, index) => ({
    id: index,
    monster: null,
    trailToken: null,
    isTavernClosed: false,
  }))
}

export function resolveTarget(players, isMonster, id) {
  return isMonster ? monsters.find((m) => m.id === id) : players.find((p) => p.id === id)
}

export function isAutoCombat(attacker, target, isMonster) {
  return attacker.type === 'Automa' && (isMonster || target.type === 'Automa')
}

export function normalizeAction(action) {
  return typeof action === 'string' ? action.trim() : action
}

export function initTurnOrder(players, gamePlay) {
  // Récupère les IDs des joueurs
  const ids = players.map((p) => p.id)

  // Mélange aléatoire
  gamePlay.turnOrder = shuffle(ids)

  gamePlay.currentRound = 1
  gamePlay.currentPlayer = 0
}

function prepareLvl(player, level, difficulty, includeSkellige, includeLegendaryHunt) {
  // Shuffle received cards
  const specific = shuffle([...specificCards[level - 1]])
  const generic = shuffle([
    ...genericCards[level - 1],
    ...(includeSkellige ? skelligeCards[level - 1] : []),
  ])

  const actionCardReqs = [
    [4, 3, 2],
    [4, 3, 3],
    [2, 3, 2],
  ]
  const challengeCardReqs = [
    [2, 3, 3],
    [2, 3, 3],
    [1, 0, 0],
  ]
  // drop 3 cards if expansion is active
  if (includeSkellige) generic.splice(0, 3)

  // prepare action and challenge deck from generic card
  let action = generic.splice(0, actionCardReqs[level - 1][{ Easy: 0, Medium: 1 }[difficulty] ?? 2])
  let challenge = generic.splice(
    0,
    challengeCardReqs[level - 1][{ Easy: 0, Medium: 1 }[difficulty] ?? 2],
  )

  if (level == 3) {
    player.trophies = shuffle(generic)
    if (includeLegendaryHunt) {
      const legendaryHuntToAdd = { Easy: 1, Medium: 2 }[difficulty] ?? 3
      action.push(...shuffle(legendaryHuntCards).splice(0, legendaryHuntToAdd))
    }
  }

  // Add specific Card to
  action.push(...specific.splice(0, 1))
  challenge.push(...specific)
  action = shuffle(action)

  player.actionDeck.push(...action)
  player.challengeDeck.push(...challenge)
}

function initPlayerDeck(player, difficulty, includeSkellige, includeLegendaryHunt) {
  prepareLvl(player, 1, difficulty, includeSkellige, includeLegendaryHunt)
  prepareLvl(player, 2, difficulty, includeSkellige, includeLegendaryHunt)
  prepareLvl(player, 3, difficulty, includeSkellige, includeLegendaryHunt)
  player.challengeDeck = shuffle(player.challengeDeck)
  player.currentAction = player.actionDeck.shift()
}

export function initDecks(players, difficulty, includeSkellige, includeLegendaryHunt) {
  for (const player of players) {
    if (player.type === 'Human') continue
    initPlayerDeck(player, difficulty, includeSkellige, includeLegendaryHunt)
  }
}

export function nextAction(currentPlayer) {
  if (currentPlayer.type == 'Human') return

  // mettre la carte dans la discarte seulement si c'est une level 3
  switch (currentPlayer.currentAction.id) {
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
    case 18:
    case 25:
    case 26:
    case 27:
    case 34:
    case 35:
    case 36:
    case 37:
    case 38:
      currentPlayer.actionDiscard.push(currentPlayer.currentAction)
      break

    default:
  }
  if (currentPlayer.actionDeck.length == 0) {
    currentPlayer.actionDeck = shuffle(currentPlayer.actionDiscard)
    currentPlayer.actionDiscard = []
  }
  currentPlayer.currentAction = currentPlayer.actionDeck.shift()
}

export function setAutomaNextLocation(currentPlayer) {
  currentPlayer.currentLocation = currentPlayer.nextLocation
  if (currentPlayer.type == 'Human') return

  currentPlayer.nextLocation = getAutomaNextLocation()
}

function getMaxTrophiesPerType(playerCount) {
  return playerCount <= 3 ? 1 : 2
}

function getAvailableTrophy(playerCount, currentPlayer, trophies) {
  const maxTrophiesPerType = getMaxTrophiesPerType(playerCount)
  for (const stat of TROPHY_PRIORITY) {
    if (currentPlayer[stat] === 5) {
      if (trophies[stat].length < maxTrophiesPerType) {
        return stat
      }
    }
  }

  return null
}

export function setMeditate(currentPlayer, trophyType) {
  currentPlayer.phase2.action = 'Meditate'
  currentPlayer.phase2.trophyType = trophyType
  currentPlayer.phase2.monsterId = null
  currentPlayer.phase2.witcherId = null
  currentPlayer.phase2.skelligeEvent = ''
}

export function setWitcherFight(currentPlayer, playerId) {
  currentPlayer.phase2.action = 'Fight Witcher'
  currentPlayer.phase2.trophyType = ''
  currentPlayer.phase2.monsterId = null
  currentPlayer.phase2.witcherId = playerId
  currentPlayer.phase2.skelligeEvent = ''
}

export function setMonsterFight(currentPlayer, monsterId) {
  currentPlayer.phase2.action = 'Fight Monster'
  currentPlayer.phase2.trophyType = ''
  currentPlayer.phase2.monsterId = monsterId
  currentPlayer.phase2.witcherId = null
  currentPlayer.phase2.skelligeEvent = ''
}

export function setExplore(currentPlayer) {
  currentPlayer.phase2.action = 'Explore'
  currentPlayer.phase2.trophyType = ''
  currentPlayer.phase2.monsterId = null
  currentPlayer.phase2.witcherId = null
  currentPlayer.phase2.skelligeEvent = ''
}

export function decideNextAutomaPhase2Action({
  currentPlayer,
  hasWitcherHere,
  hasMonsterHere,
  trophies,
  playerCount,
}) {
  if (currentPlayer.type === 'Human') return

  for (const rule of currentPlayer.currentAction.phase2) {
    if (rule === 'Meditate') {
      const trophyType = getAvailableTrophy(playerCount, currentPlayer, trophies)

      if (trophyType) {
        return { type: 'Meditate', trophyType }
      }
    }

    if (rule === 'Witcher' && hasWitcherHere) {
      return { type: 'FightWitcher' }
    }

    if (rule === 'Skellig') {
      // future rule
    }

    const requiredTrophies = Number(rule)

    if (requiredTrophies > 0 && hasMonsterHere) {
      const remainingSlots = 3 - currentPlayer.trophies.length

      if (remainingSlots < requiredTrophies) {
        return { type: 'FightMonster' }
      }
    }
  }

  return { type: 'Explore' }
}

export function confirmAutomaLevel(currentPlayer) {
  if (currentPlayer.type == 'Human') return

  const stats = [
    currentPlayer.combat,
    currentPlayer.defense,
    currentPlayer.alchemy,
    currentPlayer.specialty,
  ]
  let min = stats[0]
  for (let i = 1; i < stats.length; i++) {
    if (stats[i] < min) {
      min = stats[i]
    }
  }

  currentPlayer.level = min
}
