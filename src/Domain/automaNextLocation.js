const edges = [
  [0, 4],
  [0, 8],
  [0, 11],
  [0, 15],
  [1, 2],
  [1, 6],
  [1, 5],
  [1, 9],
  [2, 1],
  [2, 3],
  [2, 6],
  [2, 7],
  [3, 2],
  [3, 4],
  [3, 7],
  [4, 3],
  [4, 7],
  [4, 8],
  [4, 0],
  [5, 1],
  [5, 6],
  [5, 9],
  [6, 1],
  [6, 2],
  [6, 5],
  [6, 7],
  [6, 9],
  [7, 2],
  [7, 6],
  [7, 3],
  [7, 4],
  [7, 8],
  [7, 9],
  [7, 10],
  [8, 4],
  [8, 7],
  [8, 11],
  [8, 0],
  [9, 1],
  [9, 5],
  [9, 6],
  [9, 7],
  [9, 10],
  [9, 12],
  [10, 7],
  [10, 9],
  [10, 11],
  [10, 12],
  [10, 14],
  [11, 7],
  [11, 8],
  [11, 0],
  [11, 10],
  [11, 14],
  [11, 15],
  [11, 18],
  [12, 9],
  [12, 10],
  [12, 13],
  [12, 14],
  [13, 12],
  [13, 14],
  [13, 16],
  [14, 10],
  [14, 11],
  [14, 12],
  [14, 13],
  [14, 15],
  [14, 16],
  [14, 17],
  [14, 18],
  [15, 0],
  [15, 11],
  [15, 14],
  [15, 18],
  [16, 13],
  [16, 14],
  [16, 17],
  [17, 14],
  [17, 16],
  [17, 18],
  [18, 11],
  [18, 14],
  [18, 15],
  [18, 17],
]

function buildGraph() {
  const graph = {}

  for (const [from, to] of edges) {
    if (!graph[from]) graph[from] = []
    graph[from].push(to)
  }

  return graph
}

function bfsAllShortest(graph, start, end) {
  const queue = [start]

  const distance = {}
  const parents = {}

  distance[start] = 0
  parents[start] = []

  let minDistanceToEnd = Infinity

  while (queue.length) {
    const current = queue.shift()
    const currentDist = distance[current]

    // Si on dépasse la distance minimale trouvée → stop
    if (currentDist > minDistanceToEnd) break

    // Si on arrive à la fin
    if (current === end) {
      minDistanceToEnd = currentDist
      continue
    }

    for (const next of graph[current] || []) {
      const nextDist = currentDist + 1

      // Jamais visité
      if (distance[next] === undefined) {
        distance[next] = nextDist
        parents[next] = [current]
        queue.push(next)
      }

      // Autre chemin aussi court
      else if (distance[next] === nextDist) {
        parents[next].push(current)
      }
    }
  }

  return { distance, parents }
}

function buildAllPaths(parents, start, end) {
  const paths = []

  function backtrack(node, path) {
    if (node === start) {
      paths.push([start, ...path])
      return
    }

    for (const p of parents[node] || []) {
      backtrack(p, [node, ...path])
    }
  }

  backtrack(end, [])

  return paths
}

function allShortestPaths(start, end) {
  const graph = buildGraph()

  const { parents } = bfsAllShortest(graph, start, end)

  return buildAllPaths(parents, start, end)
}

import { locations } from '@/Enumerates/locations'
import { monsters } from '@/Enumerates/Monsters'
import { useGameStore } from '@/stores/game'

function buildDestinationInfo(id) {
  const gameState = useGameStore()
  let location = gameState.gamePlay.locations.find((l) => l.id === id)
  let locationType = locations.find((l) => l.id === id)?.type
  let player = gameState.players[gameState.gamePlay.currentPlayer]
  const trail = player.trailTokens?.find(t => t.type === locationType)
  let monster = monsters.find((m) => m.id === location.monster)

  return {
    id,
    hasMonster: location.monster != undefined,
    monsterLvl: monster ? monster.level : null,
    monsterHp: monster ? monster.life : null,
    hasTrailToken: !!trail,
  }
}

export function findNextLocation(start, end, movement, highest) {
  const paths = allShortestPaths(start, end)
  let nextPossibleLocations = []
  for (let i = 0; i < paths.length; i++) {
    if (movement >= paths[i].length) {
      nextPossibleLocations.push(buildDestinationInfo(paths[i][paths[i].length - 1]))
    } else {
      nextPossibleLocations.push(buildDestinationInfo(paths[i][movement]))
    }
  }

  const withMonster = nextPossibleLocations.filter((d) => d.hasMonster)
  if (withMonster.length > 0) {
    nextPossibleLocations = withMonster
    if (nextPossibleLocations.length > 1) {
      const withTrailToken = nextPossibleLocations.filter((d) => d.hasTrailToken)
      if (withTrailToken.length > 0) {
        nextPossibleLocations = withTrailToken
        if (nextPossibleLocations.length > 1) {
          const monsters = nextPossibleLocations.filter((d) => d.hasMonster)
          if (monsters.length > 0) {
            const minHp = Math.min(...monsters.map((d) => d.monsterHp))
            nextPossibleLocations = monsters.filter((d) => d.monsterHp === minHp)
          }
        }
      }
    }
  }

  if (nextPossibleLocations.length > 1) {
    if (highest) {
      return nextPossibleLocations.reduce((a, b) => (a.id > b.id ? a : b))
    } else {
      return nextPossibleLocations.reduce((a, b) => (a.id < b.id ? a : b))
    }
  }

  return nextPossibleLocations[0]
}

export function findNextLocationWithMonster(highest) {
  const gameState = useGameStore()

  let nextPossibleLocations = []

  for (let i = 0; i < gameState.gamePlay.locations.length; i++) {
    let location = gameState.gamePlay.locations[i]
    if (location.monster != undefined) {
      nextPossibleLocations.push(buildDestinationInfo(location.id))
    }
  }

  const valid = nextPossibleLocations.filter((l) => l.monsterLvl !== null)
  const min = Math.min(...valid.map((l) => l.monsterLvl))
  nextPossibleLocations = valid.filter((l) => l.monsterLvl === min)
  if (nextPossibleLocations.length > 1) {
    const withTrailToken = nextPossibleLocations.filter((d) => d.hasTrailToken)
    if (withTrailToken.length > 0) {
      nextPossibleLocations = withTrailToken
      if (nextPossibleLocations.length > 1) {
        const monsters = nextPossibleLocations.filter((d) => d.hasMonster)
        if (monsters.length > 0) {
          const minHp = Math.min(...monsters.map((d) => d.monsterHp))
          nextPossibleLocations = monsters.filter((d) => d.monsterHp === minHp)
        }
      }
    }
  }

  if (nextPossibleLocations.length > 1) {
    if (highest) {
      return nextPossibleLocations.reduce((a, b) => (a.id > b.id ? a : b))
    } else {
      return nextPossibleLocations.reduce((a, b) => (a.id < b.id ? a : b))
    }
  }

  return nextPossibleLocations[0]
}

export function getAutomaNextLocation() {
  const gameState = useGameStore();
  const currentPlayer =  gameState.currentPlayer
  const currentCard = currentPlayer.currentAction;
  let nextLocation = null;
  if (currentCard.movement === 99) {
    if (currentCard.destination === 'Monster') {
      // nextLocation === Monster
      nextLocation = findNextLocationWithMonster(currentCard.highest);
      return nextLocation.id;
    } else if (currentCard.destination === 'Legendary') {
      // TODO nextLocation === Legendary Monster Location
      return locations.find(l => l.id === 1)
    } else {
      return locations.find(l => l.id === currentCard.destination)
    }
  } else {
    nextLocation = findNextLocation(currentPlayer?.currentLocation, currentCard.destination, currentCard.movement, currentCard.highest);
  }
  return nextLocation.id;
}
