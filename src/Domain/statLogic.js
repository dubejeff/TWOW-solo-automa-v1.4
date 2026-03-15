export const statHandlers = {
  Combat(player) {
    if (player.combat < 5) player.combat++
  },

  Defense(player) {
    if (player.defense < 5) player.defense++
    player.shield++
  },

  Alchemy(player) {
    if (player.alchemy < 5) player.alchemy++
  },

  Specialty(player) {
    if (player.specialty < 5) player.specialty++
  },

  Potion(player) {
    if (player.potions < 4) player.potions++
  },

  Bomb(player) {
    if (player.bombs < 4) player.bombs++
  },
}
