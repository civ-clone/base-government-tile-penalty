import Government from '@civ-clone/core-government/Government';
import PlayerGovernment from '@civ-clone/core-government/PlayerGovernment';

/**
 * What a government's penalty leaves of one of a square's yields. `government` is `null` for a player with no
 *  government yet, which has no penalty.
 */
export type TilePenalty = (
  value: number,
  government: PlayerGovernment | null,
  celebrating?: boolean
) => number;

/**
 * Under one of `Governments`, a yield of more than `threshold` loses `amount`, unless the city is celebrating.
 */
export const tilePenalty =
  (
    Governments: (typeof Government)[],
    threshold: number,
    amount: number = 1
  ): TilePenalty =>
  (
    value: number,
    government: PlayerGovernment | null,
    celebrating: boolean = false
  ): number =>
    value > threshold && !celebrating && government?.is(...Governments)
      ? value - amount
      : value;

export default tilePenalty;
