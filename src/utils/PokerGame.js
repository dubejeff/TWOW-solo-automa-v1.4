function countDice(hand) {
  const counts = {};

  for (const die of hand) {
    counts[die.value] = (counts[die.value] || 0) + 1;
  }

  return counts;
}

function chooseDiceToKeep(hand) {
  const counts = countDice(hand);

  let bestValue = null;
  let bestCount = 0;

  for (const value in counts) {
    if (counts[value] > bestCount) {
      bestCount = counts[value];
      bestValue = Number(value);
    }
  }

  // 🎯 Garder tous les dés de la valeur dominante
  return hand.map(die => die.value === bestValue);
}

export function rollD6 () {
  return Math.floor(Math.random() * 6) + 1;
}

export function redrawDice(hand) {
  const keepMask = chooseDiceToKeep(hand);

  return hand.map((die, index) => {
    if (keepMask[index]) return die;

    return {
      ...die,
      value: rollD6()
    };
  });
}
