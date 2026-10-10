export interface PalaceRoom {
  room: string;
  word: string;
  image: string;
}

const ROOMS = [
  "Foyer",
  "Library",
  "Kitchen",
  "Observatory",
  "Garden",
  "Cellar",
  "Attic",
  "Chapel",
  "Laboratory",
  "Harbor",
  "Theater",
  "Vault",
];

export function buildMemoryPalace(words: string[]): PalaceRoom[] {
  return words.slice(0, 12).map((word, i) => {
    const room = ROOMS[i % ROOMS.length] ?? `Room ${i + 1}`;
    return {
      room,
      word,
      image: `See ${word} glowing on the ${room.toLowerCase()} wall, absurdly large and smelling of rain.`,
    };
  });
}
