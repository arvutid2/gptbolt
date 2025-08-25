# Bolt Demo Games (Vite + React + TS)

**Eesmärk:** loogiline struktuur GitHubi jaoks. Landing on ühes failis; matchmaking, session (GameHost/StartGame) ja iga mäng eraldi kaustas. Uue mängu lisamine = lisa kaust `src/games/<nimi>` + register manifestis.

## Kiire käivitus
```bash
npm i
npm run dev
```

## Kaustastruktuur
```
src/
  components/        # Üldised UI tükid (Navbar)
  games/             # Iga mäng on plugin
    durak/
    rps/
    manifest.ts      # Mängude register + lazy load
    GameTypes.ts
  lib/               # Jagatud loogika (payouts, flags)
  modules/           # Äriloogika plokid
    matchmaking/
    session/
  pages/             # Routing vaated
```

## Uue mängu lisamine
1) Loo kaust `src/games/<mäng>/` ja ekspordi **default** komponent.
2) Lisa `manifest.ts` sisse uus kirje koos `load: () => import("@games/<mäng>")`.
3) Lisa nupuke Landingul või suuna `/play/<mäng>` route’iga.

## Matchmaking
- `MatchmakingProvider` hoiab staatuse (`idle|searching|found`).
- `StartGame` kontrollib eeldused (wallet, buy‑in) ja käivitab `findOpponent`.

## Game session
- `GameHost` laeb mängu dünaamiliselt, merge’ib seaded ja arvutab `payout`. 

## Payout loogika
- `lib/payouts.ts` – platvormitasu + võitja jagamine.

## Miks nii?
- **Eraldus**: Landing ühe failina, mängud eraldi → lihtne lisada/muuta.
- **Lazy load**: iga mäng laetakse, kui vaja → bundel väike.
- **Plugin pattern**: manifest = üks koht, kuhu uued mängud registreerida.
