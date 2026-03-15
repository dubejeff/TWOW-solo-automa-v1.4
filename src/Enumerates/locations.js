export const locations = [
  { id: 0, name: 'Behelt Nar', type: 'None' },
  { id: 1, name: 'Kaer Seren', type: 'water' },
  { id: 2, name: 'Hengfors', type: 'mountain' },
  { id: 3, name: 'Kaer Morhen', type: 'mountain' },
  { id: 4, name: 'Ban Ard', type: 'water' },
  { id: 5, name: 'Cidaris', type: 'water' },
  { id: 6, name: 'Novigrad', type: 'forest' },
  { id: 7, name: 'Vizima', type: 'forest' },
  { id: 8, name: 'Vengerberg', type: 'forest' },
  { id: 9, name: 'Cintra', type: 'mountain' },
  { id: 10, name: 'Haern Caduch', type: 'forest' },
  { id: 11, name: 'Beauclair', type: 'mountain' },
  { id: 12, name: 'Glenmore', type: 'water' },
  { id: 13, name: 'Doldeth', type: 'mountain' },
  { id: 14, name: 'Loc Ichaer', type: 'water' },
  { id: 15, name: 'Gorthur Guaed', type: 'water' },
  { id: 16, name: 'Duhwod', type: 'forest' },
  { id: 17, name: 'Stygga', type: 'forest' },
  { id: 18, name: 'Ard Modron', type: 'mountain' },
]


export const locationsById = Object.fromEntries(
  locations.map(l => [l.id, l])
)
