import AvailableGovernmentRegistry from '@civ-clone/core-government/AvailableGovernmentRegistry';
import Government from '@civ-clone/core-government/Government';
import Player from '@civ-clone/core-player/Player';
import PlayerGovernment from '@civ-clone/core-government/PlayerGovernment';
import RuleRegistry from '@civ-clone/core-rule/RuleRegistry';
import { expect } from 'chai';
import tilePenalty from '../lib/tilePenalty';

class Harsh extends Government {}
class Harsher extends Government {}
class Lenient extends Government {}

const governmentOf = (GovernmentType: typeof Government): PlayerGovernment => {
  const ruleRegistry = new RuleRegistry(),
    playerGovernment = new PlayerGovernment(
      new Player(ruleRegistry),
      new AvailableGovernmentRegistry(),
      ruleRegistry
    );

  playerGovernment.set(new GovernmentType());

  return playerGovernment;
};

describe('tilePenalty', (): void => {
  const penalty = tilePenalty([Harsh, Harsher], 2);

  it('takes 1 off a yield above the threshold under each listed government', (): void => {
    expect(penalty(3, governmentOf(Harsh))).to.equal(2);
    expect(penalty(5, governmentOf(Harsher))).to.equal(4);
  });

  it('leaves a yield at or below the threshold', (): void => {
    expect(penalty(2, governmentOf(Harsh))).to.equal(2);
    expect(penalty(0, governmentOf(Harsh))).to.equal(0);
  });

  it('leaves the yield under any other government', (): void => {
    expect(penalty(3, governmentOf(Lenient))).to.equal(3);
  });

  it('leaves the yield of a player with no government', (): void => {
    expect(penalty(3, null)).to.equal(3);
  });

  it('leaves the yield while the city is celebrating', (): void => {
    expect(penalty(3, governmentOf(Harsh), true)).to.equal(3);
    expect(penalty(3, governmentOf(Harsh), false)).to.equal(2);
  });

  it('takes the threshold and the amount as parameters', (): void => {
    const steep = tilePenalty([Harsh], 4, 2);

    expect(steep(4, governmentOf(Harsh))).to.equal(4);
    expect(steep(5, governmentOf(Harsh))).to.equal(3);
  });
});
