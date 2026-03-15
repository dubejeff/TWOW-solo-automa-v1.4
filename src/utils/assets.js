export function actionImage(filename) {
  return new URL (
    `../Assets/Actions/${filename}`,
    import.meta.url
  ).href
}

export function monsterImage(filename) {
  return new URL (
    `../Assets/Monsters/${filename}`,
    import.meta.url
  ).href
}

const locationImages = {
  None: new URL("../assets/monsters/All.png", import.meta.url).href,
  forest: new URL("../assets/monsters/forest.png", import.meta.url).href,
  mountain: new URL("../assets/monsters/mountain.png", import.meta.url).href,
  water: new URL("../assets/monsters/water.png", import.meta.url).href,
};

export function getLocationImage(type) {
  return locationImages[type] ?? locationImages.forest;
}
