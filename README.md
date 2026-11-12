# base-government-tile-penalty

A government's penalty on what a city's squares yield, as a library for a ruleset's tile yield modifiers:

- `lib/tilePenalty`: `tilePenalty(Governments, threshold, amount = 1)` returns a `TilePenalty`,
  `(value, government, celebrating = false) => number`. Under one of `Governments`, a yield of more than `threshold`
  loses `amount`, unless the city is celebrating. A `null` government (a player with none yet) has no penalty.

The ruleset says which governments, the threshold and the amount, and which yields it applies to. A library: it
registers no rules. See `civ1-world` for Civilization's.
