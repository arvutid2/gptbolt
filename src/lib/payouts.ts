import type { Outcome } from "@games/GameTypes";

export type PayoutConfig = {
  platformFee: number; // 0..1
  modes: {
    "1v1"?: { winner: number };
    "3p"?: { first: number; second: number };
    "4p"?: { first: number; second: number; third: number };
  };
};

export const payoutConfig: PayoutConfig = {
  platformFee: 0.1,
  modes: { "1v1": { winner: 0.9 } },
};

export function calcPayouts({ buyIn, players, outcome, cfg }: {
  buyIn: number; players: number; outcome: Outcome; cfg: PayoutConfig;
}) {
  const pool = buyIn * players;
  const fee = pool * cfg.platformFee;
  const net = pool - fee;
  if (players === 2) {
    if (outcome === "draw") return { you: buyIn, platform: 0 };
    const youWin = outcome === "win";
    return { you: youWin ? net : 0, platform: fee };
  }
  if (players === 3 && (outcome === "rank1" || outcome === "rank2")) {
    const { first = 0.7, second = 0.2 } = cfg.modes["3p"] || ({} as any);
    const share = outcome === "rank1" ? first : second;
    return { you: net * share, platform: fee };
  }
  if (players === 4 && ["rank1", "rank2", "rank3"].includes(outcome)) {
    const { first = 0.6, second = 0.25, third = 0.05 } = cfg.modes["4p"] || ({} as any);
    const map: any = { rank1: first, rank2: second, rank3: third };
    return { you: net * map[outcome], platform: fee };
  }
  return { you: 0, platform: fee };
}