import type { GameMeta, GameModule } from "@games/GameTypes";

export const gameManifest: Array<{
  meta: GameMeta;
  load: () => Promise<GameModule>;
}> = [
  {
    meta: {
      id: "rps",
      name: "Rock‑Paper‑Scissors",
      icon: "✊📄✂️",
      capabilities: { overlay: true, bestOf: true, drawRefund: true, ai: true, maxPlayers: 2 },
      defaultSettings: { bestOf: 3, drawRefund: true },
      configSchema: {
        fields: [
          { key: "bestOf", label: "Best of", type: "number", min: 1, max: 9 },
          { key: "drawRefund", label: "Refund on draw", type: "boolean" }
        ],
      },
    },
    load: () => import("@games/rps").then((m) => m as unknown as GameModule),
  },
  {
    meta: {
      id: "durak",
      name: "Durak (stub)",
      icon: "🃏",
      capabilities: { overlay: true, realtime: true, maxPlayers: 2 },
      defaultSettings: { variant: "classic" },
    },
    load: () => import("@games/durak").then((m) => m as unknown as GameModule),
  },
];

export function listGames(): GameMeta[] {
  return gameManifest.map((g) => g.meta);
}

export async function loadGame(gameId: string): Promise<GameModule> {
  const item = gameManifest.find((g) => g.meta.id === gameId);
  if (!item) throw new Error(`Unknown game: ${gameId}`);
  return item.load();
}