export type PlayerId = "you" | "opponent";
export type Outcome = "win" | "loss" | "draw" | "rank1" | "rank2" | "rank3" | "rank4";
export type GameSessionResult = {
  outcome: Outcome;
  rank?: number;
  score?: number;
  meta?: Record<string, unknown>;
};
export type GameCapabilities = {
  overlay?: boolean;
  bestOf?: boolean;
  drawRefund?: boolean;
  realtime?: boolean;
  ai?: boolean;
  maxPlayers?: 1 | 2 | 3 | 4;
};
export type GameConfigSchema = {
  fields: Array<
    | { key: string; label: string; type: "number"; min?: number; max?: number }
    | { key: string; label: string; type: "boolean" }
    | { key: string; label: string; type: "select"; options: string[] }
  >;
};
export type GameMeta = {
  id: string;
  name: string;
  icon?: string;
  capabilities: GameCapabilities;
  defaultSettings?: Record<string, unknown>;
  configSchema?: GameConfigSchema;
};
export type GameProps = {
  settings: Record<string, unknown>;
  onFinish: (result: GameSessionResult) => void;
  playerRole?: "host" | "guest" | "solo";
};
export type GameModule = {
  meta: GameMeta;
  default: (props: GameProps) => JSX.Element;
};